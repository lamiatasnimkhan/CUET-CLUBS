import React, { useEffect, useState } from 'react';

interface CommitteeMember {
  _id: string;
  name: string;
  position: string;
  email: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export default function Committee() {
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMember, setNewMember] = useState<CommitteeMember>({
    _id: '',
    name: '',
    position: '',
    email: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editMember, setEditMember] = useState<CommitteeMember | null>(null);

  const clubId = localStorage.getItem('selectedClubId');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!clubId) {
      setError('Club ID not found!');
      setLoading(false);
      return;
    }

    const fetchCommitteeMembers = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/committee/club/${clubId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
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
  }, [clubId, accessToken]);

  const handleAddMember = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/committee/club/${clubId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) throw new Error('Failed to add committee member');
      const data = await response.json();
      setCommitteeMembers([...committeeMembers, data]);
      setNewMember({
        _id: '',
        name: '',
        position: '',
        email: '',
        facebook: '',
        instagram: '',
        linkedin: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditMember = async (member: CommitteeMember) => {
    setIsEditing(true);
    setEditMember(member);
  };

  const handleUpdateMember = async () => {
    if (editMember) {
      try {
        const response = await fetch(`http://localhost:4000/api/committee/${editMember._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(editMember),
        });

        if (!response.ok) throw new Error('Failed to update committee member');
        const data = await response.json();
        setCommitteeMembers(
          committeeMembers.map((member) =>
            member._id === data._id ? { ...member, ...data } : member
          )
        );
        setIsEditing(false);
        setEditMember(null);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/committee/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete committee member');
      setCommitteeMembers(committeeMembers.filter((member) => member._id !== memberId));
    } catch (err) {
      setError(err.message);
    }
  };

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
            <p className="text-gray-600">
              Email: <a href={`mailto:${member.email}`} className="text-teal-600">{member.email}</a>
            </p>

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

            <div className="mt-4 flex justify-center space-x-4">
              <button
                className="text-teal-600"
                onClick={() => handleEditMember(member)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDeleteMember(member._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && editMember && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Edit Committee Member</h3>
          <input
            type="text"
            placeholder="Name"
            value={editMember.name}
            onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Position"
            value={editMember.position}
            onChange={(e) => setEditMember({ ...editMember, position: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={editMember.email}
            onChange={(e) => setEditMember({ ...editMember, email: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="url"
            placeholder="Facebook URL"
            value={editMember.facebook || ''}
            onChange={(e) => setEditMember({ ...editMember, facebook: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="url"
            placeholder="Instagram URL"
            value={editMember.instagram || ''}
            onChange={(e) => setEditMember({ ...editMember, instagram: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={editMember.linkedin || ''}
            onChange={(e) => setEditMember({ ...editMember, linkedin: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleUpdateMember}
            className="mt-4 bg-teal-600 text-white p-2 rounded"
          >
            Update
          </button>
        </div>
      )}

      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold">Add New Committee Member</h3>
        <input
          type="text"
          placeholder="Name"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          className="mt-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Position"
          value={newMember.position}
          onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
          className="mt-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newMember.email}
          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          className="mt-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="url"
          placeholder="Facebook URL"
          value={newMember.facebook}
          onChange={(e) => setNewMember({ ...newMember, facebook: e.target.value })}
          className="mt-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="url"
          placeholder="Instagram URL"
          value={newMember.instagram}
          onChange={(e) => setNewMember({ ...newMember, instagram: e.target.value })}
          className="mt-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          value={newMember.linkedin}
          onChange={(e) => setNewMember({ ...newMember, linkedin: e.target.value })}
          className="mt-2 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddMember}
          className="mt-4 bg-teal-600 text-white p-2 rounded"
        >
          Add Member
        </button>
      </div>
    </div>
  );
}
