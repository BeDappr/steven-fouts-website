export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.hostname === 'www.stevenfouts.com' || (url.hostname.endsWith('.workers.dev') && url.pathname !== '/health')) {
      return Response.redirect(`https://stevenfouts.com${url.pathname}${url.search}`, 301);
    }
    const security = {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Strict-Transport-Security': 'max-age=31536000',
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'"
    };
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { ...security, Allow: 'GET, HEAD' } });
    if (url.pathname === '/health') return new Response(request.method === 'HEAD' ? null : JSON.stringify({ status: 'ok', site: 'steven-fouts-website' }), { headers: { ...security, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    const path = url.pathname === '/' ? '/index.html' : url.pathname;
    const found = Object.hasOwn(assets, path);
    const asset = assets[found ? path : '/404.html'];
    const headers = { ...security, 'Content-Type': asset.type, ETag: asset.etag, 'Cache-Control': asset.type.startsWith('text/html') ? 'public, max-age=0, must-revalidate' : 'public, max-age=3600, must-revalidate' };
    if (found && request.headers.get('If-None-Match') === asset.etag) return new Response(null, { status: 304, headers });
    const body = request.method === 'HEAD' ? null : Uint8Array.from(atob(asset.body), char => char.charCodeAt(0));
    return new Response(body, { status: found ? 200 : 404, headers });
  }
};
