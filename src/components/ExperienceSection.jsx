const experiences = [
  {
    role: 'AI Solutions Engineer & Full-Stack Software Engineer',
    company: 'AIA',
    period: '2026 - Present',
    accent: 'text-cyan-400',
    points: [
      'Designed custom intelligent agents integrated with enterprise ecosystems such as CRMs and ERPs.',
      'Built proprietary APIs in Node.js and C# to connect data sources, workflows, and operational automations.',
      'Orchestrated LLMs as cognitive engines for business operations, research workflows, and repeatable automation.',
    ],
  },
  {
    role: 'Project & Development Director',
    company: 'gamespiration',
    period: '2024 - Present',
    accent: 'text-blue-400',
    points: [
      'Led technical architecture for custom corporate projects, balancing innovation, maintainability, and resource optimization.',
      'Translated business requirements into precise development specifications, delivery priorities, and implementation plans.',
      'Coordinated development execution across software, interactive systems, and technical product decisions.',
    ],
  },
  {
    role: 'XR Developer',
    company: 'Fyware',
    period: '2022 - 2024',
    accent: 'text-violet-400',
    points: [
      'Developed VR training simulators with direct impact on operational safety for medical-sector workflows.',
      'Built large-scale interactive experiences in Unity and C#, optimizing assets, runtime performance, and interaction loops.',
      'Created the foundations of a proprietary 3D format conversion system through reverse engineering to improve asset interoperability.',
    ],
  },
]

const achievements = [
  'Semi-finalist, Game Jam Plus Brazil 2025: international recognition in competitive software development.',
  'Semi-finalist, BBVA Hackathon 2022: development and deployment of an LLM-based solution.',
  '1st Place Local, NASA Space Apps Challenge 2022: award-winning technology solution design.',
]

export function ExperienceSection() {
  return (
    <section className="border-y border-white/5 py-28" id="experience">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-3xl" data-aos="fade-right">
          <p className="mb-4 text-xs font-bold tracking-widest text-blue-400 uppercase">
            Engineering Experience
          </p>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Corporate impact through <span className="gradient-text">architecture and execution</span>
          </h2>
          <p className="text-xl leading-relaxed text-slate-400">
            Experience reframed around technical ownership, system design, AI integration, CTO-facing architecture decisions, and measurable engineering outcomes.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {experiences.map((item, index) => (
            <article
              key={`${item.company}-${item.role}`}
              className="rounded-[2rem] glass-card p-8 md:p-10"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <p className={`mb-3 text-sm font-bold uppercase tracking-[0.24em] ${item.accent}`}>
                {item.company} / {item.period}
              </p>
              <h3 className="mb-6 text-2xl font-bold text-white">{item.role}</h3>
              <ul className="space-y-4 text-slate-400">
                {item.points.map((point) => (
                  <li key={point} className="border-l-2 border-white/10 pl-4 leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 md:p-10" data-aos="fade-up">
          <h3 className="mb-6 text-2xl font-bold text-white">Technical Achievements &amp; Awards</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((achievement) => (
              <p key={achievement} className="rounded-xl bg-white/5 p-5 leading-relaxed text-slate-300">
                {achievement}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
