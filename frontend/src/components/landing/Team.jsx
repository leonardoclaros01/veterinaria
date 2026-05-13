import { mockVeterinarians } from '../../data/mockData';
import { Mail, Award } from 'lucide-react';

const avatarColors = [
  'from-brand-400 to-brand-600',
  'from-violet-400 to-violet-600',
  'from-emerald-400 to-emerald-600',
  'from-rose-400 to-rose-600',
  'from-amber-400 to-amber-600',
  'from-cyan-400 to-cyan-600',
];

export default function Team() {
  return (
    <section id="equipo" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-4">Equipo</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Profesionales que aman lo que hacen</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Nuestro equipo de veterinarios certificados está comprometido con el bienestar de cada mascota.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVeterinarians.map((vet, index) => (
            <div key={vet.id} className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-soft-lg hover:border-brand-100 transition-all duration-300 text-center">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                <span className="text-2xl font-bold text-white">{vet.fullName.split(' ').slice(0, 2).map(n => n[0]).join('')}</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">{vet.fullName}</h3>
              <div className="flex items-center justify-center gap-1.5 mb-3">
                <Award size={14} className="text-brand-500" />
                <span className="text-sm text-brand-600 font-medium">{vet.specialty}</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">Licencia: {vet.licenseNumber}</p>
              <button className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-brand-600 transition-colors">
                <Mail size={14} /> Contactar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
