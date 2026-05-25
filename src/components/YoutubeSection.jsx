import { SOCIAL_LINKS, YOUTUBE_EMBEDS } from '../data/links.js'

function extractYouTubeId(input) {
  if (!input) return ''
  // If full URL, try to extract ID from common patterns
  try {
    // If it's a plain ID with query params, drop them
    if (!input.includes('://')) {
      return input.split('?')[0]
    }

    const url = new URL(input)
    // Examples: https://youtu.be/ID, https://www.youtube.com/watch?v=ID, /shorts/ID
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '').split('?')[0]
    }

    const path = url.pathname
    if (path.startsWith('/shorts/')) {
      return path.split('/shorts/')[1].split('?')[0]
    }
    if (path === '/watch') {
      return url.searchParams.get('v') || ''
    }

    // fallback: last path segment
    const parts = path.split('/').filter(Boolean)
    return (parts.length ? parts[parts.length - 1] : '').split('?')[0]
  } catch {
    return input.split('?')[0]
  }
}

const featuredVideos = [
  {
    id: extractYouTubeId(YOUTUBE_EMBEDS.featured[0]),
    title: 'Founder Mindset for Developers',
    meta: 'Masterclass • 6 min',
  },
  {
    id: extractYouTubeId(YOUTUBE_EMBEDS.featured[1]),
    title: 'The $1,000 Mistake',
    meta: 'Masterclass • 12 min',
  },
]

export function YoutubeSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900/40 py-32" id="content">
      <div className="container relative z-10 mx-auto px-6">
        <div
          className="mb-20 flex flex-col items-center justify-between gap-8 md:flex-row"
          data-aos="fade-up"
        >
          <div className="text-center md:text-left">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              Content that <span className="gradient-text">Inspires</span>
            </h2>
            <p className="text-lg text-slate-400">
              Lessons on code and business from the trenches.
            </p>
          </div>
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fancy flex items-center gap-3 rounded-2xl bg-red-600 px-8 py-4 font-bold"
          >
            <i className="fab fa-youtube text-2xl" aria-hidden />
            Subscribe
          </a>
        </div>

        <div className="mb-20 grid gap-10 md:grid-cols-2">
          {featuredVideos.map((v, i) => (
            <div
              key={v.id + v.title}
              className="rounded-[2rem] glass-card"
              data-aos={i === 0 ? 'fade-right' : 'fade-left'}
            >
              <div className="relative aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="p-8">
                <h4 className="mb-2 text-xl font-bold">{v.title}</h4>
                <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  {v.meta}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {YOUTUBE_EMBEDS.shorts.map((rawId, index) => (
            <div
              key={`${rawId}-${index}`}
              className="aspect-short overflow-hidden rounded-2xl glass-card"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${extractYouTubeId(rawId)}`}
                title={`Short ${index + 1}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
