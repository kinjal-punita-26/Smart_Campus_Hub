import { useState } from 'react';
import axios from 'axios';
import { Bot, Send, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AIAssistant = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([{ role: 'ai', content: `Hello ${user?.name.split(' ')[0]}! I am your Smart Campus AI Assistant. How can I help you today?` }]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post('http://localhost:5000/api/ai/ask', { prompt: userMsg }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessages(prev => [...prev, { role: 'ai', content: data.answer }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', content: '⚠️ Sorry, I am having trouble connecting to my backend systems right now.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', width: '100%', height: 'calc(100vh)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Bot size={28} color="var(--primary)" />
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>AI Campus Assistant</h2>
            </div>

            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {messages.map((msg, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                            {msg.role === 'ai' && <div style={{ background: 'var(--primary)', padding: '0.65rem', borderRadius: '50%', flexShrink: 0 }}><Bot size={18} color="white" /></div>}
                            <div style={{
                                background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                padding: '1.25rem',
                                borderRadius: '14px',
                                borderBottomRightRadius: msg.role === 'user' ? '0' : '14px',
                                borderBottomLeftRadius: msg.role === 'ai' ? '0' : '14px',
                                lineHeight: '1.6',
                                fontSize: '0.95rem',
                                color: msg.role === 'user' ? 'white' : 'var(--text-color)',
                                border: msg.role === 'ai' ? '1px solid var(--border-color)' : 'none'
                            }}>
                                {msg.content}
                            </div>
                            {msg.role === 'user' && <div style={{ background: 'var(--panel-bg)', padding: '0.65rem', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }}><User size={18} /></div>}
                        </div>
                    ))}
                    {isLoading && <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', paddingLeft: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                        <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.2s' }}></div>
                        <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', animation: 'pulse 1.5s infinite 0.4s' }}></div>
                    </div>}
                </div>

                <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
                    <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem' }}>
                        <input type="text" className="input-field" style={{ flex: 1, padding: '1rem', fontSize: '1rem' }} placeholder="Ask about campus rules, courses, or events..." value={input} onChange={e => setInput(e.target.value)} disabled={isLoading} />
                        <button type="submit" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1.5rem', fontWeight: 600 }} disabled={isLoading || !input.trim()}>
                            <Send size={18} /> Send
                        </button>
                    </form>
                </div>
            </div>
            {/* Inline pulse animation for typing indicator */}
            <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; transform: scale(1.1); } }`}</style>
        </div>
    );
};
export default AIAssistant;
