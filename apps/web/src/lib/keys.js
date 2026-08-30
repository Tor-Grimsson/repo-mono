/* Shared by every keyboard shortcut on the site: a hotkey must never eat a
 * keystroke meant for a field. `/prints` runs bare letters (a · p · r), so the
 * search input in ContentFilters would otherwise become unusable the moment it
 * has focus. contentEditable is in here because rich-text surfaces are not
 * inputs but still swallow typing. */
export const isTypingTarget = (e) => {
  const el = e.target
  if (!el) return false
  if (el.isContentEditable) return true
  const tag = el.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}

/* Fisher-Yates. `sort(() => Math.random() - 0.5)` is not a shuffle — the
 * comparator is inconsistent, so V8's sort leaves a measurably biased order
 * (the first items stay near the front). */
export const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* Per-card coin flip, keyed by slug. `/prints` loads each card as EITHER its
 * artwork or its print photo — that mix is the page's look, not a fallback —
 * and the pick has to be stable for the life of a render pass or every
 * re-render reshuffles the wall under you. Re-rolled with the order. */
export const rollKinds = (items, kinds = ['artwork', 'print']) =>
  Object.fromEntries(items.map((it) => [it.slug, kinds[Math.floor(Math.random() * kinds.length)]]))
