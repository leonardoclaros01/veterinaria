import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl border border-slate-100 shadow-soft p-5 hover:shadow-soft-lg transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon size={20} className={stat.iconColor} />
            </div>
            {stat.trend && (
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {stat.trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(stat.trend)}%
              </div>
            )}
          </div>
          <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
