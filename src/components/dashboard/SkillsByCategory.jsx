import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartCard, ChartCardSkeleton } from './ChartCard';

export function SkillsByCategory({ data, isLoading }) {
  if (isLoading) return <ChartCardSkeleton />;

  const chartData = data.map((category) => ({
    name: category.name,
    expertise: category.expertiseLevel,
    years: category.yearsOfExperience,
    skills: category.skills.map((s) => s.name).join(', '),
  }));

  return (
    <ChartCard title="Skills por Categoría">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis type="number" stroke="#94a3b8" domain={[0, 100]} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#94a3b8"
            width={110}
            tick={{ fontSize: 13 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value, name) => {
              if (name === 'expertise') return [`${value}/100`, 'Nivel'];
              return [value, name];
            }}
            labelFormatter={(label) => {
              const category = chartData.find((c) => c.name === label);
              return category ? `${label} (${category.years} años)` : label;
            }}
          />
          <Bar
            dataKey="expertise"
            name="Nivel de Expertise"
            fill="#6366f1"
            radius={[0, 4, 4, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}