#!/usr/bin/env node
// Parse _tmp/icons/icons.jsx + icons-extra-1.jsx (JSX-as-data icon arrays)
// and emit individual .svg files into _staging/icons/{solid,stroke}/<cat>/<name>.svg.
//
// Each ICONS entry has: { name, cat, solid: <jsx>, stroke: <jsx> }
// JSX is plain SVG element trees (path/circle/rect/...) optionally wrapped in fragments.

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
// @babel/parser is a transitive dep — resolve through the pnpm-virtual-store path
const parserPath = '../node_modules/.pnpm/@babel+parser@7.29.2/node_modules/@babel/parser/lib/index.js'
const { parse } = require(parserPath)
import { readFileSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC_FILES = [
  join(ROOT, '_tmp/icons/icons.jsx'),
  join(ROOT, '_tmp/icons/icons-extra-1.jsx'),
]
const OUT_BASE = join(ROOT, 'src/_staging/icons')

const REACT_ATTR_TO_SVG = {
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  fillRule: 'fill-rule',
  fillOpacity: 'fill-opacity',
  clipRule: 'clip-rule',
  clipPath: 'clip-path',
  vectorEffect: 'vector-effect',
  textAnchor: 'text-anchor',
  fontSize: 'font-size',
  fontFamily: 'font-family',
  fontWeight: 'font-weight',
  letterSpacing: 'letter-spacing',
  preserveAspectRatio: 'preserveAspectRatio', // SVG kebab-exception, kept camel
}

function attrName(name) {
  return REACT_ATTR_TO_SVG[name] ?? name
}

// Built-in `Math` namespace surface we expose to evaluated expressions.
const MATH_NS = {
  PI: Math.PI,
  E: Math.E,
  cos: Math.cos,
  sin: Math.sin,
  tan: Math.tan,
  abs: Math.abs,
  round: Math.round,
  floor: Math.floor,
  ceil: Math.ceil,
  sqrt: Math.sqrt,
  pow: Math.pow,
  min: Math.min,
  max: Math.max,
}

// Evaluate a simple JS expression to a literal value, with `bindings` for identifiers.
// Supports: literals, identifiers (via bindings), unary/binary arithmetic,
// template literals, Math.* references, simple member access on bound arrays/objects,
// `Array(N)` calls + array-spread `[...Array(N)]` patterns.
function evalExpr(node, bindings) {
  switch (node.type) {
    case 'NumericLiteral':
    case 'StringLiteral':
    case 'BooleanLiteral':
      return node.value
    case 'NullLiteral':
      return null
    case 'Identifier':
      if (node.name === 'Math') return MATH_NS
      if (node.name === 'undefined') return undefined
      if (!Object.prototype.hasOwnProperty.call(bindings, node.name)) {
        throw new Error(`Unbound identifier: ${node.name}`)
      }
      return bindings[node.name]
    case 'MemberExpression': {
      const obj = evalExpr(node.object, bindings)
      const key = node.computed ? evalExpr(node.property, bindings) : node.property.name
      if (obj == null) throw new Error(`Member access on null/undefined: .${key}`)
      return obj[key]
    }
    case 'CallExpression': {
      const callee = node.callee
      // Bare callable identifier: e.g. Array(8)
      if (callee.type === 'Identifier' && callee.name === 'Array') {
        const args = node.arguments.map((a) => evalExpr(a, bindings))
        return Array(...args)
      }
      // Method call: Math.cos(a) / Math.PI etc.
      if (callee.type === 'MemberExpression') {
        const recv = evalExpr(callee.object, bindings)
        const fn = recv[callee.property.name]
        if (typeof fn !== 'function') throw new Error(`Not a function: ${callee.property.name}`)
        const args = node.arguments.map((a) => evalExpr(a, bindings))
        return fn.apply(recv, args)
      }
      throw new Error(`Unsupported call in evalExpr: ${callee.type}`)
    }
    case 'ArrayExpression': {
      const out = []
      for (const e of node.elements) {
        if (e == null) {
          out.push(undefined)
        } else if (e.type === 'SpreadElement') {
          const inner = evalExpr(e.argument, bindings)
          if (!Array.isArray(inner) && !(inner && typeof inner.length === 'number')) {
            throw new Error('Spread target is not iterable in array literal')
          }
          for (let i = 0; i < inner.length; i++) out.push(inner[i])
        } else {
          out.push(evalExpr(e, bindings))
        }
      }
      return out
    }
    case 'UnaryExpression': {
      const v = evalExpr(node.argument, bindings)
      if (node.operator === '-') return -v
      if (node.operator === '+') return +v
      if (node.operator === '!') return !v
      throw new Error(`Unary op unsupported: ${node.operator}`)
    }
    case 'BinaryExpression': {
      const l = evalExpr(node.left, bindings)
      const r = evalExpr(node.right, bindings)
      switch (node.operator) {
        case '+': return l + r
        case '-': return l - r
        case '*': return l * r
        case '/': return l / r
        case '%': return l % r
        default: throw new Error(`Binary op unsupported: ${node.operator}`)
      }
    }
    case 'TemplateLiteral': {
      let out = ''
      for (let i = 0; i < node.quasis.length; i++) {
        out += node.quasis[i].value.cooked
        if (i < node.expressions.length) out += String(evalExpr(node.expressions[i], bindings))
      }
      return out
    }
    default:
      throw new Error(`Unsupported expression in attr/eval: ${node.type}`)
  }
}

function fmtNum(n) {
  // Round to 3 decimal places, strip trailing zeros / decimal point.
  return Number.parseFloat(n.toFixed(3)).toString()
}

function attrValueText(value, bindings = {}) {
  if (!value) return null // bare boolean attr — skip
  if (value.type === 'StringLiteral') return value.value
  if (value.type === 'JSXExpressionContainer') {
    const v = evalExpr(value.expression, bindings)
    if (typeof v === 'number') return fmtNum(v)
    return String(v)
  }
  throw new Error(`Unsupported attr value type: ${value.type}`)
}

function serializeElement(node, bindings = {}) {
  if (node.type === 'JSXElement') {
    const tag = node.openingElement.name.name
    const attrs = node.openingElement.attributes
      .filter((a) => {
        // Drop React-only attrs that have no SVG meaning.
        if (a.type === 'JSXAttribute' && a.name.name === 'key') return false
        return true
      })
      .map((a) => {
        if (a.type !== 'JSXAttribute') throw new Error('JSX spread not supported')
        const name = attrName(a.name.name)
        const val = attrValueText(a.value, bindings)
        return val == null ? name : `${name}="${val}"`
      })
      .join(' ')
    const open = attrs ? `<${tag} ${attrs}` : `<${tag}`
    const children = node.children
      .map((c) => serializeChild(c, bindings))
      .filter((s) => s.length > 0)
      .join('')
    if (node.openingElement.selfClosing || children.length === 0) {
      return `${open} />`
    }
    return `${open}>${children}</${tag}>`
  }
  if (node.type === 'JSXFragment') {
    return node.children.map((c) => serializeChild(c, bindings)).filter((s) => s.length > 0).join('')
  }
  throw new Error(`Unsupported root JSX type: ${node.type}`)
}

// Unroll `<arr>.map((param[, idx]) => body)` and `flatMap` (treated identically since
// our output already concatenates strings, flattening implicitly). Nested calls supported.
function evalMapExpression(callExpr, bindings) {
  if (callExpr.type !== 'CallExpression') {
    throw new Error(`Expected CallExpression, got ${callExpr.type}`)
  }
  const callee = callExpr.callee
  if (callee.type !== 'MemberExpression') {
    throw new Error(`Unsupported call shape: ${callee.type}`)
  }
  const methodName = callee.property.name
  if (methodName !== 'map' && methodName !== 'flatMap' && methodName !== 'forEach') {
    throw new Error(`Unsupported call: MemberExpression/${methodName}`)
  }
  const arrValue = evalExpr(callee.object, bindings)
  if (!Array.isArray(arrValue)) {
    throw new Error(`map() target evaluated to non-array (${typeof arrValue})`)
  }
  const fn = callExpr.arguments[0]
  if (fn.type !== 'ArrowFunctionExpression') {
    throw new Error(`map() arg must be arrow fn, got ${fn?.type}`)
  }
  const paramName0 = fn.params[0]?.name ?? '_'
  const paramName1 = fn.params[1]?.name
  const out = []
  for (let i = 0; i < arrValue.length; i++) {
    const innerBindings = { ...bindings, [paramName0]: arrValue[i] }
    if (paramName1) innerBindings[paramName1] = i
    out.push(evalChildExpression(fn.body, innerBindings))
  }
  return out.join('')
}

// Evaluate an arrow-fn body or any in-children JSX expression.
function evalChildExpression(node, bindings) {
  if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
    return serializeElement(node, bindings)
  }
  if (node.type === 'CallExpression') {
    return evalMapExpression(node, bindings)
  }
  if (node.type === 'BlockStatement') {
    // Arrow fn with block body: support local `const`/`let` decls then a return.
    const local = { ...bindings }
    for (const stmt of node.body) {
      if (stmt.type === 'VariableDeclaration') {
        for (const d of stmt.declarations) {
          if (d.id.type !== 'Identifier') {
            throw new Error(`Destructuring not supported in block decl: ${d.id.type}`)
          }
          local[d.id.name] = evalExpr(d.init, local)
        }
        continue
      }
      if (stmt.type === 'ReturnStatement') return evalChildExpression(stmt.argument, local)
      throw new Error(`Unsupported statement in arrow block: ${stmt.type}`)
    }
    throw new Error('Block-body arrow without return statement')
  }
  if (node.type === 'ArrayExpression') {
    return node.elements.map((e) => evalChildExpression(e, bindings)).join('')
  }
  throw new Error(`Unsupported child expression: ${node.type}`)
}

