// src/App.js
import React, { useState, useEffect } from 'react';
import { studentsData, initialAnnouncements } from './data/studentData';
import TeacherDashboard from './components/TeacherDashboard';
import StudentPortal from './components/StudentPortal';
import LoginPage from './components/LoginPage';

export default function App() {
  const [portal, setPortal] = useState('teacher'); 
  const [loggedInStudent, setLoggedInStudent] = useState(null);
  const [announcements, setAnnouncements] = useState(() => {
    const savedAnnouncements = localStorage.getItem('announcements');
    return savedAnnouncements ? JSON.parse(savedAnnouncements) : initialAnnouncements;
  });

  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handleLogin = (emailOrRoll) => {
    const student = studentsData.find(s => s.email === emailOrRoll || s.rollNumber === emailOrRoll);
    if (student) {
      setLoggedInStudent(student);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedInStudent(null);
    setPortal('teacher');
  };
  
  const addAnnouncement = (newAnnouncement) => {
    const updatedAnnouncements = [newAnnouncement, ...announcements];
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('lastAnnouncementTitle', newAnnouncement.title);
  };
  
  return (
    <div className="bg-gray-100 min-h-screen">
      {loggedInStudent ? (
        <StudentPortal student={loggedInStudent} allAnnouncements={announcements} onLogout={handleLogout} />
      ) : (
        <div>
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setPortal('teacher')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${portal === 'teacher' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  Teacher Panel
                </button>
                <button 
                  onClick={() => setPortal('student')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${portal === 'student' ? 'bg-gray-200 text-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  Student Portal
                </button>
              </div>
            </div>
          </header>
          
          <main>
            {portal === 'teacher' ? (
              <TeacherDashboard students={studentsData} announcements={announcements} addAnnouncement={addAnnouncement} />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )}
          </main>
        </div>
      )}
    </div>
  );
}