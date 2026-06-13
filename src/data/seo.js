/**
 * Helper SEO + JSON-LD templates.
 */

export function buildSeo({ title, description, pathname = '/', image, keywords = [] } = {}) {
  const siteTitle = 'Carlos Alejandro Coronado Obregon | Senior Software Engineer & AI Solutions Architect';
  const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle;
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://alejandro-coronado-solutions-architect.vercel.app';
  const canonical = new URL(pathname, siteUrl).toString();
  const ogImage = image || new URL('/og-image.jpg', siteUrl).toString();
  const defaultKeywords = [
    'Alejandro Coronado',
    'Carlos Alejandro Coronado Obregon',
    'senior software engineer',
    'software engineer',
    'ingeniero de software',
    'solutions architect',
    'arquitecto de soluciones',
    'AI specialist',
    'especialista en IA',
    'AI solutions engineer',
    'CTO',
    'backend engineer',
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
    '@id': `${canonical}#person`,
    name: 'Carlos Alejandro Coronado Obregon',
    alternateName: ['Carlos Alejandro Coronado Obregon', 'Alex Coronado', 'Alejandro Coronado'],
    url: canonical,
    image: ogImage,
    jobTitle: 'Senior Software Engineer, Solutions Architect & AI Solutions Engineer',
    description: description || 'Bilingual software engineer, ingeniero de software, AI specialist and solutions architect focused on AI agent infrastructure, enterprise backends, API architecture and high-performance immersive systems.',
    knowsLanguage: ['en', 'es'],
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Software Engineer',
        occupationalCategory: '15-1252',
      },
      {
        '@type': 'Occupation',
        name: 'Solutions Architect',
      },
      {
        '@type': 'Occupation',
        name: 'AI Specialist',
      },
    ],
    knowsAbout: [
      'Software engineering',
      'Ingenieria de software',
      'Solutions architecture',
      'Arquitectura de soluciones',
      'AI specialist',
      'Especialista en IA',
      'CTO technical leadership',
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

  const jsonLdProfilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${canonical}#profile`,
    url: canonical,
    name: 'Carlos Alejandro Coronado Obregon - Software Engineer and Solutions Architect',
    mainEntity: {
      '@id': `${canonical}#person`,
    },
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${canonical}#website`,
    url: canonical,
    name: 'Carlos Alejandro Coronado Obregon',
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
      'og:type': 'profile',
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
    jsonLd: [jsonLdWebSite, jsonLdProfilePage, jsonLdPerson],
  };
}

export default buildSeo;
