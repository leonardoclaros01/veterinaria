import { PawPrint, Syringe, Stethoscope, Users } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCards from '../components/dashboard/StatsCards';
import RecentActivity from '../components/dashboard/RecentActivity';
import { mockPets, mockVaccines, mockVeterinarians, mockOwners, monthlyVisitsData } from '../data/mockData';

const statsData = [
  { label: 'Mascotas', value: mockPets.length, icon: PawPrint, bgColor: 'bg-brand-50', iconColor: 'text-brand-600', trend: 12 },
  { label: 'Vacunas', value: mockVaccines.length, icon: Syringe, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600', trend: 8 },
  { label: 'Veterinarios', value: mockVeterinarians.length, icon: Stethoscope, bgColor: 'bg-violet-50', iconColor: 'text-violet-600', trend: 5 },
  { label: 'Dueños', value: mockOwners.length, icon: Users, bgColor: 'bg-amber-50', iconColor: 'text-amber-600', trend: -2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-soft-lg border border-slate-100 px-4 py-3">
        <p className="text-sm font-semibold text-slate-900 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: p.color }} />
            {p.name}: <span className="font-medium text-slate-700">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Vista General</h2>
        <p className="text-sm text-slate-500 mt-1">Resumen de actividad de la clínica</p>
      </div>

      <StatsCards stats={statsData} />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Area Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-100 shadow-soft p-5">
          <h3 className="text-base font-semibold text-slate-900 mb-4">Visitas Mensuales</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyVisitsData}>
              <defs>
                <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="visitas" name="Visitas" stroke="#3B82F6" strokeWidth={2.5} fill="url(#colorVisitas)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-soft p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Vacunas por Mes</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyVisitsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="vacunas" name="Vacunas" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
