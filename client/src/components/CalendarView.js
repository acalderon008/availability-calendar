import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { Users, Clock, Copy, Check } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import moment from 'moment';
import { getParticipantColor } from '../utils/colors';
import { isHoliday, getHolidayName } from '../utils/holidays';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ userName }) => {
  const { id } = useParams();
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchCalendar = useCallback(async () => {
    try {
      const response = await api.get(`/api/calendars/${id}`);
      if (response.data.success) {
        setCalendar(response.data.calendar);
      }
    } catch (error) {
      console.error('Error fetching calendar:', error);
      toast.error('Failed to load calendar');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

  const handleDateChange = async (value) => {
    let dates = [];
    
    if (Array.isArray(value) && value.length === 2) {
      // Create array of all dates between start and end (inclusive)
      const startDate = moment(value[0]);
      const endDate = moment(value[1]);
      
      let currentDate = startDate.clone();
      while (currentDate.isSameOrBefore(endDate)) {
        dates.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'day');
      }
    } else if (Array.isArray(value) && value.length === 1) {
      dates = [moment(value[0]).format('YYYY-MM-DD')];
    } else {
      dates = [moment(value).format('YYYY-MM-DD')];
    }
    
    // Automatically add availability if we have dates and a user name
    if (dates.length > 0 && userName) {
      await addAvailability(dates);
    }
  };

  const addAvailability = async (dates) => {
    if (!userName || dates.length === 0) return;
    
    setSubmitting(true);
    try {
      const response = await api.post(`/api/calendars/${id}/availability`, {
        name: userName,
        dates: dates,
        times: [] // No time slots needed
      });
      
      if (response.data.success) {
        toast.success('Availability added automatically!');
        fetchCalendar(); // Refresh to show new availability
      }
    } catch (error) {
      console.error('Error adding availability:', error);
      toast.error('Failed to add availability');
    } finally {
      setSubmitting(false);
    }
  };

  const copyShareLink = async () => {
    const shareUrl = `${window.location.origin}/availability-calendar/#/share/${calendar.shareId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Share link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const getAvailabilityForDate = (date) => {
    if (!calendar) return [];
    const dateStr = moment(date).format('YYYY-MM-DD');
    return calendar.availability.filter(avail => 
      avail.dates.includes(dateStr)
    );
  };

  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return null;
    
    const availabilities = getAvailabilityForDate(date);
    const holiday = isHoliday(date, date.getFullYear());
    
    if (holiday) {
      return 'calendar-tile-holiday';
    }
    
    if (availabilities.length > 0) {
      return 'calendar-tile-available';
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    
    const availabilities = getAvailabilityForDate(date);
    const holiday = getHolidayName(date, date.getFullYear());
    
    return (
      <>
        {holiday && (
          <div className="holiday-name" title={holiday}>
            {holiday}
          </div>
        )}
        {availabilities.length > 0 && (
          <div className="participant-dots">
            {availabilities.map((availability, index) => (
              <div
                key={`${availability.name}-${index}`}
                className="participant-dot"
                style={{
                  backgroundColor: getParticipantColor(availability.name),
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  margin: '1px',
                  display: 'inline-block'
                }}
                title={availability.name}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div>Loading calendar...</div>
        </div>
      </div>
    );
  }

  if (!calendar) {
    return (
      <div className="container">
        <div className="card text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Calendar not found</h2>
          <Link to="/" className="btn btn-primary mt-4">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Calendar Header */}
      <div className="card mb-6">
        <div className="flex justify-between items-start gap-4" style={{ flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {calendar.name}
            </h1>
            {calendar.description && (
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {calendar.description}
              </p>
            )}
            <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {calendar.participants.length} participants
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Created {moment(calendar.createdAt).format('MMM D, YYYY')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button onClick={copyShareLink} className="btn btn-outline">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Share'}
            </button>
            {submitting && (
              <div className="flex items-center gap-2" style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: 'var(--background-color)', 
                borderRadius: 'var(--border-radius)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}>
                Adding availability...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
            Calendar View
          </h2>
          <Calendar
            onChange={handleDateChange}
            tileClassName={tileClassName}
            tileContent={tileContent}
            selectRange={true}
            minDate={new Date()}
          />
          <div className="mt-4 p-3" style={{ 
            backgroundColor: 'var(--background-color)', 
            borderRadius: 'var(--border-radius)',
            fontSize: '0.875rem'
          }}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  backgroundColor: 'var(--primary-color)', 
                  borderRadius: '50%' 
                }}></div>
                <span>Participant availability</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                  border: '1px solid #fecaca',
                  borderRadius: '4px' 
                }}></div>
                <span style={{ color: '#dc2626' }}>US Federal Holidays</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              Colored dots show who's available on each date. Hover over dots to see names.
            </p>
          </div>
        </div>

        {/* Availability Summary */}
        <div className="card">
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              Availability Summary
            </h2>
            {userName && (
              <div className="mb-4 p-3" style={{ 
                backgroundColor: 'var(--background-color)', 
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-color)'
              }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <strong>Tip:</strong> Just click on dates in the calendar to automatically add your availability as <strong>{userName}</strong>.
                </p>
              </div>
            )}
            
            {calendar.availability.length === 0 ? (
              <div className="text-center" style={{ color: 'var(--text-secondary)' }}>
                <Users size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>No availability added yet.</p>
                <p style={{ fontSize: '0.875rem' }}>Be the first to add your availability!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {calendar.availability.map((availability, index) => (
                  <div key={availability.id} className="p-3 border rounded" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            backgroundColor: getParticipantColor(availability.name),
                            borderRadius: '50%',
                            flexShrink: 0
                          }}
                        />
                        <h4 style={{ fontWeight: '600' }}>{availability.name}</h4>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {moment(availability.addedAt).format('MMM D, h:mm A')}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <div><strong>Dates:</strong> {availability.dates.length} selected</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView; 