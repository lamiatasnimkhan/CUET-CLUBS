import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';

export default function Workshops() {
  const [workshops, setWorkshops] = useState([]);
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

    // Fetch workshops for the club
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/workshops/club/${clubId}`);
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
  }, [clubId]);

  if (loading) return <p className="text-center text-gray-500">Loading workshops...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Workshops</h2>

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

            {/* Video Links Section */}
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
          </div>
        ))}
      </div>
    </div>
  );
}
