import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Copy, Check } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateCalendar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [createdCalendar, setCreatedCalendar] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter a calendar name');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/calendars', formData);
      if (response.data.success) {
        setCreatedCalendar(response.data.calendar);
        toast.success('Calendar created successfully!');
      }
    } catch (error) {
      console.error('Error creating calendar:', error);
      toast.error('Failed to create calendar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyShareLink = async () => {
    const shareUrl = `${window.location.origin}/share/${createdCalendar.shareId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Share link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const viewCalendar = () => {
    navigate(`/calendar/${createdCalendar.id}`);
  };

  if (createdCalendar) {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="text-center mb-6">
            <Check size={64} color="var(--success-color)" style={{ margin: '0 auto 1rem' }} />
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Calendar Created!
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Your calendar "{createdCalendar.name}" has been created successfully.
            </p>
          </div>

          <div className="mb-6">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
              Share with Friends
            </h3>
            <div className="form-group">
              <label className="form-label">Share Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="form-input"
                  value={`${window.location.origin}/share/${createdCalendar.shareId}`}
                  readOnly
                />
                <button
                  onClick={copyShareLink}
                  className="btn btn-outline"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Share this link with your friends so they can add their availability.
            </p>
          </div>

          <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
            <button onClick={viewCalendar} className="btn btn-primary flex-1">
              <Calendar size={20} />
              View Calendar
            </button>
            <button 
              onClick={() => {
                setCreatedCalendar(null);
                setFormData({ name: '', description: '' });
              }} 
              className="btn btn-outline flex-1"
            >
              <Plus size={20} />
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="text-center mb-6">
          <Calendar size={64} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Create New Calendar
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Set up a new availability calendar to coordinate with your friends.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Calendar Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="e.g., Weekend Trip Planning"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-input"
              placeholder="Optional description of what this calendar is for..."
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creating...' : (
              <>
                <Plus size={20} />
                Create Calendar
              </>
            )}
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
            <li>You'll get a unique share link to send to your friends</li>
            <li>Friends can click the link to add their availability</li>
            <li>Everyone can see when people are available to meet</li>
            <li>No account required - just share the link!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateCalendar; 