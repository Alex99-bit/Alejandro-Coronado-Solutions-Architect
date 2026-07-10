import { DashboardHeader } from './DashboardHeader';
import { SkillsByCategory } from './SkillsByCategory';
import { TechStackRadar } from './TechStackRadar';
import { ExpertiseDistribution } from './ExpertiseDistribution';
import { useDashboardData } from '../../hooks/useDashboardData';

export function DashboardSection() {
  const { data, isLoading } = useDashboardData();

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800" id="dashboard">
      <div className="container mx-auto px-6">
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <SkillsByCategory
            data={data?.skillCategories || []}
            isLoading={isLoading}
          />
          <TechStackRadar
            data={data?.techStack || []}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-8">
          <ExpertiseDistribution
            data={data?.languages || []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
}