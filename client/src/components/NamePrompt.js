import React, { useState } from 'react';
import { Calendar, User } from 'lucide-react';
import { setUserName } from '../utils/storage';

const NamePrompt = ({ onNameSet }) => {
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setUserName(name.trim());
    onNameSet(name.trim());
    setSubmitting(false);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="text-center mb-6">
          <Calendar size={64} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Welcome to Availability Calendar
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Let's get started by setting up your name. This will be used when you add your availability to calendars.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Your Name *</label>
            <div className="flex gap-2">
              <User size={20} style={{ color: 'var(--text-secondary)', marginTop: '0.75rem' }} />
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={submitting || !name.trim()}
          >
            {submitting ? 'Setting up...' : 'Get Started'}
          </button>
        </form>

        <div className="mt-6 p-4" style={{ 
          backgroundColor: 'var(--background-color)', 
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--border-color)'
        }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            What happens next?
          </h4>
          <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', paddingLeft: '1.5rem' }}>
            <li>Your name will be saved for future use</li>
            <li>You can create or join calendars</li>
            <li>Dates will be automatically added when you select them</li>
            <li>No more clicking "Add Availability" - just select dates!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NamePrompt; 