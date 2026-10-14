import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Megaphone } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        if (user) fetchAnnouncements();
    }, [user]);

    const fetchAnnouncements = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/announcements', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnnouncements(data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const handleCreateAnnouncement = async (e) => {
        e.preventDefault();
        setIsPosting(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/announcements', {
                title: newTitle,
                content: newContent
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewTitle('');
            setNewContent('');
            fetchAnnouncements();
        } catch (error) {
            console.error('Error creating announcement:', error);
        } finally {
            setIsPosting(false);
        }
    };

    if (!user) return null;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%' }}>
                        <UserIcon size={32} color="white" />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Welcome, {user.name}</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Role: {user.role}</p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Megaphone size={24} color="var(--primary)" />
                        <h3 style={{ margin: 0 }}>Announcements</h3>
                    </div>

                    {(user.role === 'Faculty' || user.role === 'Admin') && (
                        <form onSubmit={handleCreateAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                            <input type="text" placeholder="Announcement Title" className="input-field" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
                            <textarea placeholder="Announcement Content" className="input-field" rows="2" value={newContent} onChange={e => setNewContent(e.target.value)} required></textarea>
                            <button type="submit" className="btn" disabled={isPosting}>{isPosting ? 'Posting...' : 'Post Announcement'}</button>
                        </form>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                        {announcements.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)' }}>No new announcements.</p>
                        ) : (
                            announcements.map(a => (
                                <div key={a._id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                                    <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>{a.title}</h4>
                                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }}>{a.content}</p>
                                    <small style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>By {a.author?.name} ({a.author?.role}) • {new Date(a.createdAt).toLocaleDateString()}</small>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3>My Schedule</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Check your upcoming classes here.</p>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
