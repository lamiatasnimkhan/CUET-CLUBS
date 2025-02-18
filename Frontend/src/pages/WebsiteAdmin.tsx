import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

export default function WebsiteAdmin() {
  const [pendingClubs, setPendingClubs] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchTempClubs();
  }, []);

  const fetchTempClubs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/temp-clubs/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await response.json();
      setPendingClubs(data);
    } catch (error) {
      console.error('Error fetching temporary clubs:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/temp-clubs/approve/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setPendingClubs(clubs => clubs.filter(club => club._id !== id));
    } catch (error) {
      console.error('Error approving club:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/temp-clubs/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setPendingClubs(clubs => clubs.filter(club => club._id !== id));
    } catch (error) {
      console.error('Error deleting club:', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-teal-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Website Administration</h1>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Club Registrations</h2>
            <div className="bg-white rounded-lg border border-gray-200 divide-y">
              {pendingClubs.length === 0 ? (
                <div className="p-4 text-gray-500">No pending registrations</div>
              ) : (
                pendingClubs.map(club => (
                  <div key={club._id} className="p-4 flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{club.clubname || 'N/A'}</h3>
                      <p className="mt-1 text-gray-600">{club.about || 'No description available'}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        <p><strong>Email:</strong> {club.email || 'N/A'}</p>
                        <p><strong>Phone:</strong> {club.phone || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button onClick={() => handleApprove(club._id)} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                        Approve
                      </button>
                      <button onClick={() => handleReject(club._id)} className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
