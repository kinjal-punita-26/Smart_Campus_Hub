import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user && user.role !== 'Admin') {
            navigate('/dashboard'); // Eject non-admins aggressively
        } else if (user) {
            fetchUsers();
        }
    }, [user, navigate]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (id, name) => {
        if (!window.confirm(`⚠️ Are you sure you want to completely delete ${name}? This action is permanent and irreversible.`)) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchUsers(); // Refresh the grid
        } catch (error) {
            alert(error.response?.data?.message || 'Error executing delete command');
        }
    };

    if (user?.role !== 'Admin') return null;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <ShieldAlert size={36} color="var(--danger, #ef4444)" />
                <h2 style={{ margin: 0, fontSize: '2rem' }}>Administration Control Panel</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '50%', boxShadow: '0 0 15px rgba(99,102,241,0.5)' }}>
                        <Users color="white" size={28} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700 }}>{users.length}</h3>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Users</p>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                    <h3 style={{ margin: 0 }}>System User Directory</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Full Name</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Email Binding</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Clearance Role</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Joined Date</th>
                                <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>Executive Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, fontSize: '1.05rem' }}>{u.name}</td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>{u.email}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{
                                            background: u.role === 'Admin' ? 'rgba(239, 68, 68, 0.15)' : u.role === 'Faculty' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                                            color: u.role === 'Admin' ? '#f87171' : u.role === 'Faculty' ? '#fbbf24' : '#60a5fa',
                                            padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px'
                                        }}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                        {u._id !== user._id && (
                                            <button
                                                onClick={() => handleDeleteUser(u._id, u.name)}
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                                                    color: '#ef4444', cursor: 'pointer', padding: '0.5rem 0.75rem', borderRadius: '6px',
                                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
