/**
 * Helper SEO + JSON-LD templates.
 */

export function buildSeo({ title, description, pathname = '/', image, keywords = [] } = {}) {
  const siteTitle = 'Alex Coronado - Senior Software Engineer & Solutions Architect';
  const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle;
  const siteUrl = import.meta.env.VITE_SITE_URL;
  const canonical = siteUrl ? new URL(pathname, siteUrl).toString() : '__SITE_CANONICAL__';
  const ogImage = image || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&h=630&fit=crop&q=80';
  const defaultKeywords = [
    'senior software engineer',
    'solutions architect',
    'AI agents',
    'LLM orchestration',
    'enterprise software',
    'backend architecture',
    'Java',
    '.NET',
    'Node.js',
    'XR training',
    'Unity',
    'Unreal Engine',
    'scalable architecture',
  ];
  const finalKeywords = Array.isArray(keywords) && keywords.length ? keywords : defaultKeywords;

  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Carlos Alejandro Coronado Obregon',
    alternateName: ['Alex Coronado', 'Alejandro Coronado'],
    url: canonical,
    image: ogImage,
    jobTitle: 'Senior Software Engineer, Solutions Architect & AI Solutions Engineer',
    description: description || 'Senior Software Engineer and Solutions Architect focused on AI agent infrastructure, enterprise backends, API architecture, and high-performance immersive systems.',
    knowsAbout: [
      'Software engineering',
      'Solutions architecture',
      'AI agents',
      'LLM orchestration',
      'Enterprise API architecture',
      'Java',
      '.NET',
      'Node.js',
      'React',
      'Vue',
      'Unity',
      'Unreal Engine',
      'XR simulation',
    ],
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: canonical,
    name: pageTitle,
    description,
  };

  return {
    title: pageTitle,
    description,
    canonical,
    metaTags: [
      { name: 'description', content: description || '' },
      { name: 'keywords', content: Array.isArray(finalKeywords) ? finalKeywords.join(', ') : finalKeywords },
      { name: 'robots', content: 'index,follow,max-image-preview:large' },
    ],
    og: {
      'og:type': 'website',
      'og:title': pageTitle,
      'og:description': description || '',
      'og:image': ogImage,
      'og:url': canonical,
    },
    twitter: {
      'twitter:card': 'summary_large_image',
      'twitter:title': pageTitle,
      'twitter:description': description || '',
      'twitter:image': ogImage,
    },
    jsonLd: [jsonLdPerson, jsonLdWebSite],
  };
}

export default buildSeo;
