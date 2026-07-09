export function ChartCard({ title, children }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:border-slate-600">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function ChartCardSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 animate-pulse">
      <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
      <div className="h-[300px] bg-slate-700/50 rounded"></div>
    </div>
  );
}