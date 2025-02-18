import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Users, Video, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-900">Club Admin Dashboard</h1>
            </div>
            <div className="px-6">
              <nav className="-mb-px flex space-x-6">
                <button
                  onClick={() => setActiveTab('events')}
                  className={`${
                    activeTab === 'events'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <CalendarDays className="h-5 w-5 mr-2" />
                  Events
                </button>
                <button
                  onClick={() => setActiveTab('workshops')}
                  className={`${
                    activeTab === 'workshops'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Video className="h-5 w-5 mr-2" />
                  Workshops
                </button>
                <button
                  onClick={() => setActiveTab('members')}
                  className={`${
                    activeTab === 'members'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Members
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`${
                    activeTab === 'settings'
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </button>
              </nav>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Events</h2>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                    Add Event
                  </button>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 divide-y">
                  {/* Event list will go here */}
                  <div className="p-4">No events found</div>
                </div>
              </div>
            )}

            {activeTab === 'workshops' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Workshops</h2>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                    Add Workshop
                  </button>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 divide-y">
                  {/* Workshop list will go here */}
                  <div className="p-4">No workshops found</div>
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Members</h2>
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                      Approve Members
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      Export List
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 divide-y">
                  {/* Member list will go here */}
                  <div className="p-4">No members found</div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Club Settings</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Club Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows={4}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
