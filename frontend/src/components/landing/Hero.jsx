import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Heart, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Background Decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-100/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-violet-100/20 rounded-full blur-3xl animate-float delay-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 mb-6">
              <Sparkles size={14} className="text-brand-600" />
              <span className="text-xs font-semibold text-brand-700 tracking-wide uppercase">
                Plataforma Veterinaria Moderna
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
              El cuidado que{' '}
              <span className="gradient-text">tus mascotas</span>{' '}
              merecen
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-xl">
              Gestiona expedientes, vacunas, citas y más con nuestra plataforma veterinaria
              de última generación. Simple, rápida y diseñada para profesionales.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/dashboard">
                <Button size="xl" icon={ArrowRight} iconPosition="right">
                  Comenzar Ahora
                </Button>
              </Link>
              <a href="#servicios">
                <Button variant="secondary" size="xl">
                  Ver Servicios
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-500" />
                <span>Datos Seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-rose-500" />
                <span>+500 Mascotas</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                <span>24/7 Soporte</span>
              </div>
            </div>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="animate-fade-in-up delay-200 relative">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-200/20 via-violet-200/20 to-brand-200/20 rounded-3xl blur-2xl" />

              {/* Card preview */}
              <div className="relative bg-white rounded-2xl shadow-soft-xl border border-slate-100 p-6 space-y-4">
                {/* Mini header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                      <span className="text-lg">🐾</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Panel de Control</p>
                      <p className="text-xs text-slate-400">Resumen del día</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">Activo</span>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Mascotas', value: '127', color: 'bg-brand-50 text-brand-700' },
                    { label: 'Vacunas', value: '89', color: 'bg-emerald-50 text-emerald-700' },
                    { label: 'Doctores', value: '12', color: 'bg-violet-50 text-violet-700' },
                  ].map((stat) => (
                    <div key={stat.label} className={`${stat.color} rounded-xl p-3 text-center`}>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-xs mt-0.5 opacity-80">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mini table */}
                <div className="space-y-2">
                  {[
                    { name: 'Max', breed: 'Labrador', status: 'Vacunado' },
                    { name: 'Luna', breed: 'Siamés', status: 'Pendiente' },
                    { name: 'Rocky', breed: 'Pastor Alemán', status: 'Vacunado' },
                  ].map((pet) => (
                    <div key={pet.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm">
                          {pet.name === 'Luna' ? '🐱' : '🐶'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{pet.name}</p>
                          <p className="text-xs text-slate-400">{pet.breed}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        pet.status === 'Vacunado'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {pet.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
