import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, Share2, Users, Clock } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [recentCalendars, setRecentCalendars] = useState([]);
  const [shareId, setShareId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecentCalendars();
  }, []);

  const fetchRecentCalendars = async () => {
    try {
      const response = await api.get('/api/calendars');
      setRecentCalendars(response.data.calendars.slice(0, 3)); // Show only 3 most recent
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  };

  const handleJoinCalendar = async (e) => {
    e.preventDefault();
    if (!shareId.trim()) {
      toast.error('Please enter a share ID');
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/api/share/${shareId.trim()}`);
      if (response.data.success) {
        window.location.href = `/share/${shareId.trim()}`;
      }
    } catch (error) {
      toast.error('Invalid share ID or calendar not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="text-center mb-6">
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Calendar size={64} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Coordinate Availability with Friends
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Create shared calendars to find the perfect time to meet up with your friends and family.
          </p>
          
          <div className="flex gap-4 justify-center" style={{ flexWrap: 'wrap' }}>
            <Link to="/create" className="btn btn-primary">
              <Plus size={20} />
              Create New Calendar
            </Link>
            <button 
              onClick={() => document.getElementById('join-form').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-outline"
            >
              <Share2 size={20} />
              Join Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card text-center">
          <Calendar size={40} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Easy Calendar Creation</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Create a calendar in seconds and get a shareable link to send to your friends.
          </p>
        </div>
        
        <div className="card text-center">
          <Users size={40} color="var(--success-color)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Group Coordination</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Everyone can add their availability and see when everyone is free to meet.
          </p>
        </div>
        
        <div className="card text-center">
          <Clock size={40} color="var(--warning-color)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Time Management</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Select specific dates and time slots that work best for your group.
          </p>
        </div>
      </section>

      {/* Join Calendar Section */}
      <section id="join-form" className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>
          Join a Calendar
        </h2>
        <form onSubmit={handleJoinCalendar}>
          <div className="form-group">
            <label htmlFor="shareId" className="form-label">Share ID</label>
            <input
              type="text"
              id="shareId"
              className="form-input"
              placeholder="Enter the share ID from your friend"
              value={shareId}
              onChange={(e) => setShareId(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join Calendar'}
          </button>
        </form>
      </section>

      {/* Recent Calendars Section */}
      {recentCalendars.length > 0 && (
        <section className="mt-6">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Recent Calendars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentCalendars.map((calendar) => (
              <div key={calendar.id} className="card">
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {calendar.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {calendar.description || 'No description'}
                </p>
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {calendar.participantCount} participants
                  </span>
                  <Link to={`/calendar/${calendar.id}`} className="btn btn-outline" style={{ textDecoration: 'none' }}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home; 