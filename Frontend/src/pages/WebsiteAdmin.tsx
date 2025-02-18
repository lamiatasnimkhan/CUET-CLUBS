import React, { useState } from 'react';
import { Shield } from 'lucide-react';

export default function WebsiteAdmin() {
  const [pendingClubs, setPendingClubs] = useState([
    // {
    //   id: 1,
    //   name: 'IEEE CUET Student Branch',
    //   description: 'Professional development and technical excellence',
    //   president: 'Rafsan Bin Ali Usha',
    //   advisor: 'Dr. Moshiul Haque',
    //   status: 'Accepted'
    // },
    {
      id: 1,
      name: 'CUET Computer Club',
      description: 'Professional development and technical excellence',
      president: 'MD. Shafiqul Hasan Saymon',
      advisor: 'Dr. Kowshik Deb',
      status: 'pending'
    }
  ]);

  const handleApprove = (id: number) => {
    setPendingClubs(clubs => clubs.filter(club => club.id !== id));
  };

  const handleReject = (id: number) => {
    setPendingClubs(clubs => clubs.filter(club => club.id !== id));
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
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Club Registrations</h2>
                <div className="bg-white rounded-lg border border-gray-200 divide-y">
                  {pendingClubs.length === 0 ? (
                    <div className="p-4 text-gray-500">No pending registrations</div>
                  ) : (
                    pendingClubs.map(club => (
                      <div key={club.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{club.name}</h3>
                            <p className="mt-1 text-gray-600">{club.description}</p>
                            <div className="mt-2 text-sm text-gray-500">
                              <p>President: {club.president}</p>
                              <p>Advisor: {club.advisor}</p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleApprove(club.id)}
                              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(club.id)}
                              className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Website Settings</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Website Title
                    </label>
                    <input
                      type="text"
                      defaultValue="CUET Clubs"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Welcome Message
                    </label>
                    <textarea
                      rows={4}
                      defaultValue="Welcome to CUET Clubs - Your gateway to student activities and professional development."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}