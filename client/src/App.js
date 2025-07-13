import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './components/Home';
import CreateCalendar from './components/CreateCalendar';
import CalendarView from './components/CalendarView';
import SharedCalendar from './components/SharedCalendar';
import NamePrompt from './components/NamePrompt';
import { getUserName, hasUserName } from './utils/storage';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  useEffect(() => {
    if (hasUserName()) {
      setUserName(getUserName());
    } else {
      setShowNamePrompt(true);
    }
  }, []);

  const handleNameSet = (name) => {
    setUserName(name);
    setShowNamePrompt(false);
  };

  if (showNamePrompt) {
    return (
      <div className="App">
        <NamePrompt onNameSet={handleNameSet} />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header userName={userName} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCalendar />} />
            <Route path="/calendar/:id" element={<CalendarView userName={userName} />} />
            <Route path="/share/:shareId" element={<SharedCalendar userName={userName} />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App; 