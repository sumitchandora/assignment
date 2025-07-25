// src/components/TeacherDashboard.js
import React, { useState } from 'react';

export default function TeacherDashboard({ students, announcements, addAnnouncement }) {
  const [activeTab, setActiveTab] = useState('management');

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🎓 Teacher Admin Panel</h1>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('management')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'management'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Student Management
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'announcements'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Announcements
          </button>
        </nav>
      </div>
      
      <div className="mt-8">
        {activeTab === 'management' && <StudentManagement students={students} />}
        {activeTab === 'announcements' && <AnnouncementsPanel announcements={announcements} addAnnouncement={addAnnouncement} />}
      </div>
    </div>
  );
}

function StudentManagement({ students }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex space-x-8">
      <div className="w-1/3 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Students</h2>
        <input 
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
          {filteredStudents.map(student => (
            <li 
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`p-3 rounded-md cursor-pointer ${selectedStudent?.id === student.id ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
            >
              <p className="font-semibold">{student.rollNumber} - {student.name}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 bg-white p-6 rounded-lg shadow">
        {selectedStudent ? (
          <StudentDetails student={selectedStudent} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" transform="translate(0 6)" /></svg>
            <p className="text-lg font-semibold">Select a student to view their details</p>
            <p className="text-sm">Choose a student to see their attendance, marks, and assignments</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentDetails({ student }) {
    const attendanceRate = ((student.attendance.filter(a => a.status === 'present').length / student.attendance.length) * 100).toFixed(0);
    const averageMarks = (student.marks.reduce((acc, curr) => acc + curr.marks, 0) / student.marks.length).toFixed(0);

    return (
        <div>
            <div className="flex items-center space-x-4 mb-6">
                <div>
                    <h3 className="text-2xl font-bold">{student.name}</h3>
                    <p className="text-gray-600">{student.email}</p>
                    <div className="flex space-x-4 text-sm mt-1">
                        <span className="bg-gray-200 px-2 py-1 rounded">Roll No: {student.rollNumber}</span>
                        <span className="bg-gray-200 px-2 py-1 rounded">Class: {student.class}</span>
                    </div>
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

            <div>
                <h4 className="font-semibold mb-2 text-gray-700">Recent Attendance History</h4>
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
                            {student.attendance.slice(0, 5).map((record, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ record.status === 'present' ? 'bg-green-100 text-green-800' : record.status === 'absent' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800' }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function AnnouncementsPanel({ announcements, addAnnouncement }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">🔔 Announcements</h2>
        <button onClick={() => setShowModal(true)} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 font-semibold flex items-center space-x-2">
          <span>+</span>
          <span>New Announcement</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map(ann => <AnnouncementCard key={ann.id} announcement={ann} />)}
      </div>

      {showModal && <AnnouncementModal onClose={() => setShowModal(false)} onSend={addAnnouncement} />}
    </div>
  );
}

function AnnouncementCard({ announcement }) {
  const priorityClasses = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500'
  };
  const priorityPillClasses = {
    high: 'bg-red-200 text-red-800 border-red-300',
    medium: 'bg-yellow-200 text-yellow-800 border-yellow-300',
    low: 'bg-blue-200 text-blue-800 border-blue-300'
  }

  return (
    <div className={`p-4 border-l-4 rounded-r-lg ${priorityClasses[announcement.priority]} border bg-white`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{announcement.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{announcement.date} • Recipients: {announcement.recipients}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase border ${priorityPillClasses[announcement.priority]}`}>
          {announcement.priority}
        </span>
      </div>
      <p className="mt-2 text-gray-700">{announcement.message}</p>
    </div>
  );
}

function AnnouncementModal({ onClose, onSend }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !message) {
      alert("Please fill in all fields.");
      return;
    }
    const newAnnouncement = {
      id: Date.now().toString(),
      title,
      message,
      priority,
      recipients: 'All Students',
      date: new Date().toISOString().split('T')[0],
    };
    onSend(newAnnouncement);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Create New Announcement</h2>
            <p className="text-sm text-gray-500">Send notification to students</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter announcement title..." />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" rows="4" placeholder="Enter your message..."></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                <option>All Students</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-800 font-semibold flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 0010 16h.008a1 1 0 00.72-1.428l5-14a1 1 0 001.17-1.409l-7-14z" /></svg>
              <span>Send Announcement</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}