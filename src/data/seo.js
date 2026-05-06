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
  const siteTitle = 'Alex Coronado — Software Engineer & Solutions Architect';
  const pageTitle = title ? `${title} · ${siteTitle}` : siteTitle;
  const canonical = process.env.VITE_SITE_URL ? new URL(pathname, process.env.VITE_SITE_URL).toString() : '__SITE_CANONICAL__';
  const ogImage = image || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&h=630&fit=crop&q=80';
  const defaultKeywords = [
    'solutions architect',
    'enterprise software',
    'B2B SaaS',
    'technical sales',
    'digital transformation',
    'XR training',
    'software engineer',
    'scalable architecture'
  ];
  const finalKeywords = Array.isArray(keywords) && keywords.length ? keywords : defaultKeywords;

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alex Coronado",
    "url": canonical,
    "image": ogImage,
    "jobTitle": "Software Engineer, Solutions Architect & Technical Sales",
    "description": description || "I build scalable B2B SaaS platforms, XR training experiences, and enterprise digital products. I collaborate with gamespiration and Fyware on technical delivery when appropriate.",
    "affiliation": [
      {
        "@type": "Organization",
        "name": "gamespiration",
        "description": "Collaboration on app and platform development and 2D/3D asset creation with Alex Coronado."
      },
      {
        "@type": "Organization",
        "name": "Fyware",
        "description": "Collaboration on XR (VR/AR) solutions for training, upskilling and marketing experiences with Alex Coronado."
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
      { name: 'keywords', content: Array.isArray(finalKeywords) ? finalKeywords.join(', ') : finalKeywords },
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
