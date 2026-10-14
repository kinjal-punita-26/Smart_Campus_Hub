import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Calendar, BookOpen, User as UserIcon, LogOut, Bot, ShieldAlert } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (!user) return <Outlet />; // Should be protected by App.jsx anyway

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/events', label: 'Events', icon: <Calendar size={20} /> },
        { path: '/courses', label: 'Courses', icon: <BookOpen size={20} /> },
        { path: '/ai', label: 'AI Assistant', icon: <Bot size={20} /> },
        { path: '/profile', label: 'Profile', icon: <UserIcon size={20} /> }
    ];

    if (user?.role === 'Admin') {
        navItems.splice(4, 0, { path: '/admin', label: 'Admin Panel', icon: <ShieldAlert size={20} /> });
    }

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {/* Left Sidebar Menu */}
            <aside style={{ width: '260px', background: 'var(--panel-bg)', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Smart Campus</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>{user.role} Portal</p>
                </div>

                <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
                    {navItems.map(item => {
                        const isActive = location.pathname.startsWith(item.path.split(' ')[0]); // Handle coming soon text
                        return (
                            <Link
                                key={item.path}
                                to={item.path.split(' ')[0]}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                                    padding: '0.85rem 1rem', borderRadius: '8px',
                                    textDecoration: 'none', fontWeight: 500,
                                    color: isActive ? 'white' : 'var(--text-muted)',
                                    background: isActive ? 'var(--primary)' : 'transparent',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                {item.icon}
                                <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div style={{ padding: '1.5rem' }}>
                    <button onClick={logout} className="btn" style={{
                        width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-color)', position: 'relative' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
