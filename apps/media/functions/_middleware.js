// ONE HOSTNAME (user, 2026-10-05): the app lives at media.kolkrabbi.io. The old admin
// hostname stays attached only to send everything that still names it — a bookmark,
// brand's Library link, the kol-media-client default, the dotfiles bucket scripts —
// to the same path on media. Detach `admin.` once nothing names it; this file then goes.
export const onRequest = async (context) => {
  const url = new URL(context.request.url);
  if (url.hostname === 'admin.kolkrabbi.io') {
    url.hostname = 'media.kolkrabbi.io';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
};
