import React, { useEffect, useState } from 'react';

export default function Committee() {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the clubId from localStorage
  const clubId = localStorage.getItem('selectedClubId');

  useEffect(() => {
    if (!clubId) {
      setError('Club ID not found!');
      setLoading(false);
      return;
    }

    // Fetch committee members
    const fetchCommitteeMembers = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/committee/club/${clubId}`);
        if (!response.ok) throw new Error('Failed to fetch committee data');

        const data = await response.json();
        setCommitteeMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitteeMembers();
  }, [clubId]);

  if (loading) return <p className="text-center text-gray-500">Loading committee members...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Committee Members</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {committeeMembers.map((member) => (
          <div key={member._id} className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.position}</p>
            <p className="text-gray-600">Email: <a href={`mailto:${member.email}`} className="text-teal-600">{member.email}</a></p>

            <div className="mt-4 flex justify-center space-x-4">
              {member.facebook && (
                <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-teal-600">
                  Facebook
                </a>
              )}
              {member.instagram && (
                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-teal-600">
                  Instagram
                </a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-600">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