function serializeChild(child, bindings = {}) {
  if (child.type === 'JSXElement' || child.type === 'JSXFragment') {
    return serializeElement(child, bindings)
  }
  if (child.type === 'JSXText') {
    const trimmed = child.value.replace(/\s+/g, ' ').trim()
    return trimmed
  }
  if (child.type === 'JSXExpressionContainer') {
    const expr = child.expression
    if (expr.type === 'JSXEmptyExpression') return ''
    return evalChildExpression(expr, bindings)
  }
  throw new Error(`Unsupported child type: ${child.type}`)
}

function getProp(objNode, key) {
  for (const prop of objNode.properties) {
    if (prop.type === 'ObjectProperty' && prop.key.name === key) return prop.value
    if (prop.type === 'ObjectProperty' && prop.key.value === key) return prop.value
  }
  return null
}

function strLit(node) {
  if (!node) return null
  if (node.type === 'StringLiteral') return node.value
  return null
}

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function wrapSvg(inner, variant) {
  const stroke = variant === 'stroke'
    ? 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
    : 'fill="currentColor"'
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" ${stroke}>${inner}</svg>\n`
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true })
}

const stats = {
  files: 0,
  entries: 0,
  written: { solid: 0, stroke: 0 },
  skipped: [],
  collisions: [],
}

