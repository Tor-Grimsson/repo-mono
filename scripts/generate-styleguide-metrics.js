#!/usr/bin/env node
/**
 * Generate a snapshot of design-system metrics for the styleguide dashboard.
 *
 * Usage: node scripts/generate-styleguide-metrics.js
 *
 * The script walks relevant workspaces and produces a JSON file consumed by
 * `/styleguide` routes. Keep the logic data-only (no formatting) so the UI layer
 * can decide how to present individual metrics.
 */

const fs = require('fs/promises');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.join(
  ROOT,
  'apps/web/src/data/styleguide/system-metrics.json'
);

const JSX_EXTENSION = '.jsx';
const JSON_INDENT = 2;
const DEFAULT_EXCLUDED_DIRS = new Set([
  'node_modules',
  '.turbo',
  '.sanity',
  '.cache',
  '.next',
  'dist',
  'build',
  '.git'
]);

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch (_) {
    return false;
  }
}

async function collectFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  return entries.map((entry) => ({
    name: entry.name,
    path: path.join(dirPath, entry.name),
    dirent: entry,
  }));
}

async function countFilesByExtensions(dirPath, extensions = [], options = {}) {
  const { recursive = false, excludeDirs = [] } = options;

  if (!(await exists(dirPath))) {
    return 0;
  }

  const entries = await collectFiles(dirPath);
  let count = 0;

  for (const entry of entries) {
    if (entry.dirent.isDirectory()) {
      if (
        DEFAULT_EXCLUDED_DIRS.has(entry.name) ||
        excludeDirs.includes(entry.name)
      ) {
        continue;
      }
      if (recursive) {
        count += await countFilesByExtensions(
          entry.path,
          extensions,
          options
        );
      }
      continue;
    }

    if (entry.dirent.isFile()) {
      if (
        extensions.length === 0 ||
        extensions.some((ext) => entry.name.endsWith(ext))
      ) {
        count += 1;
      }
    }
  }

  return count;
}

async function countJSXFiles(dirPath, options = {}) {
  return countFilesByExtensions(dirPath, [JSX_EXTENSION], options);
}

async function countFilesWithExtension(dirPath, extension, options = {}) {
  return countFilesByExtensions(dirPath, [extension], options);
}

async function countFilesWithExtensions(dirPath, extensions, options = {}) {
  return countFilesByExtensions(dirPath, extensions, options);
}

async function listExistingPaths(paths) {
  const result = [];
  for (const absPath of paths) {
    if (await exists(absPath)) {
      result.push(path.relative(ROOT, absPath));
    }
  }
  return result;
}

async function collectFilesByExtensions(dirPath, extensions = [], options = {}) {
  const { recursive = false, excludeDirs = [] } = options;
  if (!(await exists(dirPath))) {
    return [];
  }

  const entries = await collectFiles(dirPath);
  let files = [];

  for (const entry of entries) {
    if (entry.dirent.isDirectory()) {
      if (
        DEFAULT_EXCLUDED_DIRS.has(entry.name) ||
        excludeDirs.includes(entry.name)
      ) {
        continue;
      }
      if (recursive) {
        const childFiles = await collectFilesByExtensions(
          entry.path,
          extensions,
          options
        );
        files = files.concat(childFiles);
      }
      continue;
    }

    if (
      extensions.length === 0 ||
      extensions.some((ext) => entry.name.endsWith(ext))
    ) {
      files.push(entry.path);
    }
  }

  return files;
}

async function countPatternOccurrences(dirPath, extensions, regex, options = {}) {
  const files = await collectFilesByExtensions(dirPath, extensions, {
    ...options,
    recursive: true
  });

  let total = 0;

  for (const filePath of files) {
    const content = await fs.readFile(filePath, 'utf8');
    const matches = content.match(regex);
    if (matches) {
      total += matches.length;
    }
  }

  return total;
}

function normalizeRouteSegment(segment) {
  if (segment === 'index') {
    return null;
  }
  if (segment.startsWith('[') && segment.endsWith(']')) {
    return `:${segment.slice(1, -1)}`;
  }
  return segment;
}

function buildRouteTreeFromEntries(entries) {
  const root = {
    segment: '/',
    route: '/',
    file: null,
    children: []
  };

  const insert = (segments, file) => {
    let node = root;
    let pathParts = [];

    if (segments.length === 0) {
      node.file = file;
      return;
    }

    segments.forEach((segment, idx) => {
      pathParts.push(segment);
      const currentRoute =
        '/' + pathParts.filter(Boolean).join('/');
      let child = node.children.find((c) => c.segment === segment);
      if (!child) {
        child = {
          segment,
          route: currentRoute || '/',
          file: null,
          children: []
        };
        node.children.push(child);
      }
      if (idx === segments.length - 1) {
        child.file = file;
      }
      node = child;
    });
  };

  entries.forEach(({ segments, file }) => {
    insert(segments, file);
  });

  const sortTree = (node) => {
    if (node.children && node.children.length) {
      node.children.sort((a, b) =>
        a.route.localeCompare(b.route)
      );
      node.children.forEach(sortTree);
    }
  };

  sortTree(root);

  return root;
}

