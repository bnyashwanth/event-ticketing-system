import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Calendar, MapPin, Clock, CheckCircle, Users, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const EventRegistration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({ userName: '', userEmail: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [pending, setPending] = useState(false);

    useEffect(() => { fetchEvent(); }, [id]);

    const fetchEvent = async () => {
        try {
            const { data } = await API.get(`/events/${id}`);
            setEvent(data);
        } catch (err) {
            setError('Event not found.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { data } = await API.post(`/registrations/${id}`, formData);
            if (data.status === 'Approved') navigate(`/ticket/${data.ticketId}`);
            else { setPending(true); setSuccess(true); }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div></div>;
    if (!event) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    if (success && pending) return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-md">
                <Clock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Registration Pending</h2>
                <p className="text-gray-500">Your request for {event.title} is awaiting organizer approval.</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
            <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-xl">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">Event</span>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                    <p className="text-gray-500 mb-6">{event.description}</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3"><Calendar className="text-indigo-600" /><span>{format(new Date(event.date), 'PPPp')}</span></div>
                        <div className="flex items-center gap-3"><MapPin className="text-purple-600" /><span>{event.venue}</span></div>
                        <div className="flex items-center gap-3"><Users className="text-emerald-600" /><span>{event.ticketLimit} tickets</span></div>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl">
                    <h3 className="text-xl font-bold mb-6">Register</h3>
                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" required placeholder="Full Name" className="w-full p-3 border rounded-xl" value={formData.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })} />
                        <input type="email" required placeholder="Email" className="w-full p-3 border rounded-xl" value={formData.userEmail} onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })} />
                        <button type="submit" disabled={submitting} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50">
                            {submitting ? 'Registering...' : 'Register Now'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventRegistration;
