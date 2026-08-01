/**
 * EmbedFrame — a full-height iframe for a surface that lives in another repo.
 *
 * Sibling of `apps/web/src/routes/workshop/EmbedFrame.jsx`, minus the workshop
 * shell contexts (ShellFullHeightContext / ShellTocCollapsedContext) — brand's
 * BrandLayout has no rail to collapse and no full-height mode to enter, so the
 * page owns its own height instead.
 *
 * That height is `h-dvh`, the SAME unit `SideNav` takes for its own column
 * (SideNav.jsx). Both grid children then agree on viewport height, so the frame
 * scrolls its own content and the page behind it never gains a second scrollbar.
 * `.kol-brand-layout` is a two-column grid with no row height of its own — a
 * bare `h-full` here would resolve against nothing and collapse the frame.
 *
 * `className` overrides that height for hosts that already own it — a page with
 * its own header above the frame must not add a second full viewport below it.
 *
 * @param {string} src        absolute URL of the deployed surface
 * @param {string} title      iframe accessible name
 * @param {string} className  wrapper classes; defaults to the full-viewport case
 */
export default function EmbedFrame({ src, title, className = 'h-dvh' }) {
  return (
    <div className={className}>
      <iframe src={src} title={title} className="h-full w-full border-0" />
    </div>
  )
}
