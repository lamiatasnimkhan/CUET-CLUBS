import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { School } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-teal-600 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <School className="h-8 w-8" />
              <span className="font-bold text-xl">CUET Clubs</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/register-club" className="hover:text-teal-200" id="register-club">
                  Register Club
                </Link>
                <Link to="/admin/login" className="hover:text-teal-200" id='admin Login'>
                  Admin Login
                </Link>
                <Link to="/Website" className="hover:text-teal-200" id="website admin login">
                  Website Admin Login
                </Link>
              </>
            ) : (
              <>
                <Link to="/admin/dashboard" className="hover:text-teal-200" id="admin dashboard">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="hover:text-teal-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}