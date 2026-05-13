import { Syringe, Heart, Stethoscope, ClipboardList, PawPrint, Calendar } from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Consultas Médicas',
    description: 'Seguimiento detallado de consultas y diagnósticos para cada mascota registrada.',
    color: 'bg-brand-50 text-brand-600',
  },
  {
    icon: Syringe,
    title: 'Gestión de Vacunas',
    description: 'Control completo del calendario de vacunación con recordatorios automáticos.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: ClipboardList,
    title: 'Expedientes Digitales',
    description: 'Historial médico completo y organizado para cada paciente de la clínica.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: PawPrint,
    title: 'Registro de Mascotas',
    description: 'Perfiles detallados con raza, edad, dueño y toda la información relevante.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Heart,
    title: 'Seguimiento de Salud',
    description: 'Monitoreo continuo del estado de salud y bienestar de cada mascota.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Calendar,
    title: 'Agenda Inteligente',
    description: 'Organización eficiente de citas y horarios para todo el equipo veterinario.',
    color: 'bg-cyan-50 text-cyan-600',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-4">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Todo lo que necesitas para tu clínica
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Herramientas modernas diseñadas específicamente para la gestión veterinaria profesional.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl border border-slate-100 hover:border-brand-100 bg-white hover:shadow-soft-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={22} />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
