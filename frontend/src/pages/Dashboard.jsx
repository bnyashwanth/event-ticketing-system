import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { Calendar, MapPin, Users, Settings, ExternalLink, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data } = await API.get('/events/my-events');
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch events', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
                    <p className="text-gray-500 mt-1">Manage and track your event registrations</p>
                </div>
                <Link
                    to="/create-event"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 flex items-center gap-2"
                >
                    <Sparkles size={18} />
                    Create New Event
                </Link>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Calendar size={40} className="text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No events yet</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first event</p>
                    <Link
                        to="/create-event"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300"
                    >
                        Create Event
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 hover:-translate-y-1 group"
                        >
                            {/* Card Header */}
                            <div className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                        {event.title}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 text-xs font-bold rounded-full ${event.approvalMode === 'Auto'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                            }`}
                                    >
                                        {event.approvalMode}
                                    </span>
                                </div>

                                <p className="text-gray-500 text-sm mb-5 line-clamp-2">
                                    {event.description}
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                            <Calendar size={16} className="text-indigo-600" />
                                        </div>
                                        <span>{format(new Date(event.date), 'PPP')}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                                            <MapPin size={16} className="text-purple-600" />
                                        </div>
                                        <span className="truncate">{event.venue}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                            <Users size={16} className="text-emerald-600" />
                                        </div>
                                        <span>{event.ticketLimit} tickets available</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                <Link
                                    to={`/event/${event._id}/manage`}
                                    className="text-indigo-600 font-semibold text-sm flex items-center gap-1.5 hover:text-indigo-700 transition-colors"
                                >
                                    <Settings size={16} />
                                    Manage
                                </Link>
                                <Link
                                    to={`/event/${event._id}`}
                                    target='_blank'
                                    className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1 transition-colors"
                                >
                                    Public Page
                                    <ExternalLink size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
