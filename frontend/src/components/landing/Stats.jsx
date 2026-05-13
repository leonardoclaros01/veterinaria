import { useState, useEffect, useRef } from 'react';

const stats = [
  { value: 500, suffix: '+', label: 'Mascotas Atendidas', color: 'text-brand-600' },
  { value: 12, suffix: '', label: 'Veterinarios Expertos', color: 'text-emerald-600' },
  { value: 1200, suffix: '+', label: 'Vacunas Aplicadas', color: 'text-violet-600' },
  { value: 98, suffix: '%', label: 'Clientes Satisfechos', color: 'text-amber-600' },
];

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-20 lg:py-24 mesh-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-4">
            En Números
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Resultados que hablan por sí solos
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Nuestra dedicación se refleja en la confianza de nuestros clientes y el bienestar de sus mascotas.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group bg-white rounded-2xl p-8 text-center border border-slate-100 hover:border-brand-100 shadow-soft hover:shadow-soft-lg transition-all duration-300"
            >
              <p className={`text-4xl lg:text-5xl font-extrabold ${stat.color} mb-2`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
