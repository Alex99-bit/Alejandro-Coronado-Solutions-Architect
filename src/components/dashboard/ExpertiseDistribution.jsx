import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartCard, ChartCardSkeleton } from './ChartCard';

export function ExpertiseDistribution({ data, isLoading }) {
  if (isLoading) return <ChartCardSkeleton />;

  return (
    <ChartCard title="Most used languages (last 6 months)">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="commits"
            nameKey="language"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
            formatter={(value, name) => {
              if (name === 'commits') return [`${value} commits`, 'Commits'];
              return [value, name];
            }}
            labelFormatter={(label) => {
              const lang = data.find((l) => l.language === label);
              return lang ? `${label} (${lang.percentage}%)` : label;
            }}
          />
          <Legend
            formatter={(value) => {
              const lang = data.find((l) => l.language === value);
              return lang ? `${value} — ${lang.percentage}%` : value;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}