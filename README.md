# Steven Fouts

Executive résumé and business portfolio website at https://stevenfouts.com.

## Development and deployment

Requires Node.js 22+.

```sh
npm ci
npm run build
npm test
npm run dev
npm run deploy
```

Cloudflare authentication is required for deployment. `wrangler.jsonc` declares the Worker, apex domain, and www domain. The www hostname redirects to the apex. Workers.dev also redirects to the primary domain, except `/health`.

Edit `public/index.html`, `public/styles.css`, and `public/app.js`. The build embeds the small, finite set of public assets in a standalone Worker module, so the same deployment can be published through the Cloudflare API or Wrangler without an external storage dependency. Asset responses support ETags, HEAD, caching, security headers, and real 404 status codes. No visitor data is collected and no credentials belong in this repository.

The supplied portrait is optimized as `public/steven-fouts.webp`. The loader is decorative, dismisses automatically, and is disabled for reduced motion. Content remains available without JavaScript. Navigation and contact links use native anchors.

## Content boundaries

Facts supplied by the site requester: current work at Monastic Marketing and The Everyday Company; 1,000+ trainers on the latter's platform; eight years in the U.S. Marine Corps; acquisition and exit experience in restaurant, side-by-side touring, event center, and wedding venue businesses; expertise in technology, AI automation, consulting, and business management. No ranks, employment titles, service dates, transaction values, company names for exited businesses, or financial results have been added.

Portrait and personal content are provided for this website. No license to reuse them is granted.
