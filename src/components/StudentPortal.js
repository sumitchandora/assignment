// src/components/StudentPortal.js
import React, { useState, useEffect } from 'react';

export default function StudentPortal({ student, allAnnouncements, onLogout }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  
  useEffect(() => {
    const lastSeenTitle = localStorage.getItem('seenAnnouncementTitle');
    const lastAnnouncementTitle = localStorage.getItem('lastAnnouncementTitle');

    if (lastAnnouncementTitle && lastAnnouncementTitle !== lastSeenTitle) {
      setPopupTitle(lastAnnouncementTitle);
      setShowPopup(true);
      localStorage.setItem('seenAnnouncementTitle', lastAnnouncementTitle);
      
      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const studentAnnouncements = allAnnouncements.filter(ann =>
    ann.recipients === 'All Students' || ann.recipients.includes(student.class)
  );

  return (
    <div className="relative min-h-screen">
      {showPopup && <NotificationPopup title={popupTitle} onClose={() => setShowPopup(false)} />}
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">🧑‍🎓 Student Dashboard</h1>
            <button onClick={onLogout} className="text-sm font-medium text-gray-600 hover:text-black bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-md">
                Logout
            </button>
        </div>
      </header>

      <main className="p-4 sm:p-8">
        <StudentDetails student={student} announcements={studentAnnouncements} />
      </main>
    </div>
  );
}

function NotificationPopup({ title, onClose }) {
    return (
        <div className="fixed top-5 right-5 bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center animate-fade-in-down">
            <div className="p-2 bg-green-100 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <div>
                <strong className="font-bold">New Announcement</strong>
                <span className="block text-sm text-gray-600">{title}</span>
            </div>
            <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">&times;</button>
        </div>
    );
}

function StudentDetails({ student, announcements }) {
  const [activeTab, setActiveTab] = useState('attendance');
  
  const attendanceRate = ((student.attendance.filter(a => a.status === 'present').length / student.attendance.length) * 100).toFixed(0);
  const averageMarks = (student.marks.reduce((acc, curr) => acc + curr.marks, 0) / student.marks.length).toFixed(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">{student.name}</h3>
        <p className="text-gray-600">{student.email}</p>
        <div className="flex space-x-2 text-sm mt-2">
          <span className="bg-gray-200 px-2 py-1 rounded">Roll No: {student.rollNumber}</span>
          <span className="bg-gray-200 px-2 py-1 rounded">Class: {student.class}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-600">Attendance Rate</h4>
            <p className="text-3xl font-bold text-gray-800">{attendanceRate}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2"><div className="bg-blue-600 h-2 rounded-full" style={{ width: `${attendanceRate}%` }}></div></div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-600">Average Marks</h4>
            <p className="text-3xl font-bold text-gray-800">{averageMarks}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2"><div className="bg-green-600 h-2 rounded-full" style={{ width: `${averageMarks}%` }}></div></div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-600">Assignments</h4>
            <p className="text-3xl font-bold text-gray-800">{student.assignments.length}</p>
            <p className="text-sm text-gray-500">{student.assignments.filter(a => a.status === 'submitted').length} submitted</p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('attendance')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'attendance' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300'}`}>Attendance</button>
            <button onClick={() => setActiveTab('marks')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'marks' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300'}`}>Marks</button>
            <button onClick={() => setActiveTab('assignments')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'assignments' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300'}`}>Assignments</button>
            <button onClick={() => setActiveTab('announcements')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'announcements' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300'}`}>Announcements</button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'attendance' && <AttendanceTab records={student.attendance} />}
        {activeTab === 'announcements' && <AnnouncementsTab announcements={announcements} />}
        {activeTab === 'marks' && <div className="text-center text-gray-500 p-4">Marks details would be displayed here.</div>}
        {activeTab === 'assignments' && <div className="text-center text-gray-500 p-4">Assignments details would be displayed here.</div>}
      </div>
    </div>
  );
}

function AttendanceTab({ records }) {
  return (
    <div>
        <h4 className="font-semibold mb-2 text-gray-700">Attendance Records</h4>
        <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.subject}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ record.status === 'present' ? 'bg-green-100 text-green-800' : record.status === 'absent' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {record.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}

function AnnouncementsTab({ announcements }) {
    const priorityClasses = { high: 'bg-red-500', medium: 'bg-yellow-500', low: 'bg-blue-500' };
    const priorityPillClasses = { high: 'bg-red-200 text-red-800 border-red-300', medium: 'bg-yellow-200 text-yellow-800 border-yellow-300', low: 'bg-blue-200 text-blue-800 border-blue-300' }
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold">Important announcements from your teachers</h3>
            {announcements.map(ann => (
                <div key={ann.id} className={`p-4 border-l-4 rounded-r-lg ${priorityClasses[ann.priority]} border bg-white`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-lg text-gray-900">{ann.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{ann.date}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase border ${priorityPillClasses[ann.priority]}`}>
                            {ann.priority}
                        </span>
                    </div>
                    <p className="mt-2 text-gray-700">{ann.message}</p>
                </div>
            ))}
        </div>
    );
}