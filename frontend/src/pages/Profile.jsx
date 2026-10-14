import { useAuth } from '../context/AuthContext';
import { User as UserIcon } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', background: 'var(--primary)', padding: '2rem', borderRadius: '50%', marginBottom: '1.5rem', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)' }}>
                    <UserIcon size={64} color="white" />
                </div>
                <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem', fontWeight: 700 }}>{user.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', margin: '0 0 3rem 0', letterSpacing: '1px', textTransform: 'uppercase' }}>{user.role}</p>

                <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px' }}>
                    <h3 style={{ margin: '0 0 1.5rem 0', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>Personal Information</h3>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
                        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '1.1rem' }}>{user.name}</div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Address</label>
                        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '1.1rem' }}>{user.email}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
