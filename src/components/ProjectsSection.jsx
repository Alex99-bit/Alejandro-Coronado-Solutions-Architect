export function ProjectsSection() {
  return (
    <section className="py-32" id="projects">
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-3xl" data-aos="fade-right">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Selected <span className="gradient-text">Engineering Work</span>
          </h2>
          <p className="text-xl leading-relaxed text-slate-400">
            Representative work across enterprise systems, AI-enabled workflows, SaaS architecture, and immersive software.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <article className="group rounded-[2.5rem] glass-card lg:col-span-8 p-10" data-aos="fade-up">
            <div className="mb-10 rounded-[2.5rem] overflow-hidden bg-slate-900/60 p-10">
              <span className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-xs font-bold tracking-widest uppercase">
                Track Record
              </span>
              <h3 className="mb-6 text-4xl font-bold text-white">
                Platforms, automation, and immersive systems
              </h3>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
                I have contributed to scalable SaaS platforms, operational tooling, AI-assisted workflows, and real-time interactive systems with emphasis on maintainability, data integrity, and clear architecture boundaries.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <ProjectCard
                eyebrow="FreshCar"
                color="text-blue-400"
                title="Mobility platform"
                body="SaaS architecture for fleet management, booking flows, operational data, and analytics-oriented interfaces."
              />
              <ProjectCard
                eyebrow="ThrivePlanet"
                color="text-emerald-400"
                title="Sustainability platform"
                body="Feature development for sustainability-oriented user workflows, modern web UX, and product iteration."
              />
              <ProjectCard
                eyebrow="SaaS"
                color="text-sky-400"
                title="Enterprise solutions"
                body="Private and B2B SaaS architectures, API integrations, role-based access, cloud deployment, and security-aware implementation."
              />
              <ProjectCard
                eyebrow="Itch.io"
                color="text-violet-400"
                title="Immersive systems"
                body="Published interactive systems combining gameplay architecture, real-time mechanics, C#/C++ foundations, and cross-platform delivery."
                link="https://alexco99.itch.io/"
                linkText="View Itch.io"
              />
            </div>

            <div className="mt-10 rounded-[1.5rem] bg-slate-950/60 p-8">
              <h3 className="mb-4 text-3xl font-bold text-white">DishQ - Cloud ERP for Restaurants</h3>
              <p className="text-slate-300 mb-6">
                DishQ is a cloud ERP tailored for restaurant operations. It includes dynamic purchasing lists, inventory control, cash-closing workflows, cash-flow tracking, and role-based access for owners, managers, employees, and guests. The project demonstrates end-to-end architecture, operational tooling, data modeling, and workflow automation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <img src="/DishQ/1.jpg" alt="DishQ cloud ERP operations dashboard by Alejandro Coronado" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/2.jpg" alt="DishQ restaurant inventory workflow designed by Alejandro Coronado" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/3.jpg" alt="DishQ purchasing and cash-flow interface for restaurant ERP" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/4.jpg" alt="DishQ role-based access screen for cloud ERP users" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/5.jpg" alt="DishQ backend operations module for restaurant management" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
                <img src="/DishQ/6.jpg" alt="DishQ cloud ERP reporting view for restaurant operators" className="rounded-lg object-cover w-full h-40" loading="lazy" decoding="async" fetchpriority="low" />
              </div>

              <p className="mt-4 text-slate-400">
                Role: full-stack architecture. Tech: cloud hosting, relational databases, backend APIs, frontend UX, RBAC, and CI/CD automation.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-3 flex-wrap">
                <Tag>SaaS</Tag>
                <Tag>APIs</Tag>
                <Tag>AI Workflows</Tag>
                <Tag>XR</Tag>
                <Tag>RBAC</Tag>
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-8 lg:col-span-4">
            <SideCard
              icon="fa-leaf"
              iconWrap="bg-emerald-500/20 text-emerald-500"
              title="ThrivePlanet"
              body="Platform development focused on reliable web workflows, sustainability-driven product logic, and modern user experience."
              aosDelay={100}
            />
            <SideCard
              icon="fa-cloud"
              iconWrap="bg-sky-500/20 text-sky-500"
              title="SaaS Development"
              body="Design and implementation of private and B2B SaaS systems connecting product logic, databases, APIs, and cloud services."
              aosDelay={200}
            />
            <SideCard
              icon="fa-gamepad"
              iconWrap="bg-violet-500/20 text-violet-500"
              title="Immersive Systems"
              body="Interactive software published on itch.io, combining systems programming, simulation logic, and user-centered interaction design."
              aosDelay={300}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ eyebrow, color, title, body, link, linkText }) {
  return (
    <div className="rounded-[2rem] bg-slate-950/80 p-8">
      <p className={`mb-3 text-sm font-bold uppercase tracking-[0.24em] ${color}`}>{eyebrow}</p>
      <h4 className="mb-3 text-2xl font-bold text-white">{title}</h4>
      <p className="text-slate-400">{body}</p>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 font-bold text-blue-400 hover:text-blue-300"
        >
          {linkText} <i className="fas fa-arrow-right transition-transform" aria-hidden />
        </a>
      ) : null}
    </div>
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
