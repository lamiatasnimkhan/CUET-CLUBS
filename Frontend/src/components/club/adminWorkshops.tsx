import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editWorkshop, setEditWorkshop] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newWorkshop, setNewWorkshop] = useState({ title: '', mentors: '', videoLinks: '' });

  const clubId = localStorage.getItem('selectedClubId');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!clubId) {
      setError('Club ID not found!');
      setLoading(false);
      return;
    }

    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/workshops/club/${clubId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch workshop data');

        const data = await response.json();
        setWorkshops(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, [clubId, accessToken]);

  const handleCreateWorkshop = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const workshopData = {
      title: newWorkshop.title,
      mentors: newWorkshop.mentors.split(',').map((item) => item.trim()), // Convert mentors to an array
      videoLinks: newWorkshop.videoLinks.split(',').map((item) => item.trim()), // Convert video links to an array
    };

    try {
      const response = await fetch(`http://localhost:4000/api/workshops/club/${clubId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(workshopData),
      });

      if (!response.ok) throw new Error('Failed to create workshop');
      const newWorkshopData = await response.json();

      setWorkshops((prevWorkshops) => [...prevWorkshops, newWorkshopData]);
      setIsCreating(false); // Close create workshop modal
      setNewWorkshop({ title: '', mentors: '', videoLinks: '' }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditWorkshop = async (workshopId, updatedWorkshopData) => {
    if (!updatedWorkshopData.title || !updatedWorkshopData.mentors.length) {
      setError('Title and mentors are required fields');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/workshops/${workshopId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedWorkshopData),
      });

      if (!response.ok) throw new Error('Failed to update workshop');
      const updatedWorkshop = await response.json();

      setWorkshops((prevWorkshops) =>
        prevWorkshops.map((workshop) =>
          workshop._id === workshopId ? updatedWorkshop : workshop
        )
      );
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteWorkshop = async (workshopId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/workshops/${workshopId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete workshop');

      setWorkshops((prevWorkshops) =>
        prevWorkshops.filter((workshop) => workshop._id !== workshopId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditButtonClick = (workshop) => {
    setIsEditing(true);
    setEditWorkshop(workshop);
  };

  const handleCreateButtonClick = () => {
    setIsCreating(true);
    setNewWorkshop({ title: '', mentors: '', videoLinks: '' }); // Reset form
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkshop((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <p className="text-center text-gray-500">Loading workshops...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Manage Workshops</h2>

      {/* Create Workshop Button */}
      <button
        onClick={handleCreateButtonClick}
        className="bg-teal-600 text-white px-4 py-2 rounded"
      >
        Create New Workshop
      </button>

      <div className="grid gap-6">
        {workshops.map((workshop) => (
          <div key={workshop._id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold">{workshop.title}</h3>

            {/* Mentors Section */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700">Mentors:</h4>
              <div className="mt-2 space-y-2">
                {workshop.mentors && workshop.mentors.length > 0 ? (
                  workshop.mentors.map((mentor, index) => (
                    <div key={index} className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{mentor}</span>
                    </div>
                  ))
                ) : (
                  <p>No mentors available.</p>
                )}
              </div>
            </div>

            {/* Resources Section */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-700">Resources:</h4>
              <div className="mt-2">
                {workshop.videoLinks && workshop.videoLinks.length > 0 ? (
                  workshop.videoLinks.map((videoLink, index) => (
                    <a
                      key={index}
                      href={videoLink}
                      className="flex items-center text-teal-600 hover:text-teal-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="h-4 w-4 mr-1">📹</span>
                      Watch Workshop Recording
                    </a>
                  ))
                ) : (
                  <p>No video resources available.</p>
                )}
              </div>
            </div>

            {/* Admin Actions */}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleEditButtonClick(workshop)}
                className="bg-teal-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteWorkshop(workshop._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Workshop Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold">Edit Workshop</h3>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={editWorkshop.title}
                onChange={(e) =>
                  setEditWorkshop({ ...editWorkshop, title: e.target.value })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Mentors</label>
              <textarea
                value={editWorkshop.mentors.join(', ')}
                onChange={(e) =>
                  setEditWorkshop({
                    ...editWorkshop,
                    mentors: e.target.value.split(', '),
                  })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Video Links</label>
              <textarea
                value={editWorkshop.videoLinks.join(', ')}
                onChange={(e) =>
                  setEditWorkshop({
                    ...editWorkshop,
                    videoLinks: e.target.value.split(', '),
                  })
                }
                className="mt-1 p-2 w-full border border-gray-300 rounded"
              />
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEditWorkshop(editWorkshop._id, editWorkshop)}
                className="bg-teal-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Workshop Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold">Create New Workshop</h3>

            {/* Form for Creating New Workshop */}
            <form onSubmit={handleCreateWorkshop}>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newWorkshop.title}
                  onChange={handleCreateInputChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Mentors</label>
                <input
                  type="text"
                  name="mentors"
                  value={newWorkshop.mentors}
                  onChange={handleCreateInputChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
                <p className="text-sm text-gray-500 mt-1">Separate mentors with commas.</p>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Video Links</label>
                <input
                  type="text"
                  name="videoLinks"
                  value={newWorkshop.videoLinks}
                  onChange={handleCreateInputChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                />
                <p className="text-sm text-gray-500 mt-1">Separate links with commas.</p>
              </div>

              <div className="mt-4 flex justify-between">
                <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