function createRouteEntry(routesRoot, filePath) {
  const relative = path.relative(routesRoot, filePath).replace(/\\/g, '/');
  const withoutExt = relative.replace(/\.[^/.]+$/, '');
  const rawSegments = withoutExt.split('/');
  const segments = rawSegments
    .map((segment, idx) =>
      idx === rawSegments.length - 1 && segment === 'index'
        ? null
        : normalizeRouteSegment(segment)
    )
    .filter((segment) => segment !== null);

  const routePath =
    '/' + segments.filter(Boolean).join('/');

  return {
    route: routePath === '//' ? '/' : routePath.replace(/\/+/g, '/'),
    file: path.relative(ROOT, filePath),
    segments
  };
}

async function loadModuleExports(filePath) {
  if (!(await exists(filePath))) {
    return {};
  }

  const source = await fs.readFile(filePath, 'utf8');
  const exportConstRegex = /export\s+const\s+([A-Za-z0-9_$]+)\s*=/g;
  const exportFunctionRegex = /export\s+function\s+([A-Za-z0-9_$]+)/g;
  const exportDefaultRegex = /export\s+default\s+/g;

  const namedConsts = [];
  const namedFunctions = [];

  let transformed = source
    .replace(exportConstRegex, (_, name) => {
      namedConsts.push(name);
      return `const ${name} =`;
    })
    .replace(exportFunctionRegex, (_, name) => {
      namedFunctions.push(name);
      return `function ${name}`;
    })
    .replace(exportDefaultRegex, 'module.exports.default = ');

  for (const name of namedConsts) {
    transformed += `\nexports.${name} = ${name};`;
  }

  for (const name of namedFunctions) {
    transformed += `\nexports.${name} = ${name};`;
  }

  const context = {
    module: { exports: {} },
    exports: {},
    require,
    __dirname: path.dirname(filePath),
    __filename: filePath,
  };

  try {
    vm.runInNewContext(transformed, context, { filename: filePath });
  } catch (error) {
    console.warn(
      `Unable to evaluate exports from ${filePath}:`,
      error
    );
    return {};
  }

  return {
    ...context.module.exports,
    ...context.exports,
  };
}

async function parseExportedArray(filePath, exportName) {
  const value = await loadModuleExports(filePath).then(
    (exportsMap) => exportsMap[exportName]
  );
  return Array.isArray(value) ? value : [];
}

