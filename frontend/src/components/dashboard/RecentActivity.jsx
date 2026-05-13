import { recentActivity } from '../../data/mockData';

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-soft">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-base font-semibold text-slate-900">Actividad Reciente</h3>
      </div>
      <div className="divide-y divide-slate-50">
        {recentActivity.map((item) => (
          <div key={item.id} className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-slate-50 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-base">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 truncate">{item.message}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
