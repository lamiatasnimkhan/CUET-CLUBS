import React, { useEffect, useState } from 'react';
import { Calendar, Link as LinkIcon } from 'lucide-react';

export default function Events() {
  const [events, setEvents] = useState([]);
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

    // Fetch events for the club
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/events/club_id/${clubId}`);
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
  }, [clubId]);

  if (loading) return <p className="text-center text-gray-500">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Club Events</h2>

      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{event.name}</h3>
              </div>
            </div>

            {/* Event Description */}
            <p className="mt-4 text-gray-600">{event.description}</p>

            {/* Links Section */}
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
