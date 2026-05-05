/**
 * Helper SEO + JSON-LD templates
 *
 * Usage:
 * import buildSeo from '../data/seo';
 * const seo = buildSeo({
 *   title: 'Servicios',
 *   description: 'Soluciones a medida para PyMEs...',
 *   pathname: '/servicios',
 *   image: '/assets/og-servicios.png',
 *   keywords: ['software', 'PyMEs', 'XR']
 * });
 *
 * Then use `seo.title`, `seo.metaTags`, `seo.og`, `seo.twitter` and `seo.jsonLd`
 * to render head tags or inject into templates.
 */

export function buildSeo({ title, description, pathname = '/', image, keywords = [] } = {}) {
  const siteTitle = 'Alex Coronado — Software para PyMEs e Industria';
  const pageTitle = title ? `${title} · ${siteTitle}` : siteTitle;
  const canonical = process.env.VITE_SITE_URL ? new URL(pathname, process.env.VITE_SITE_URL).toString() : '__SITE_CANONICAL__';
  const ogImage = image || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&h=630&fit=crop&q=80';

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alex Coronado",
    "url": canonical,
    "image": ogImage,
    "jobTitle": "Software Developer, Solutions Architect y Technical Sales",
    "description": description || "Desarrollo software a medida para PyMEs y empresas industriales.",
    "affiliation": [
      {
        "@type": "Organization",
        "name": "Gamespiration",
        "description": "Desarrollo de apps, plataformas, CRM/ERP y creación de assets 2D/3D."
      },
      {
        "@type": "Organization",
        "name": "Fyware",
        "description": "Soluciones XR (VR/AR) para entrenamiento, capacitación y experiencias de marketing."
      }
    ]
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": canonical,
    "name": pageTitle,
    "description": description
  };

  return {
    title: pageTitle,
    description: description,
    canonical,
    metaTags: [
      { name: 'description', content: description || '' },
      { name: 'keywords', content: Array.isArray(keywords) ? keywords.join(', ') : keywords },
      { name: 'robots', content: 'index,follow,max-image-preview:large' }
    ],
    og: {
      'og:type': 'website',
      'og:title': pageTitle,
      'og:description': description || '',
      'og:image': ogImage,
      'og:url': canonical
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:title': pageTitle,
      'twitter:description': description || '',
      'twitter:image': ogImage
    },
    jsonLd: [jsonLdPerson, jsonLdWebSite]
  };
}

export default buildSeo;
