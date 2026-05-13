import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Syringe } from 'lucide-react';
import { mockVaccines, mockPets } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';

export default function VaccinesPage() {
  const [vaccines, setVaccines] = useState(mockVaccines);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', applicationDate: '', veterinarianName: '', pet: null });

  const filtered = vaccines.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.veterinarianName.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setEditing(null); setForm({ name: '', applicationDate: '', veterinarianName: '', pet: null }); setModalOpen(true); };
  const openEdit = (v) => { setEditing(v); setForm({ name: v.name, applicationDate: v.applicationDate, veterinarianName: v.veterinarianName, pet: v.pet }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) { setVaccines(vaccines.map(v => v.id === editing.id ? { ...v, ...form } : v)); }
    else { setVaccines([...vaccines, { id: Date.now(), ...form }]); }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Vacunas</h2>
          <p className="text-sm text-slate-500 mt-1">{vaccines.length} registros de vacunación</p>
        </div>
        <Button onClick={openCreate} icon={Plus}>Nueva Vacuna</Button>
      </div>

      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Buscar vacunas..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Syringe} title="Sin vacunas" description="No se encontraron registros de vacunación." actionLabel="Registrar Vacuna" onAction={openCreate} />
      ) : (
        <div className="bg-white rounded-xl border border-slate-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Vacuna</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Mascota</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Fecha</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Veterinario</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(v => (
                  <tr key={v.id} className="table-row-hover">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0"><Syringe size={16} className="text-emerald-600" /></div>
                        <span className="text-sm font-medium text-slate-900">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{v.pet?.name || '—'}</td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-sm text-slate-600">{v.applicationDate}</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell"><Badge variant="success">{v.veterinarianName}</Badge></td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(v)} className="p-2 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all"><Edit2 size={16} /></button>
                        <button onClick={() => setVaccines(vaccines.filter(x => x.id !== v.id))} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar Vacuna' : 'Nueva Vacuna'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" placeholder="Nombre de la vacuna" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Fecha</label>
              <input type="date" value={form.applicationDate} onChange={e => setForm({ ...form, applicationDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Veterinario</label>
              <input type="text" value={form.veterinarianName} onChange={e => setForm({ ...form, veterinarianName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" placeholder="Nombre del veterinario" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mascota</label>
            <select value={form.pet?.id || ''} onChange={e => setForm({ ...form, pet: mockPets.find(p => p.id === parseInt(e.target.value)) || null })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all bg-white">
              <option value="">Seleccionar mascota</option>
              {mockPets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
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
