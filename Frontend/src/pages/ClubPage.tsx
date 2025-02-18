import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Events from '../components/club/Events';
import Workshops from '../components/club/Workshops';
import Committee from '../components/club/Committee';
import MemberRegistration from '../components/club/MemberRegistration';

export default function ClubPage() {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the clubId from localStorage
  const clubId = localStorage.getItem('selectedClubId');

  useEffect(() => {
    if (!clubId) {
      setError("Club ID not found!");
      setLoading(false);
      return;
    }

    // Fetch club details
    const fetchClubDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/clubs/club/${clubId}`);
        if (!response.ok) throw new Error("Failed to fetch club data");
        
        const data = await response.json();
        setClub(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [clubId]);

  if (loading) return <p className="text-center text-gray-500">Loading club details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-900">{club?.clubname}</h1>
          <p className="text-gray-600 mt-2">{club?.about}</p>
        </div>

        <div className="bg-gray-100 px-6 py-4">
          <nav className="flex space-x-4">
            <Link to={`/club/${clubId}/events`} className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md">Events</Link>
            <Link to={`/club/${clubId}/workshops`} className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md">Workshops</Link>
            <Link to={`/club/${clubId}/committee`} className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md">Committee</Link>
            <Link to={`/club/${clubId}/register`} className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md">Join Club</Link>
          </nav>
        </div>

        <div className="p-6">
          <Routes>
            <Route path="events" element={<Events />} />
            <Route path="workshops" element={<Workshops />} />
            <Route path="committee" element={<Committee />} />
            <Route path="register" element={<MemberRegistration />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
