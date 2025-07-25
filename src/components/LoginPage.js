// src/components/LoginPage.js
import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) {
      alert("Please enter your email or roll number.");
      return;
    }
    onLogin(inputValue);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Student Login</h2>
            <p className="text-gray-500">Access your dashboard</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">
              Email or Roll Number
            </label>
            <div className="mt-1">
              <input
                id="login"
                name="login"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., chandorasumit1245@gmail.com or 001"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}