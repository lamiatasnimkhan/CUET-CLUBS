import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface User {
  _id: string;
  name: string;
  email: string;
  transactionId: string; // Added transactionId
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApproveUser = async (userId: string) => {
    try {
      console.log('Approving user:', userId);
      const response = await fetch(`http://localhost:4000/api/users/approve/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to approve user');
      const data = await response.json();
      console.log('User approved:', data);
      fetchUsers();
    } catch (err) {
      console.error('Error approving user:', err);
      setError('Error approving user');
    }
  };

  const chartData = {
    labels: ['Approved Users', 'Pending Users'],
    datasets: [
      {
        label: 'Total Users',
        data: [approvedUsers.length, pendingUsers.length],
        backgroundColor: ['#4CAF50', '#FFC107'],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Manage Users</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">User Status</h3>
        <div className="w-full max-w-md mx-auto">
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Approved Users</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {approvedUsers.map((user) => (
            <div key={user._id} className="bg-white rounded-lg shadow p-6 text-center">
              <h4 className="text-lg font-semibold">{user.name}</h4>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500">Transaction ID: {user.transactionId}</p>
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
              <p className="text-gray-500">Transaction ID: {user.transactionId}</p>
              <button
                className="bg-teal-600 text-white p-2 rounded mt-4"
                onClick={() => handleApproveUser(user._id)}
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
