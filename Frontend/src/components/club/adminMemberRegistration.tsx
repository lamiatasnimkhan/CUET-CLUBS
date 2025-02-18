import React, { useState, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  // Add other fields if needed
}

const ManageUsers: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const pendingResponse = await fetch('http://localhost:4000/api/clubs/pendingusers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!pendingResponse.ok) throw new Error('Failed to fetch pending users');
      const pendingData = await pendingResponse.json();
      setPendingUsers(pendingData);

      const approvedResponse = await fetch('http://localhost:4000/api/clubs/approvedusers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!approvedResponse.ok) throw new Error('Failed to fetch approved users');
      const approvedData = await approvedResponse.json();
      setApprovedUsers(approvedData);
    } catch (err) {
      setError('Error fetching users');
      console.error(err);
    }
  };

  // Call fetchUsers on component mount to load the users initially
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle approving a pending user
  const handleApproveUser = async (userId: string) => {
    try {
      console.log('Approving user:', userId); // Debug log
      const response = await fetch(`http://localhost:4000/api/users/approve/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to approve user');
      const data = await response.json();
      console.log('User approved:', data); // Debug log

      // Re-fetch users after approval to update the UI
      fetchUsers(); // Re-fetch both pending and approved users
    } catch (err) {
      console.error('Error approving user:', err);
      setError('Error approving user');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Manage Users</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Approved Users</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {approvedUsers.map((user) => (
            <div key={user._id} className="bg-white rounded-lg shadow p-6 text-center">
              <h4 className="text-lg font-semibold">{user.name}</h4>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Pending Users</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pendingUsers.map((user) => (
            <div key={user._id} className="bg-white rounded-lg shadow p-6 text-center">
              <h4 className="text-lg font-semibold">{user.name}</h4>
              <p className="text-gray-600">{user.email}</p>
              <button
                className="bg-teal-600 text-white p-2 rounded mt-4"
                onClick={() => handleApproveUser(user._id)} // Use the _id here
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
