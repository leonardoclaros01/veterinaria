import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Stethoscope, Award } from 'lucide-react';
import { mockVeterinarians } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';

const avatarColors = ['from-brand-400 to-brand-600', 'from-violet-400 to-violet-600', 'from-emerald-400 to-emerald-600', 'from-rose-400 to-rose-600', 'from-amber-400 to-amber-600', 'from-cyan-400 to-cyan-600'];

export default function VetsPage() {
  const [vets, setVets] = useState(mockVeterinarians);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ fullName: '', specialty: '', licenseNumber: '' });

  const filtered = vets.filter(v => v.fullName.toLowerCase().includes(search.toLowerCase()) || v.specialty.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditing(null); setForm({ fullName: '', specialty: '', licenseNumber: '' }); setModalOpen(true); };
  const openEdit = (v) => { setEditing(v); setForm({ fullName: v.fullName, specialty: v.specialty, licenseNumber: v.licenseNumber }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.fullName.trim()) return;
    if (editing) { setVets(vets.map(v => v.id === editing.id ? { ...v, ...form } : v)); }
    else { setVets([...vets, { id: Date.now(), ...form }]); }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Veterinarios</h2>
          <p className="text-sm text-slate-500 mt-1">{vets.length} profesionales registrados</p>
        </div>
        <Button onClick={openCreate} icon={Plus}>Nuevo Veterinario</Button>
      </div>

      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Buscar veterinarios..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Stethoscope} title="Sin veterinarios" description="No se encontraron veterinarios." actionLabel="Registrar Veterinario" onAction={openCreate} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((vet, index) => (
            <div key={vet.id} className="bg-white rounded-xl border border-slate-100 shadow-soft p-6 hover:shadow-soft-lg transition-all duration-300 group text-center">
              <div className="flex justify-end gap-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(vet)} className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all"><Edit2 size={14} /></button>
                <button onClick={() => setVets(vets.filter(v => v.id !== vet.id))} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 size={14} /></button>
              </div>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                <span className="text-xl font-bold text-white">{vet.fullName.split(' ').slice(0, 2).map(n => n[0]).join('')}</span>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">{vet.fullName}</h3>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Award size={12} className="text-brand-500" />
                <span className="text-xs text-brand-600 font-medium">{vet.specialty}</span>
              </div>
              <Badge variant="default">{vet.licenseNumber}</Badge>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar Veterinario' : 'Nuevo Veterinario'} size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre Completo</label>
            <input type="text" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" placeholder="Dr. Nombre Apellido" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Especialidad</label>
            <input type="text" value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" placeholder="Especialidad" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Licencia</label>
            <input type="text" value={form.licenseNumber} onChange={e => setForm({ ...form, licenseNumber: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" placeholder="VET-2024-XXX" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>{editing ? 'Guardar' : 'Crear'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
