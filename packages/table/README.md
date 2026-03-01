# @kol/table

Standalone data table component. Copy of the Table molecule from `@kol/ui` — the source of truth lives in `packages/ui/src/molecules/Table.jsx` and `packages/ui/css/components.css`.

## Setup — React + Vite + Tailwind v4

### 1. Copy the package

Copy the `packages/table/` folder into your project. Place it wherever makes sense — e.g. `src/components/table/` or `packages/table/`.

### 2. Import CSS

In your main CSS entry point (e.g. `src/index.css`), import the table styles **after** Tailwind:

```css
@import "tailwindcss";
@import "./path-to/table/css/table.css";
```

### 3. Import the component

```jsx
import Table from './path-to/table/src/Table'
```

### 4. Use it

```jsx
const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Role', accessor: 'role', className: 'kol-table-cell-meta' },
  { header: 'Status', accessor: 'status', render: (row) => (
    <span className="kol-table-pill kol-table-pill-dark">{row.status}</span>
  )},
]

const rows = [
  { id: 1, name: 'Alice', role: 'Engineer', status: 'Active' },
  { id: 2, name: 'Bob', role: 'Designer', status: 'Away' },
]

<Table caption="Team members" columns={columns} rows={rows} />
```

## Theming

The CSS ships with light-mode defaults via `:root`. All visual properties derive from 5 CSS custom properties — override them to theme.

### Token contract

| Token | Default | Controls |
|---|---|---|
| `--kol-font-family-mono` | system monospace | Table font stack |
| `--kol-surface-on-primary` | `#121215` | Text, borders (via `color-mix`) |
| `--kol-surface-primary` | `#fcfbfb` | Pill-dark text color |
| `--kol-surface-secondary` | `#f4f3f2` | Pill-light background |
| `--kol-surface-on-secondary` | `#121215` | Pill-light text |
| `--kol-accent-primary` | `#0a682a` | Link hover color |

### Dark mode with theme toggle

Override the tokens on a scoped selector. The toggle mechanism is up to you — class on `<html>`, `data-theme` attribute, media query, etc.

**Option A — class toggle** (recommended with Tailwind v4 `darkMode: 'class'`):

```css
/* In your theme CSS, after importing table.css */
.dark {
  --kol-font-family-mono: 'Your Mono Font', ui-monospace, monospace;
  --kol-surface-on-primary: #fcfbfb;
  --kol-surface-primary: #121215;
  --kol-surface-secondary: #1e1e22;
  --kol-surface-on-secondary: #e0dfde;
  --kol-accent-primary: #34d058;
}
```

Toggle by adding/removing `dark` class on `<html>`:

```jsx
document.documentElement.classList.toggle('dark')
```

**Option B — data attribute:**

```css
[data-theme="dark"] {
  --kol-surface-on-primary: #fcfbfb;
  --kol-surface-primary: #121215;
  --kol-surface-secondary: #1e1e22;
  --kol-surface-on-secondary: #e0dfde;
  --kol-accent-primary: #34d058;
}
```

**Option C — system preference:**

```css
@media (prefers-color-scheme: dark) {
  :root {
    --kol-surface-on-primary: #fcfbfb;
    --kol-surface-primary: #121215;
    --kol-surface-secondary: #1e1e22;
    --kol-surface-on-secondary: #e0dfde;
    --kol-accent-primary: #34d058;
  }
}
```

All three approaches work because the table CSS reads tokens at render time — no rebuild needed.

## Variants

**Default** — bordered with column separators and subtle header background:

```jsx
<Table columns={columns} rows={rows} />
```

**Simple** — borderless, minimal, no column separators, flush edge padding:

```jsx
<Table columns={columns} rows={rows} className="kol-table--simple" />
```

## Component API

| Prop | Type | Default | Description |
|---|---|---|---|
| `caption` | string | — | Accessible table caption (visually hidden via `sr-only`) |
| `columns` | array | required | Column definitions (see below) |
| `rows` | array | required | Array of data objects |
| `className` | string | `''` | Additional classes on the wrapper (e.g. `kol-table--simple`) |

### Column definition

| Key | Type | Default | Description |
|---|---|---|---|
| `header` | string | required | Column header text |
| `accessor` | string | required | Key to read from each row object |
| `render` | function | — | Custom render: `(row) => JSX`. Falls back to `row[accessor]` or `—` |
| `className` | string | `kol-table-cell-text` | Cell `<td>` class |
| `headerClassName` | string | `kol-table-cell-title` | Header `<th>` class |
| `style` | object | — | Inline styles on both `<th>` and `<td>` |

### Available cell classes

| Class | Purpose |
|---|---|
| `kol-table-cell-title` | Header cells — uppercase, small, nowrap |
| `kol-table-cell-text` | Standard body cells — 13px, nowrap |
| `kol-table-cell-meta` | Description cells — 10px, muted, wrapping, max-width 24rem |
| `kol-table-cell-meta-strong` | Like meta but full opacity |

### Available utility classes

| Class | Purpose |
|---|---|
| `kol-table-pill` | Base pill (combine with a variant below) |
| `kol-table-pill-light` | Light background pill |
| `kol-table-pill-muted` | Muted background pill |
| `kol-table-pill-dark` | Inverted (dark bg, light text) pill |
| `kol-table-token` | Inline code-like token badge |
| `kol-table-pair` | Min-width container for key-value pairs |
| `kol-table-meta` | Inline meta text (no padding, use inside cells) |
| `kol-table-meta-strong` | Inline meta text at full opacity |

## No dependencies

The component requires only React as a peer dependency. No Tailwind runtime, no build plugins, no CSS-in-JS. The CSS is plain CSS with CSS custom properties and `color-mix()`.
