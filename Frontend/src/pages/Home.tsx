import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Calendar, BookOpen, Award } from "lucide-react";

export default function Home() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        console.log("Fetching clubs...");
        const response = await fetch("http://localhost:4000/api/clubs");
        if (!response.ok) {
          throw new Error("Failed to fetch clubs");
        }
        const data = await response.json();
        console.log("Received clubs data:", data);
        setClubs(data); 
      } catch (error) {
        console.error("Error fetching clubs:", error);
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchClubs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CUET Clubs
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and join the vibrant club community at Chittagong University of Engineering and Technology
        </p>
      </div>

      {/* Clubs Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
  {loading ? (
    <p className="text-center text-gray-500">Loading clubs...</p>
  ) : (
    clubs.map((club) => (
      <div
        key={club._id}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        {/* Club Details */}
        <h3 className="text-xl font-semibold mb-2">{club.clubname}</h3>
        <p className="text-gray-600 mb-4">{club.about.slice(0, 100)}...</p>
        
        {/* Save club ID in localStorage on click */}
        <Link
          to={`/club/${club._id}`}
          className="text-teal-600 hover:text-teal-700"
          onClick={() => {
            console.log("Saving club ID to localStorage:", club._id);
            localStorage.setItem("selectedClubId", club._id);
          }}
        >
          Learn More →
        </Link>
      </div>
    ))
  )}
</div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center p-6">
          <Users className="h-12 w-12 text-teal-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Active Members</h3>
          <p className="text-gray-600">Join our growing community</p>
        </div>
        <div className="text-center p-6">
          <Calendar className="h-12 w-12 text-teal-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Regular Events</h3>
          <p className="text-gray-600">Participate in exciting activities</p>
        </div>
        <div className="text-center p-6">
          <BookOpen className="h-12 w-12 text-teal-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Workshops</h3>
          <p className="text-gray-600">Learn from industry experts</p>
        </div>
        <div className="text-center p-6">
          <Award className="h-12 w-12 text-teal-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Achievements</h3>
          <p className="text-gray-600">Celebrate our successes</p>
        </div>
      </div>
    </div>
  );
}