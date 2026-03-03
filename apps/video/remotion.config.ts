import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    resolve: {
      ...currentConfiguration.resolve,
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    module: {
      ...currentConfiguration.module,
      rules: [
        // Disable fullySpecified for @kol packages (extensionless .jsx imports)
        {
          test: /\.jsx?$/,
          resolve: { fullySpecified: false },
        },
        ...(currentConfiguration.module?.rules ?? []),
      ],
    },
    // Override module again below for css-loader — merged after spread
  } as any;
});

// Second override: css-loader url:false (applied on top of the first)
Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: (currentConfiguration.module?.rules ?? []).map((rule) => {
        if (
          rule &&
          typeof rule === "object" &&
          rule.test instanceof RegExp &&
          rule.test.test(".css")
        ) {
          return {
            ...rule,
            use: Array.isArray(rule.use)
              ? rule.use.map((loader: unknown) => {
                  // css-loader as a plain string (Remotion's default)
                  if (
                    typeof loader === "string" &&
                    loader.includes("css-loader")
                  ) {
                    return {
                      loader,
                      options: { url: false },
                    };
                  }
                  // css-loader as an object with loader property
                  if (
                    typeof loader === "object" &&
                    loader !== null &&
                    "loader" in loader &&
                    typeof (loader as any).loader === "string" &&
                    (loader as any).loader.includes("css-loader")
                  ) {
                    return {
                      ...(loader as any),
                      options: { ...(loader as any).options, url: false },
                    };
                  }
                  return loader;
                })
              : rule.use,
          };
        }
        return rule;
      }),
    },
  };
});
