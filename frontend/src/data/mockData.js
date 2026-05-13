// ===== MOCK DATA FOR DEVELOPMENT =====

export const mockBreeds = [
  { id: 1, name: 'Labrador Retriever', species: 'Perro' },
  { id: 2, name: 'Pastor Alemán', species: 'Perro' },
  { id: 3, name: 'Bulldog Francés', species: 'Perro' },
  { id: 4, name: 'Golden Retriever', species: 'Perro' },
  { id: 5, name: 'Siamés', species: 'Gato' },
  { id: 6, name: 'Persa', species: 'Gato' },
  { id: 7, name: 'Maine Coon', species: 'Gato' },
  { id: 8, name: 'Bengala', species: 'Gato' },
  { id: 9, name: 'Chihuahua', species: 'Perro' },
  { id: 10, name: 'Poodle', species: 'Perro' },
];

export const mockOwners = [
  { id: 1, nombre: 'Carlos', apellido: 'Mendoza', email: 'carlos@email.com', role: 'USER' },
  { id: 2, nombre: 'María', apellido: 'García', email: 'maria@email.com', role: 'USER' },
  { id: 3, nombre: 'Juan', apellido: 'López', email: 'juan@email.com', role: 'ADMIN' },
  { id: 4, nombre: 'Ana', apellido: 'Rodríguez', email: 'ana@email.com', role: 'USER' },
  { id: 5, nombre: 'Pedro', apellido: 'Martínez', email: 'pedro@email.com', role: 'USER' },
  { id: 6, nombre: 'Laura', apellido: 'Sánchez', email: 'laura@email.com', role: 'USER' },
];

export const mockPets = [
  { id: 1, name: 'Max', species: 'Perro', breed: mockBreeds[0], age: 3, owner: mockOwners[0] },
  { id: 2, name: 'Luna', species: 'Gato', breed: mockBreeds[4], age: 2, owner: mockOwners[1] },
  { id: 3, name: 'Rocky', species: 'Perro', breed: mockBreeds[1], age: 5, owner: mockOwners[2] },
  { id: 4, name: 'Bella', species: 'Perro', breed: mockBreeds[2], age: 1, owner: mockOwners[3] },
  { id: 5, name: 'Milo', species: 'Gato', breed: mockBreeds[6], age: 4, owner: mockOwners[0] },
  { id: 6, name: 'Toby', species: 'Perro', breed: mockBreeds[3], age: 6, owner: mockOwners[4] },
  { id: 7, name: 'Nala', species: 'Gato', breed: mockBreeds[7], age: 2, owner: mockOwners[5] },
  { id: 8, name: 'Duke', species: 'Perro', breed: mockBreeds[8], age: 3, owner: mockOwners[1] },
  { id: 9, name: 'Coco', species: 'Perro', breed: mockBreeds[9], age: 7, owner: mockOwners[2] },
  { id: 10, name: 'Simba', species: 'Gato', breed: mockBreeds[5], age: 5, owner: mockOwners[3] },
];

export const mockVaccines = [
  { id: 1, name: 'Rabia', applicationDate: '2025-01-15', veterinarianName: 'Dr. Ramírez', pet: mockPets[0] },
  { id: 2, name: 'Parvovirus', applicationDate: '2025-02-20', veterinarianName: 'Dra. Torres', pet: mockPets[0] },
  { id: 3, name: 'Moquillo', applicationDate: '2025-03-10', veterinarianName: 'Dr. Ramírez', pet: mockPets[2] },
  { id: 4, name: 'Triple Felina', applicationDate: '2025-01-25', veterinarianName: 'Dra. Vargas', pet: mockPets[1] },
  { id: 5, name: 'Leptospirosis', applicationDate: '2025-04-05', veterinarianName: 'Dr. Ramírez', pet: mockPets[3] },
  { id: 6, name: 'Rabia', applicationDate: '2025-05-12', veterinarianName: 'Dra. Torres', pet: mockPets[5] },
  { id: 7, name: 'Leucemia Felina', applicationDate: '2025-06-01', veterinarianName: 'Dra. Vargas', pet: mockPets[4] },
  { id: 8, name: 'Hepatitis', applicationDate: '2025-03-22', veterinarianName: 'Dr. Ramírez', pet: mockPets[7] },
  { id: 9, name: 'Bordetella', applicationDate: '2025-07-14', veterinarianName: 'Dra. Torres', pet: mockPets[8] },
  { id: 10, name: 'Panleucopenia', applicationDate: '2025-08-03', veterinarianName: 'Dra. Vargas', pet: mockPets[9] },
];

export const mockVeterinarians = [
  { id: 1, fullName: 'Dr. Alejandro Ramírez', specialty: 'Cirugía General', licenseNumber: 'VET-2024-001' },
  { id: 2, fullName: 'Dra. Carolina Torres', specialty: 'Dermatología', licenseNumber: 'VET-2024-002' },
  { id: 3, fullName: 'Dra. Sofía Vargas', specialty: 'Medicina Felina', licenseNumber: 'VET-2024-003' },
  { id: 4, fullName: 'Dr. Miguel Herrera', specialty: 'Oftalmología', licenseNumber: 'VET-2024-004' },
  { id: 5, fullName: 'Dra. Valentina Ruiz', specialty: 'Cardiología', licenseNumber: 'VET-2024-005' },
  { id: 6, fullName: 'Dr. Daniel Moreno', specialty: 'Traumatología', licenseNumber: 'VET-2024-006' },
];

// ===== CHART DATA =====
export const monthlyVisitsData = [
  { month: 'Ene', visitas: 45, vacunas: 32 },
  { month: 'Feb', visitas: 52, vacunas: 41 },
  { month: 'Mar', visitas: 49, vacunas: 38 },
  { month: 'Abr', visitas: 63, vacunas: 55 },
  { month: 'May', visitas: 58, vacunas: 48 },
  { month: 'Jun', visitas: 72, vacunas: 60 },
  { month: 'Jul', visitas: 68, vacunas: 52 },
  { month: 'Ago', visitas: 75, vacunas: 63 },
  { month: 'Sep', visitas: 82, vacunas: 70 },
  { month: 'Oct', visitas: 78, vacunas: 65 },
  { month: 'Nov', visitas: 85, vacunas: 72 },
  { month: 'Dic', visitas: 90, vacunas: 78 },
];

export const speciesDistribution = [
  { name: 'Perros', value: 65, color: '#3B82F6' },
  { name: 'Gatos', value: 30, color: '#8B5CF6' },
  { name: 'Otros', value: 5, color: '#10B981' },
];

export const recentActivity = [
  { id: 1, type: 'vaccine', message: 'Vacuna de Rabia aplicada a Max', time: 'Hace 2 horas', icon: '💉' },
  { id: 2, type: 'pet', message: 'Nueva mascota registrada: Bella', time: 'Hace 3 horas', icon: '🐾' },
  { id: 3, type: 'appointment', message: 'Consulta completada - Dr. Ramírez', time: 'Hace 5 horas', icon: '📋' },
  { id: 4, type: 'vaccine', message: 'Vacuna Triple Felina aplicada a Luna', time: 'Hace 6 horas', icon: '💉' },
  { id: 5, type: 'owner', message: 'Nuevo dueño registrado: Ana Rodríguez', time: 'Hace 8 horas', icon: '👤' },
  { id: 6, type: 'pet', message: 'Actualización de datos: Rocky', time: 'Hace 1 día', icon: '🐾' },
];
