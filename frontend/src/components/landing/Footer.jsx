import { PawPrint, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
                <PawPrint size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">Laika<span className="text-brand-400">Vet</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">Plataforma moderna de gestión veterinaria para el cuidado integral de tus mascotas.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Plataforma</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#servicios" className="hover:text-brand-400 transition-colors">Servicios</a></li>
              <li><a href="#equipo" className="hover:text-brand-400 transition-colors">Equipo</a></li>
              <li><a href="#stats" className="hover:text-brand-400 transition-colors">Estadísticas</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Mail size={14} className="text-brand-400" /> info@laikavet.com</li>
              <li className="flex items-center gap-2"><Phone size={14} className="text-brand-400" /> +591 123 456 789</li>
              <li className="flex items-center gap-2"><MapPin size={14} className="text-brand-400" /> Cochabamba, Bolivia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} LaikaVet. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