const seen = new Map() // `${variant}/${cat}/${name}` → src file (for collision tracking)

for (const file of SRC_FILES) {
  if (!existsSync(file)) {
    console.warn(`skip missing: ${file}`)
    continue
  }
  stats.files++
  const code = readFileSync(file, 'utf8')
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx'],
  })

  // Find first VariableDeclarator with init = ArrayExpression
  let arrayNode = null
  for (const stmt of ast.program.body) {
    if (stmt.type !== 'VariableDeclaration') continue
    for (const d of stmt.declarations) {
      if (d.init && d.init.type === 'ArrayExpression') {
        arrayNode = d.init
        break
      }
    }
    if (arrayNode) break
  }
  if (!arrayNode) {
    console.error(`no ICONS array in ${file}`)
    continue
  }

  for (const el of arrayNode.elements) {
    if (!el || el.type !== 'ObjectExpression') continue
    stats.entries++
    const name = strLit(getProp(el, 'name'))
    const cat = strLit(getProp(el, 'cat'))
    if (!name || !cat) {
      stats.skipped.push({ file, reason: 'missing name/cat' })
      continue
    }
    const catSlug = slug(cat)
    const nameSlug = slug(name)
    for (const variant of ['solid', 'stroke']) {
      const node = getProp(el, variant)
      if (!node) continue
      let inner
      try {
        inner = serializeElement(node)
      } catch (err) {
        stats.skipped.push({ file, name, cat, variant, reason: err.message })
        continue
      }
      const key = `${variant}/${catSlug}/${nameSlug}`
      if (seen.has(key)) {
        stats.collisions.push({ key, prev: seen.get(key), now: file })
      }
      seen.set(key, file)
      const outDir = join(OUT_BASE, variant, catSlug)
      ensureDir(outDir)
      const outPath = join(outDir, `${nameSlug}.svg`)
      writeFileSync(outPath, wrapSvg(inner, variant))
      stats.written[variant]++
    }
  }
}

console.log('--- extract-claude-icons ---')
console.log(`files parsed: ${stats.files}`)
console.log(`entries seen: ${stats.entries}`)
console.log(`solid svgs:   ${stats.written.solid}`)
console.log(`stroke svgs:  ${stats.written.stroke}`)
console.log(`skipped:      ${stats.skipped.length}`)
if (stats.skipped.length) {
  for (const s of stats.skipped.slice(0, 10)) {
    console.log(`  - ${s.cat || '?'}/${s.name || '?'} (${s.variant || '?'}): ${s.reason}`)
  }
}
console.log(`collisions:   ${stats.collisions.length}`)
if (stats.collisions.length) {
  for (const c of stats.collisions.slice(0, 10)) {
    console.log(`  - ${c.key}: ${c.prev} vs ${c.now}`)
  }
}
