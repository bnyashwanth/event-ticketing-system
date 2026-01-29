import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { Calendar, MapPin, User, Download, QrCode } from 'lucide-react';
import { format } from 'date-fns';

const Ticket = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => { fetchTicket(); }, [ticketId]);

    const fetchTicket = async () => {
        try {
            const { data } = await API.get(`/registrations/ticket/${ticketId}`);
            setTicket(data);
        } catch (err) {
            setError('Invalid Ticket ID');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900"><div className="w-12 h-12 border-4 border-white/20 rounded-full animate-spin border-t-white"></div></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400">{error}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md w-full">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center">
                    <p className="text-xs font-bold tracking-widest opacity-80 mb-1">ADMIT ONE</p>
                    <h1 className="text-2xl font-bold">{ticket.event.title}</h1>
                </div>
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-gray-100 rounded-2xl p-4">
                            <QrCode size={100} className="text-gray-800" />
                        </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 font-mono mb-6 break-all">{ticket.ticketId}</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"><User size={18} className="text-indigo-600" /></div>
                            <div><p className="text-xs text-gray-400">Attendee</p><p className="font-semibold">{ticket.userName}</p></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center"><Calendar size={18} className="text-purple-600" /></div>
                            <div><p className="text-xs text-gray-400">Date</p><p className="font-semibold">{format(new Date(ticket.event.date), 'PPP p')}</p></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><MapPin size={18} className="text-emerald-600" /></div>
                            <div><p className="text-xs text-gray-400">Venue</p><p className="font-semibold">{ticket.event.venue}</p></div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-8 py-4 flex justify-between items-center border-t">
                    <span className="text-xs text-gray-400">Ticketeer</span>
                    <button onClick={() => window.print()} className="flex items-center gap-2 text-indigo-600 font-semibold text-sm"><Download size={16} /> Save</button>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
