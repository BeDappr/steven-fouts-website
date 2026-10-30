import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
// Compose a code-native sharing card without modifying the supplied portrait.
const portrait = await readFile('public/steven-fouts.webp');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
<defs><clipPath id="photo"><rect x="760" y="0" width="440" height="630"/></clipPath><linearGradient id="shade"><stop stop-color="#101d2b" stop-opacity=".3"/><stop offset=".4" stop-color="#101d2b" stop-opacity="0"/></linearGradient></defs>
<rect width="1200" height="630" fill="#101d2b"/>
<image x="760" y="0" width="504" height="630" xlink:href="data:image/webp;base64,${portrait.toString('base64')}" clip-path="url(#photo)"/>
<rect x="760" width="440" height="630" fill="url(#shade)"/>
<rect x="60" y="54" width="45" height="3" fill="#b34a53"/><rect x="111" y="54" width="45" height="3" fill="#eee9e0"/><rect x="162" y="54" width="45" height="3" fill="#5275a0"/>
<text x="60" y="112" fill="#c0a379" font-size="13" font-family="Arial,sans-serif" letter-spacing="3">TECHNOLOGY. BUSINESS. PURPOSE.</text>
<text x="56" y="224" fill="#f5f3ee" font-size="82" font-family="Georgia,serif">Steven Fouts<tspan fill="#c0a379">.</tspan></text>
<text x="60" y="288" fill="#f5f3ee" font-size="25" font-family="Arial,sans-serif">Technology · AI automation</text>
<text x="60" y="329" fill="#bdc7cf" font-size="25" font-family="Arial,sans-serif">Consulting · Business management</text>
<path d="M60 368H680" stroke="#354351"/>
<text x="60" y="409" fill="#c0a379" font-size="16" font-family="Arial,sans-serif">Monastic Marketing  /  The Everyday Company</text>
<text x="60" y="450" fill="#bdc7cf" font-size="16" font-family="Arial,sans-serif">U.S. Marine Corps veteran · 8 years of service</text>
<text x="60" y="558" fill="#f5f3ee" font-size="18" font-family="Arial,sans-serif" letter-spacing="2">STEVENFOUTS.COM</text>
</svg>`;
const photo = await sharp(portrait).resize(440, 630, { fit: 'cover', position: 'centre' }).png().toBuffer();
await sharp(Buffer.from(svg)).composite([{ input: photo, left: 760, top: 0 }]).jpeg({ quality: 90, mozjpeg: true }).toFile('public/steven-fouts-social-v2.jpg');
console.log('Created social share image: 1200 × 630 JPEG');