async function gatherStyleguideMetrics() {
  const atomsDir = path.join(ROOT, 'packages/ui/src/atoms');
  const moleculesDir = path.join(ROOT, 'packages/ui/src/molecules');
  const styleguideComponentsDir = path.join(
    ROOT,
    'apps/web/src/components/styleguide'
  );
  const styleguideRoutesDir = path.join(
    ROOT,
    'apps/web/src/routes/styleguide'
  );
  const webRoutesDir = path.join(ROOT, 'apps/web/src/routes');
  const webComponentsDir = path.join(ROOT, 'apps/web/src/components');
  const webDataDir = path.join(ROOT, 'apps/web/src/data');
  const webHooksDir = path.join(ROOT, 'apps/web/src/hooks');
  const webLibDir = path.join(ROOT, 'apps/web/src/lib');
  const studioRoot = path.join(ROOT, 'apps/studio');
  const contentSrcDir = path.join(ROOT, 'packages/content/src');
  const contentSchemasDir = path.join(contentSrcDir, 'schemas');
  const fontviewerSrcDir = path.join(ROOT, 'packages/fontviewer/src');
  const iconsDir = path.join(atomsDir, 'icons/svg');
  const logosDir = path.join(ROOT, 'packages/ui/src/atoms/logos/svg');
  const illustrationsDir = path.join(ROOT, 'packages/ui/src/atoms/illustrations/svg');
  const docsStyleguideDir = path.join(ROOT, 'docs/system');
  const navigationPath = path.join(
    ROOT,
    'apps/web/src/data/styleguide/navigation.js'
  );
  const colorTokensPath = path.join(
    ROOT,
    'apps/web/src/data/styleguide/tokens.js'
  );

  const [coreAtoms, foundryAtoms, coreMolecules, foundryMolecules] =
    await Promise.all([
      countJSXFiles(atomsDir, {
        excludeDirs: ['icons', 'foundry', 'logos', 'illustrations'],
      }),
      countJSXFiles(path.join(atomsDir, 'foundry'), { recursive: true }),
      countJSXFiles(moleculesDir, { excludeDirs: ['foundry'] }),
      countJSXFiles(path.join(moleculesDir, 'foundry'), { recursive: true }),
    ]);

  const [
    styleguideHelpers,
    styleguideRoutes,
    webRoutes,
    webComponents,
    webDataModules,
    webHookModules,
    webLibModules,
    studioModules,
    contentModuleCount,
    contentSchemaCount,
    fontviewerModules
  ] = await Promise.all([
    countJSXFiles(styleguideComponentsDir, { recursive: true }),
    countJSXFiles(styleguideRoutesDir, { recursive: true }),
    countFilesWithExtensions(webRoutesDir, ['.jsx', '.js', '.tsx', '.ts'], {
      recursive: true,
      excludeDirs: ['__tests__']
    }),
    countFilesWithExtensions(webComponentsDir, ['.jsx', '.js'], {
      recursive: true
    }),
    countFilesWithExtensions(webDataDir, ['.js', '.jsx', '.ts', '.tsx'], {
      recursive: true
    }),
    countFilesWithExtensions(webHooksDir, ['.js', '.jsx', '.ts', '.tsx'], {
      recursive: true
    }),
    countFilesWithExtensions(webLibDir, ['.js', '.jsx', '.ts', '.tsx'], {
      recursive: true
    }),
    countFilesWithExtensions(studioRoot, ['.ts', '.tsx'], {
      recursive: true,
      excludeDirs: ['dist']
    }),
    countFilesWithExtensions(contentSrcDir, ['.ts', '.tsx'], {
      recursive: true
    }),
    countFilesWithExtensions(contentSchemasDir, ['.ts'], {
      recursive: true
    }),
    countFilesWithExtensions(fontviewerSrcDir, ['.js', '.jsx'], {
      recursive: true
    })
  ]);

  const iconCount = await countFilesWithExtension(iconsDir, '.svg', {
    recursive: true,
  });

  const docsEntries = await collectFiles(docsStyleguideDir);
  const styleguideDocs = docsEntries
    .filter(
      (entry) =>
        entry.dirent.isFile() && entry.name.startsWith('5.') && entry.name.endsWith('.md')
    )
    .map((entry) => path.relative(ROOT, path.join(docsStyleguideDir, entry.name)));

  const navigation = await parseExportedArray(navigationPath, 'STYLEGUIDE_ROUTES');
  const navigationSummary = Array.isArray(navigation)
    ? {
        topLevel: navigation.length,
        totalLinks: navigation.reduce((total, route) => {
          if (route && Array.isArray(route.children)) {
            return total + route.children.length;
          }
          return total + 1;
        }, 0),
        groups: navigation
          .filter((route) => Array.isArray(route.children))
          .map((route) => ({
            id: route.id,
            label: route.label,
            children: route.children.length,
          })),
      }
    : { topLevel: 0, totalLinks: 0, groups: [] };

  const colorGroups = await parseExportedArray(colorTokensPath, 'colorGroups');
  const colorPairCount = Array.isArray(colorGroups)
    ? colorGroups.reduce((sum, group) => sum + (group.pairs?.length ?? 0), 0)
    : 0;

  const routeFiles = await collectFilesByExtensions(
    webRoutesDir,
    ['.js', '.jsx', '.ts', '.tsx'],
    { recursive: true }
  );
  const routeEntries = routeFiles.map((filePath) =>
    createRouteEntry(webRoutesDir, filePath)
  );
  const pageCount = routeEntries.length;
  const nestedPageCount = routeEntries.filter(
    (entry) => entry.segments.length > 1
  ).length;
  const routeTree = buildRouteTreeFromEntries(routeEntries);

  const desCardUsage = await countPatternOccurrences(
    path.join(ROOT, 'apps/web/src'),
    ['.js', '.jsx', '.ts', '.tsx'],
    /\bDesCard\b/g
  );

  const logoCount = await countFilesWithExtension(logosDir, '.svg', {
    recursive: true,
  });

  const illustrationCount = await countFilesWithExtension(illustrationsDir, '.svg', {
    recursive: true,
  });

  const uiIndexPaths = await listExistingPaths([
    path.join(ROOT, 'packages/ui/src/index.js'),
    path.join(ROOT, 'packages/ui/src/atoms/index.js'),
    path.join(ROOT, 'packages/ui/src/atoms/icons/index.js'),
    path.join(ROOT, 'packages/ui/src/atoms/illustrations/index.js'),
    path.join(ROOT, 'packages/ui/src/atoms/logos/index.js'),
    path.join(ROOT, 'packages/ui/src/atoms/foundry/index.js'),
    path.join(ROOT, 'packages/ui/src/molecules/index.js'),
    path.join(ROOT, 'packages/ui/src/molecules/foundry/index.js'),
    path.join(ROOT, 'packages/ui/src/organisms/index.js'),
    path.join(ROOT, 'packages/ui/src/organisms/foundry/index.js'),
    path.join(ROOT, 'packages/ui/src/common/index.js'),
    path.join(ROOT, 'packages/ui/src/hooks/index.js'),
    path.join(ROOT, 'packages/ui/src/data/index.js')
  ]);

  const contentIndexPaths = await listExistingPaths([
    path.join(ROOT, 'packages/content/src/index.ts')
  ]);

  const fontviewerIndexPaths = await listExistingPaths([
    path.join(ROOT, 'packages/fontviewer/src/index.js')
  ]);

  const webEntryPoints = await listExistingPaths([
    path.join(ROOT, 'apps/web/src/main.jsx'),
    path.join(ROOT, 'apps/web/src/App.jsx'),
    path.join(ROOT, 'apps/web/src/routes/styleguide.jsx')
  ]);

  const studioEntryPoints = await listExistingPaths([
    path.join(ROOT, 'apps/studio/sanity.config.ts'),
    path.join(ROOT, 'apps/studio/sanity.cli.ts')
  ]);

  const contentEntryPoints = await listExistingPaths([
    path.join(ROOT, 'packages/content/src/index.ts'),
    path.join(ROOT, 'packages/content/src/queries.ts')
  ]);

  const fontviewerEntryPoints = await listExistingPaths([
    path.join(ROOT, 'packages/fontviewer/src/index.js'),
    path.join(ROOT, 'packages/fontviewer/src/FontApp.js')
  ]);

  return {
    generatedAt: new Date().toISOString(),
    workspaces: {
      apps: {
        web: {
          routes: webRoutes,
          components: webComponents,
          dataModules: webDataModules,
          hooks: webHookModules,
          utilities: webLibModules,
          entryPoints: webEntryPoints
        },
        studio: {
          modules: studioModules,
          entryPoints: studioEntryPoints
        }
      },
      packages: {
        ui: {
          indexes: uiIndexPaths
        },
        content: {
          modules: contentModuleCount,
          schemas: contentSchemaCount,
          entryPoints: contentEntryPoints
        },
        fontviewer: {
          modules: fontviewerModules,
          entryPoints: fontviewerEntryPoints,
          indexes: fontviewerIndexPaths
        }
      }
    },
    packages: {
      ui: {
        atoms: {
          core: coreAtoms,
          foundry: foundryAtoms,
          total: coreAtoms + foundryAtoms,
        },
        molecules: {
          core: coreMolecules,
          foundry: foundryMolecules,
          total: coreMolecules + foundryMolecules,
        },
        icons: {
          total: iconCount,
        },
        indexes: uiIndexPaths,
      },
      content: {
        modules: contentModuleCount,
        schemas: contentSchemaCount,
        entryPoints: contentEntryPoints,
      },
      fontviewer: {
        modules: fontviewerModules,
        entryPoints: fontviewerEntryPoints,
        indexes: fontviewerIndexPaths,
      },
    },
    styleguide: {
      components: {
        helpers: styleguideHelpers,
        routes: styleguideRoutes,
      },
      navigation: navigationSummary,
    },
    documentation: {
      styleguideChapters: styleguideDocs.length,
      files: styleguideDocs,
    },
    site: {
      pages: {
        total: pageCount,
        nested: nestedPageCount,
        entries: routeEntries
          .map(({ route, file, segments }) => ({ route, file, depth: segments.length }))
          .sort((a, b) => a.route.localeCompare(b.route)),
        tree: routeTree,
      },
      assets: {
        logos: logoCount,
        illustrations: illustrationCount,
        desCardUsage,
      },
    },
    tokens: {
      colorGroups: Array.isArray(colorGroups) ? colorGroups.length : 0,
      colorPairs: colorPairCount,
    },
  };
}

async function main() {
  const metrics = await gatherStyleguideMetrics();
  const payload = JSON.stringify(metrics, null, JSON_INDENT) + '\n';
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, payload, 'utf8');
  // eslint-disable-next-line no-console
  console.log(`Wrote styleguide metrics to ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((error) => {
  console.error('Failed to generate styleguide metrics:', error);
  process.exitCode = 1;
});
