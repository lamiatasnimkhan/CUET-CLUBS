import React, { useEffect, useState } from 'react';
import { Calendar, Link as LinkIcon } from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  // Get the clubId and accessToken from localStorage
  const clubId = localStorage.getItem('selectedClubId');
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!clubId) {
      setError('Club ID not found!');
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/events/club_id/${clubId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch event data');

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [clubId, accessToken]);

  const handleCreateEvent = async (eventData) => {
    try {
      const response = await fetch(`http://localhost:4000/api/events/${clubId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error('Failed to create event');
      const newEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditEvent = async (eventId, updatedEventData) => {
    try {
      const response = await fetch(`http://localhost:4000/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedEventData),
      });

      if (!response.ok) throw new Error('Failed to update event');
      const updatedEvent = await response.json();

      // Update event in the state
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? updatedEvent : event
        )
      );
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete event');

      // Remove event from the state
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditButtonClick = (event) => {
    setIsEditing(true);
    setEditEvent(event);
  };

  const handleCreateEventFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newEvent = {
      name: formData.get('name'),
      description: formData.get('description'),
      drive: formData.get('drive'),
      facebook: formData.get('facebook'),
    };

    handleCreateEvent(newEvent);
    e.target.reset();
  };

  if (loading) return <p className="text-center text-gray-500">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Manage Club Events</h2>

      {/* Event Creation Form */}
      {!isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Create New Event</h3>
          <form onSubmit={handleCreateEventFormSubmit}>
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">Event Name</label>
                <input type="text" name="name" id="name" className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea name="description" id="description" className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label htmlFor="drive" className="block text-gray-700">Google Drive Link</label>
                <input type="url" name="drive" id="drive" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label htmlFor="facebook" className="block text-gray-700">Facebook Post Link</label>
                <input type="url" name="facebook" id="facebook" className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="mt-4 w-full bg-teal-600 text-white p-2 rounded">Create Event</button>
            </div>
          </form>
        </div>
      )}

      {/* Event Editing Form */}
      {isEditing && editEvent && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Edit Event</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updatedEvent = {
                name: formData.get('name'),
                description: formData.get('description'),
                drive: formData.get('drive'),
                facebook: formData.get('facebook'),
              };
              handleEditEvent(editEvent._id, updatedEvent);
            }}
          >
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">Event Name</label>
                <input type="text" name="name" id="name" className="w-full p-2 border rounded" defaultValue={editEvent.name} required />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea name="description" id="description" className="w-full p-2 border rounded" defaultValue={editEvent.description} required />
              </div>
              <div>
                <label htmlFor="drive" className="block text-gray-700">Google Drive Link</label>
                <input type="url" name="drive" id="drive" className="w-full p-2 border rounded" defaultValue={editEvent.drive} />
              </div>
              <div>
                <label htmlFor="facebook" className="block text-gray-700">Facebook Post Link</label>
                <input type="url" name="facebook" id="facebook" className="w-full p-2 border rounded" defaultValue={editEvent.facebook} />
              </div>
              <button type="submit" className="mt-4 w-full bg-teal-600 text-white p-2 rounded">Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* Event List */}
      <div className="grid gap-6 mt-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{event.name}</h3>
              </div>
              <div>
                <button
                  onClick={() => handleEditButtonClick(event)}
                  className="text-teal-600 hover:text-teal-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="ml-4 text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>

            <p className="mt-4 text-gray-600">{event.description}</p>

            <div className="mt-4 flex space-x-4">
              {event.drive && (
                <a
                  href={event.drive}
                  className="flex items-center text-teal-600 hover:text-teal-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="h-4 w-4 mr-1" />
                  View Photos
                </a>
              )}
              {event.facebook && (
                <a
                  href={event.facebook}
                  className="flex items-center text-teal-600 hover:text-teal-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon className="h-4 w-4 mr-1" />
                  Facebook Post
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
