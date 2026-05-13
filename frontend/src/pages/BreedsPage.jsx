import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Dog } from 'lucide-react';
import { mockBreeds } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';

export default function BreedsPage() {
  const [breeds, setBreeds] = useState(mockBreeds);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', species: 'Perro' });

  const filtered = breeds.filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.species.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditing(null); setForm({ name: '', species: 'Perro' }); setModalOpen(true); };
  const openEdit = (b) => { setEditing(b); setForm({ name: b.name, species: b.species }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) { setBreeds(breeds.map(b => b.id === editing.id ? { ...b, ...form } : b)); }
    else { setBreeds([...breeds, { id: Date.now(), ...form }]); }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Razas</h2>
          <p className="text-sm text-slate-500 mt-1">{breeds.length} razas registradas</p>
        </div>
        <Button onClick={openCreate} icon={Plus}>Nueva Raza</Button>
      </div>

      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Buscar razas..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Dog} title="Sin razas" description="No se encontraron razas registradas." actionLabel="Registrar Raza" onAction={openCreate} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(breed => (
            <div key={breed.id} className="bg-white rounded-xl border border-slate-100 shadow-soft p-5 hover:shadow-soft-lg transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-lg">
                  {breed.species === 'Gato' ? '🐱' : '🐶'}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(breed)} className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all"><Edit2 size={14} /></button>
                  <button onClick={() => setBreeds(breeds.filter(b => b.id !== breed.id))} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">{breed.name}</h3>
              <Badge variant={breed.species === 'Perro' ? 'primary' : 'purple'}>{breed.species}</Badge>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar Raza' : 'Nueva Raza'} size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" placeholder="Nombre de la raza" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Especie</label>
            <select value={form.species} onChange={e => setForm({ ...form, species: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all bg-white">
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
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
