import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartCard, ChartCardSkeleton } from './ChartCard';

export function TechStackRadar({ data, isLoading }) {
  if (isLoading) return <ChartCardSkeleton />;

  return (
    <ChartCard title="Detailed Tech Stack">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="technology" stroke="#94a3b8" />
          <PolarRadiusAxis stroke="#94a3b8" domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
            formatter={(value, name) => {
              if (name === 'level') return [`${value}/100`, 'Level'];
              return [value, name];
            }}
            labelFormatter={(label) => {
              const tech = data.find((t) => t.technology === label);
              return tech ? `${label} (${tech.years} years)` : label;
            }}
          />
          <Radar
            name="Level"
            dataKey="level"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
            animationDuration={800}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}