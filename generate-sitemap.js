import fs from 'fs';
// We import the raw text and parse it or import directly if environment allows
// For a simple Node script, we'll use the direct import
import { PRODUCTS } from './src/components/Data.jsx'; 

const BASE_URL = 'https://bimmerbarnperformance.com';

const generateSitemap = () => {
  const staticRoutes = [
    '',
    '/shop',
  ];

  // This matches your ProductDetail logic: use slug if it exists, otherwise use ID
  const productRoutes = PRODUCTS.map(product => {
    const identifier = product.slug || product.id;
    return `/product/${identifier}`;
  });

  const allRoutes = [...staticRoutes, ...productRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => {
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  // Ensure the public directory exists
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
  }

  fs.writeFileSync('./public/sitemap.xml', sitemap);
  console.log(`✅ Sitemap generated with ${allRoutes.length} links.`);
};

generateSitemap();