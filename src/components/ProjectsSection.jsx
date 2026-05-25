export function ProjectsSection() {
  return (
    <section className="py-32" id="projects">
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-3xl" data-aos="fade-right">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl leading-relaxed text-slate-400">
            Selected projects showcasing architecture, engineering, and product delivery.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <article className="group rounded-[2.5rem] glass-card lg:col-span-8 p-10" data-aos="fade-up">
            <div className="mb-10 rounded-[2.5rem] overflow-hidden bg-slate-900/60 p-10">
              <span className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-bold tracking-widest uppercase">
                Track Record
              </span>
              <h3 className="mb-6 text-4xl font-bold text-white">
                Key projects and products in development
              </h3>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
                I have contributed to high-impact SaaS platforms, leading scalable architectures and digital experiences. Currently working on ThrivePlanet, while FreshCar reflects experience in smart mobility and connected products.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-slate-950/80 p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-blue-400">FreshCar</p>
                <h4 className="mb-3 text-2xl font-bold text-white">Mobility platform</h4>
                <p className="text-slate-400">
                  Development of a SaaS system for fleet management, bookings and data analytics with a UX and scalability focus.
                </p>
              </div>

              <div className="rounded-[2rem] bg-slate-950/80 p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-emerald-400">ThrivePlanet</p>
                <h4 className="mb-3 text-2xl font-bold text-white">Innovative platform</h4>
                <p className="text-slate-400">
                  Building features focused on sustainable consumption and a renewed user experience for the modern web.
                </p>
              </div>

              <div className="rounded-[2rem] bg-slate-950/80 p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-sky-400">SaaS</p>
                <h4 className="mb-3 text-2xl font-bold text-white">Enterprise solutions</h4>
                <p className="text-slate-400">
                  Experienced in designing private and B2B SaaS architectures, API integrations, cloud orchestration and a security-first approach.
                </p>
              </div>

              <div className="rounded-[2rem] bg-slate-950/80 p-8">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-violet-400">Itch.io</p>
                <h4 className="mb-3 text-2xl font-bold text-white">Games</h4>
                <p className="text-slate-400">
                  Indie games published on itch.io, combining narrative, mechanics and cross-platform development.
                </p>
                <a
                  href="https://alexco99.itch.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-bold text-blue-400 hover:text-blue-300"
                >
                  View Itch.io{' '}
                  <i className="fas fa-arrow-right transition-transform" aria-hidden />
                </a>
              </div>
            </div>

            <div className="mt-10 rounded-[1.5rem] bg-slate-950/60 p-8">
              <h3 className="mb-4 text-3xl font-bold text-white">DishQ — Cloud ERP for Restaurants</h3>
              <p className="text-slate-300 mb-6">
                DishQ is a personal project: a cloud-based ERP tailored for restaurants. It includes dynamic shopping lists, inventory control, cash-closing workflows, cash-flow tracking, and role-based access (owners, managers, employees, guests). The project demonstrates end-to-end architecture, integrations and operational tooling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <img src="/DishQ/1.jpg" alt="DishQ screenshot 1" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/2.jpg" alt="DishQ screenshot 2" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/3.jpg" alt="DishQ screenshot 3" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/4.jpg" alt="DishQ screenshot 4" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/5.jpg" alt="DishQ screenshot 5" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/6.jpg" alt="DishQ screenshot 6" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
              </div>

              <p className="mt-4 text-slate-400">
                Role: Full-stack design &amp; architecture. Tech: Cloud hosting, relational DBs, backend APIs, frontend UX, RBAC, and CI/CD automation.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-3 flex-wrap">
                <Tag>SaaS</Tag>
                <Tag>Mobility</Tag>
                <Tag>Platform</Tag>
                <Tag>Games</Tag>
                <Tag>UX</Tag>
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-8 lg:col-span-4">
            <SideCard
              icon="fa-leaf"
              iconWrap="bg-emerald-500/20 text-emerald-500"
              title="ThrivePlanet"
              body="I currently collaborate on ThrivePlanet, developing the platform with a focus on sustainability and user experience."
              aosDelay={100}
            />
            <SideCard
              icon="fa-cloud"
              iconWrap="bg-sky-500/20 text-sky-500"
              title="SaaS Development"
              body="Design and build of private and B2B SaaS solutions that connect product, data and cloud services."
              aosDelay={200}
            />
            <SideCard
              icon="fa-gamepad"
              iconWrap="bg-violet-500/20 text-violet-500"
              title="Games"
              body="I have created several games published on itch.io, combining design, programming and player-focused experience."
              aosDelay={300}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Tag({ children }) {
  return (
    <span className="rounded-lg bg-white/5 px-3 py-1 font-mono text-xs">{children}</span>
  )
}

function SideCard({ icon, iconWrap, title, body, aosDelay }) {
  return (
    <article
      className="flex-1 rounded-[2.5rem] p-10 glass-card"
      data-aos="fade-left"
      data-aos-delay={aosDelay}
    >
      <div
        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${iconWrap}`}
      >
        <i className={`fas ${icon}`} aria-hidden />
      </div>
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>
      <p className="leading-relaxed text-slate-400">{body}</p>
    </article>
  )
}
