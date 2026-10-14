import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar } from 'lucide-react';

const Events = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '' });
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/events', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setEvents(data);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        setIsPosting(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/events', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFormData({ title: '', description: '', date: '', location: '' });
            fetchEvents();
        } catch (err) {
            console.error('Error creating event:', err);
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Calendar size={28} color="var(--primary)" />
                    <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Campus Events</h2>
                </div>

                {(user.role === 'Faculty' || user.role === 'Admin') && (
                    <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Schedule New Event</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <input type="text" placeholder="Event Title" className="input-field" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            <input type="text" placeholder="Location/Venue" className="input-field" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required />
                        </div>
                        <input type="datetime-local" className="input-field" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                        <textarea placeholder="Event Description..." className="input-field" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required></textarea>
                        <button type="submit" className="btn" disabled={isPosting} style={{ alignSelf: 'flex-start' }}>{isPosting ? 'Adding Event...' : 'Add Event'}</button>
                    </form>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {events.length === 0 ? (
                        <div style={{ color: 'var(--text-muted)' }}>No upcoming events currently scheduled.</div>
                    ) : (
                        events.map(event => (
                            <div key={event._id} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                                <h4 style={{ margin: '0 0 0.75rem 0', fontWeight: 700, fontSize: '1.3rem', color: 'var(--primary)' }}>{event.title}</h4>
                                <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.95rem', color: 'var(--text-muted)', flex: 1, whiteSpace: 'pre-wrap' }}>{event.description}</p>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px' }}>
                                    <p style={{ margin: '0 0 0.25rem 0' }}><strong style={{ color: 'white' }}>📍 Location:</strong> {event.location}</p>
                                    <p style={{ margin: 0 }}><strong style={{ color: 'white' }}>🕒 Date:</strong> {new Date(event.date).toLocaleString()}</p>
                                </div>
                                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '1rem 0' }} />
                                <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Posted by {event.author?.name} ({event.author?.role})</small>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
