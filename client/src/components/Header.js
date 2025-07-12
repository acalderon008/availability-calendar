import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Plus, Home, User } from 'lucide-react';

const Header = ({ userName }) => {
  const location = useLocation();

  return (
    <header style={{
      backgroundColor: 'var(--surface-color)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container">
        <div className="flex items-center justify-between" style={{ padding: '1rem 0' }}>
          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
            <Calendar size={24} color="var(--primary-color)" />
            <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>Availability Calendar</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link 
              to="/" 
              className={`btn ${location.pathname === '/' ? 'btn-primary' : 'btn-outline'}`}
              style={{ textDecoration: 'none' }}
            >
              <Home size={16} />
              Home
            </Link>
            <Link 
              to="/create" 
              className={`btn ${location.pathname === '/create' ? 'btn-primary' : 'btn-outline'}`}
              style={{ textDecoration: 'none' }}
            >
              <Plus size={16} />
              Create Calendar
            </Link>
            {userName && (
              <div className="flex items-center gap-2" style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: 'var(--background-color)', 
                borderRadius: 'var(--border-radius)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}>
                <User size={16} />
                {userName}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 