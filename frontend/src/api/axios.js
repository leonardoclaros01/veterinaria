import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== PETS =====
export const getPets = () => api.get('/pets');
export const getPetById = (id) => api.get(`/pets/${id}`);
export const createPet = (pet) => api.post('/pets', pet);
export const updatePet = (id, pet) => api.put(`/pets/${id}`, pet);
export const deletePet = (id) => api.delete(`/pets/${id}`);

// ===== BREEDS =====
export const getBreeds = () => api.get('/breeds');
export const getBreedById = (id) => api.get(`/breeds/${id}`);
export const getBreedsBySpecies = (species) => api.get(`/breeds/species/${species}`);
export const createBreed = (breed) => api.post('/breeds', breed);
export const updateBreed = (id, breed) => api.put(`/breeds/${id}`, breed);
export const deleteBreed = (id) => api.delete(`/breeds/${id}`);

// ===== VACCINES =====
export const getVaccines = () => api.get('/vaccines');
export const getVaccineById = (id) => api.get(`/vaccines/${id}`);
export const getVaccinesByPet = (petId) => api.get(`/vaccines/pet/${petId}`);
export const createVaccine = (vaccine) => api.post('/vaccines', vaccine);
export const updateVaccine = (id, vaccine) => api.put(`/vaccines/${id}`, vaccine);
export const deleteVaccine = (id) => api.delete(`/vaccines/${id}`);

// ===== VETERINARIANS =====
export const getVeterinarians = () => api.get('/veterinarians');
export const createVeterinarian = (vet) => api.post('/veterinarians', vet);
export const updateVeterinarian = (id, vet) => api.put(`/veterinarians/${id}`, vet);
export const deleteVeterinarian = (id) => api.delete(`/veterinarians/${id}`);

// ===== USERS (Owners) =====
export const getUsers = () => api.get('/users');
export const createUser = (user) => api.post('/users', user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
