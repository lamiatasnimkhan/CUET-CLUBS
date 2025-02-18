import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ClubRegistration from './pages/ClubRegistration';
import ClubPage from './pages/ClubPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import WebsiteAdmin from './pages/WebsiteAdmin';
import WebsiteAdminLogin from './pages/WebsiteAdminLogin';
import { AuthProvider } from './contexts/AuthContext';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide navbar on these pages
  const hideNavbarRoutes = ['/admin/dashboard', '/websiteadmin'];

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Clear authentication token
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar or Admin Header */}
      {hideNavbarRoutes.includes(location.pathname) ? (
        <div className="w-full bg-teal-600 text-white py-3 px-6 flex justify-between items-center shadow-md">
          <h2 className="text-xl font-bold">CUET Clubs</h2>
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
            Logout
          </button>
        </div>
      ) : (
        <Navbar />
      )}

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-club" element={<ClubRegistration />} />
          <Route path="/club/:clubId/*" element={<ClubPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/websiteadmin" element={<WebsiteAdmin />} />
          <Route path="/website-admin/login" element={<WebsiteAdminLogin />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}
