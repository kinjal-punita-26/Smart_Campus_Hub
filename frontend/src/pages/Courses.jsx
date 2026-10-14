import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { BookOpen, FileText, CheckCircle } from 'lucide-react';

const NotesModule = ({ user }) => {
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', fileUrl: '', subject: '' });
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => { fetchNotes(); }, []);

    const fetchNotes = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/notes', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setNotes(data);
        } catch (err) { }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPosting(true);
        try {
            await axios.post('http://localhost:5000/api/notes', formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setFormData({ title: '', description: '', fileUrl: '', subject: '' });
            fetchNotes();
        } finally { setIsPosting(false); }
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Course Notes & Materials</h3>
            {(user.role === 'Faculty' || user.role === 'Admin') && (
                <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '1rem' }}>
                        <input className="input-field" placeholder="Note Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        <input className="input-field" placeholder="Subject Name" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
                    </div>
                    <input className="input-field" placeholder="File URL / Google Drive Link" value={formData.fileUrl} onChange={e => setFormData({ ...formData, fileUrl: e.target.value })} required />
                    <textarea className="input-field" placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required></textarea>
                    <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }} disabled={isPosting}>{isPosting ? 'Uploading...' : 'Upload Note'}</button>
                </form>
            )}
            <div style={{ display: 'grid', gap: '1rem' }}>
                {notes.map(note => (
                    <div key={note._id} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{note.title} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>({note.subject})</span></h4>
                        <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>{note.description}</p>
                        <a href={note.fileUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>🔗 View Material</a>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>Posted by {note.author?.name} on {new Date(note.createdAt).toLocaleDateString()}</div>
                    </div>
                ))}
                {notes.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No notes uploaded yet.</p>}
            </div>
        </div>
    );
};

const AssignmentsModule = ({ user }) => {
    const [assignments, setAssignments] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', deadline: '', subject: '' });
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => { fetchAssignments(); }, []);

    const fetchAssignments = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/assignments', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setAssignments(data);
        } catch (err) { }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPosting(true);
        try {
            await axios.post('http://localhost:5000/api/assignments', formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setFormData({ title: '', description: '', deadline: '', subject: '' });
            fetchAssignments();
        } finally { setIsPosting(false); }
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Assignments & Tasks</h3>
            {(user.role === 'Faculty' || user.role === 'Admin') && (
                <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)', gap: '1rem' }}>
                        <input className="input-field" placeholder="Assignment Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                        <input className="input-field" placeholder="Subject Name" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
                    </div>
                    <input className="input-field" type="datetime-local" value={formData.deadline} onChange={e => setFormData({ ...formData, deadline: e.target.value })} required />
                    <textarea className="input-field" placeholder="Task Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required></textarea>
                    <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }} disabled={isPosting}>{isPosting ? 'Creating...' : 'Create Assignment'}</button>
                </form>
            )}
            <div style={{ display: 'grid', gap: '1rem' }}>
                {assignments.map(a => (
                    <div key={a._id} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0' }}>{a.title}</h4>
                            <span style={{ color: 'var(--danger)', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Due: {new Date(a.deadline).toLocaleString()}</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>{a.description}</p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.5rem' }}>Subject: {a.subject} | Set by {a.author?.name}</div>
                    </div>
                ))}
                {assignments.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No active assignments.</p>}
            </div>
        </div>
    );
};

const AttendanceModule = ({ user }) => {
    const [records, setRecords] = useState([]);

    useEffect(() => { fetchAttendance(); }, []);

    const fetchAttendance = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/attendance', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setRecords(data);
        } catch (err) { }
    };

    return (
        <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Attendance Records</h3>

            {(user.role === 'Faculty' || user.role === 'Admin') && (
                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px' }}>
                    <p style={{ margin: 0, color: '#93c5fd' }}>💡 <strong>Faculty feature:</strong> The backend API for batch attendance marking is active at <code>POST /api/attendance</code>. The student selection UI roster for marking attendance is planned for the final polish phase.</p>
                </div>
            )}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                            <th style={{ padding: '1rem' }}>Date</th>
                            <th style={{ padding: '1rem' }}>Subject</th>
                            {user.role !== 'Student' && <th style={{ padding: '1rem' }}>Student</th>}
                            <th style={{ padding: '1rem' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map(r => (
                            <tr key={r._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(r.date).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>{r.subject}</td>
                                {user.role !== 'Student' && <td style={{ padding: '1rem' }}>{r.student?.name}</td>}
                                <td style={{ padding: '1rem', fontWeight: 600, color: r.status === 'Present' ? '#10b981' : '#ef4444' }}>{r.status}</td>
                            </tr>
                        ))}
                        {records.length === 0 && <tr><td colSpan={user.role !== 'Student' ? "4" : "3"} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No attendance records found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Courses = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('notes');

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', overflowX: 'auto' }}>
                <button onClick={() => setActiveTab('notes')} className="btn" style={{ background: activeTab === 'notes' ? 'var(--primary)' : 'transparent', color: activeTab === 'notes' ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'none' }}><BookOpen size={18} /> Course Notes</button>
                <button onClick={() => setActiveTab('assignments')} className="btn" style={{ background: activeTab === 'assignments' ? 'var(--primary)' : 'transparent', color: activeTab === 'assignments' ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'none' }}><FileText size={18} /> Assignments</button>
                <button onClick={() => setActiveTab('attendance')} className="btn" style={{ background: activeTab === 'attendance' ? 'var(--primary)' : 'transparent', color: activeTab === 'attendance' ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'none' }}><CheckCircle size={18} /> Attendance</button>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', minHeight: '500px' }}>
                {activeTab === 'notes' && <NotesModule user={user} />}
                {activeTab === 'assignments' && <AssignmentsModule user={user} />}
                {activeTab === 'attendance' && <AttendanceModule user={user} />}
            </div>
        </div>
    );
};

export default Courses;
