import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PetsPage from './pages/PetsPage';
import VaccinesPage from './pages/VaccinesPage';
import BreedsPage from './pages/BreedsPage';
import VetsPage from './pages/VetsPage';
import OwnersPage from './pages/OwnersPage';
import DashboardLayout from './components/dashboard/DashboardLayout';

function App() {
  return (
    <Routes>
      {/* Public Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="pets" element={<PetsPage />} />
        <Route path="vaccines" element={<VaccinesPage />} />
        <Route path="breeds" element={<BreedsPage />} />
        <Route path="vets" element={<VetsPage />} />
        <Route path="owners" element={<OwnersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
