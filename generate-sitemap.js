import fs from 'fs';
// We now point to the renamed .js file
import { PRODUCTS } from './src/components/data.js'; 

const BASE_URL = 'https://bimmerbarnperformance.com';

const generateSitemap = () => {
  try {
    const staticRoutes = ['', '/shop'];
    
    // Fallback to ID if Slug isn't present
    const productRoutes = (PRODUCTS || []).map(product => {
      const identifier = product.slug || product.id;
      return `/product/${identifier}`;
    });

    const allRoutes = [...staticRoutes, ...productRoutes];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`)
  .join('\n')}
</urlset>`;

    if (!fs.existsSync('./public')) {
      fs.mkdirSync('./public', { recursive: true });
    }

    fs.writeFileSync('./public/sitemap.xml', sitemap);
    console.log(`✅ Success! Sitemap created with ${allRoutes.length} links.`);
    
  } catch (error) {
    console.error('⚠️ Sitemap skipped due to error:', error.message);
  }
};

generateSitemap();