import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, PawPrint } from 'lucide-react';
import { mockPets, mockBreeds, mockOwners } from '../data/mockData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';

export default function PetsPage() {
  const [pets, setPets] = useState(mockPets);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [form, setForm] = useState({ name: '', species: 'Perro', breed: null, age: '', owner: null });

  const filtered = pets.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.species.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setEditingPet(null);
    setForm({ name: '', species: 'Perro', breed: null, age: '', owner: null });
    setModalOpen(true);
  };

  const openEdit = (pet) => {
    setEditingPet(pet);
    setForm({ name: pet.name, species: pet.species, breed: pet.breed, age: pet.age, owner: pet.owner });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editingPet) {
      setPets(pets.map(p => p.id === editingPet.id ? { ...p, ...form } : p));
    } else {
      setPets([...pets, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setPets(pets.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Mascotas</h2>
          <p className="text-sm text-slate-500 mt-1">{pets.length} mascotas registradas</p>
        </div>
        <Button onClick={openCreate} icon={Plus}>Nueva Mascota</Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar mascotas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState icon={PawPrint} title="Sin mascotas" description="No se encontraron mascotas." actionLabel="Registrar Mascota" onAction={openCreate} />
      ) : (
        <div className="bg-white rounded-xl border border-slate-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Nombre</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Especie</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Raza</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Edad</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Dueño</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(pet => (
                  <tr key={pet.id} className="table-row-hover">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center text-base flex-shrink-0">
                          {pet.species === 'Gato' ? '🐱' : '🐶'}
                        </div>
                        <span className="text-sm font-medium text-slate-900">{pet.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={pet.species === 'Perro' ? 'primary' : 'purple'}>{pet.species}</Badge>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-sm text-slate-600">{pet.breed?.name || '—'}</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-sm text-slate-600">{pet.age} años</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell text-sm text-slate-600">{pet.owner ? `${pet.owner.nombre} ${pet.owner.apellido}` : '—'}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(pet)} className="p-2 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-all"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(pet.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingPet ? 'Editar Mascota' : 'Nueva Mascota'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" placeholder="Nombre de la mascota" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Especie</label>
              <select value={form.species} onChange={e => setForm({ ...form, species: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all bg-white">
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Edad</label>
              <input type="number" value={form.age} onChange={e => setForm({ ...form, age: parseInt(e.target.value) || '' })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all" placeholder="Años" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Raza</label>
            <select value={form.breed?.id || ''} onChange={e => setForm({ ...form, breed: mockBreeds.find(b => b.id === parseInt(e.target.value)) || null })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all bg-white">
              <option value="">Seleccionar raza</option>
              {mockBreeds.filter(b => b.species === form.species).map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Dueño</label>
            <select value={form.owner?.id || ''} onChange={e => setForm({ ...form, owner: mockOwners.find(o => o.id === parseInt(e.target.value)) || null })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all bg-white">
              <option value="">Seleccionar dueño</option>
              {mockOwners.map(o => <option key={o.id} value={o.id}>{o.nombre} {o.apellido}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSave}>{editingPet ? 'Guardar Cambios' : 'Crear Mascota'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
