import React, { useState } from 'react';
import { CalendarDays, Users, Video, Settings } from 'lucide-react';
import Events from '../components/club/adminEvents';
import Workshops from '../components/club/adminWorkshops';
import Committee from '../components/club/adminCommittee';
import MemberRegistration from '../components/club/adminMemberRegistration';

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
                  Committee
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
                  Club Member Management
                </button>
              </nav>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'events' && <Events />}
            {activeTab === 'workshops' && <Workshops />}
            {activeTab === 'members' && <Committee />}
            {activeTab === 'settings' && <MemberRegistration />}
          </div>
        </div>
      </div>
    </div>
  );
}
