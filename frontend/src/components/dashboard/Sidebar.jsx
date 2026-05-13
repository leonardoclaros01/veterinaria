import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PawPrint, Syringe, Dog, Stethoscope, Users, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Mascotas', path: '/dashboard/pets', icon: PawPrint },
  { label: 'Vacunas', path: '/dashboard/vaccines', icon: Syringe },
  { label: 'Razas', path: '/dashboard/breeds', icon: Dog },
  { label: 'Veterinarios', path: '/dashboard/vets', icon: Stethoscope },
  { label: 'Dueños', path: '/dashboard/owners', icon: Users },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className={`sidebar-gradient flex flex-col h-screen sticky top-0 transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center flex-shrink-0">
          <PawPrint size={20} className="text-white" />
        </div>
        {!collapsed && <span className="text-lg font-bold text-white whitespace-nowrap">Laika<span className="text-brand-400">Vet</span></span>}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
              isActive ? 'bg-brand-600/20 text-brand-400' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Salir</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
          aria-label={collapsed ? 'Expandir' : 'Colapsar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
