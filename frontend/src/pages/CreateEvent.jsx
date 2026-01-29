import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Calendar, MapPin, Type, AlignLeft, Users, Zap, Hand, ArrowLeft } from 'lucide-react';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        venue: '',
        ticketLimit: '',
        approvalMode: 'Auto',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/events', formData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to create event', error);
            alert('Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft size={18} />
                Back
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Create Event</h1>
                <p className="text-gray-500 mt-1">Fill in the details for your new event</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Event Title
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Type size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="title"
                                required
                                className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="e.g. Annual Tech Conference 2024"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <div className="relative">
                            <div className="absolute top-3.5 left-4 pointer-events-none">
                                <AlignLeft size={18} className="text-gray-400" />
                            </div>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                placeholder="Describe your event, agenda, and what attendees can expect..."
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Date & Venue */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Date & Time
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Calendar size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="datetime-local"
                                    name="date"
                                    required
                                    className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Venue
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <MapPin size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="venue"
                                    required
                                    className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="e.g. Convention Center, NYC"
                                    value={formData.venue}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Ticket Limit */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Ticket Limit
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Users size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="ticketLimit"
                                required
                                min="1"
                                className="pl-11 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Maximum number of attendees"
                                value={formData.ticketLimit}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Approval Mode */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Ticket Approval Mode
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, approvalMode: 'Auto' })}
                                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${formData.approvalMode === 'Auto'
                                        ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-100'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${formData.approvalMode === 'Auto' ? 'bg-indigo-600' : 'bg-gray-100'
                                    }`}>
                                    <Zap size={20} className={formData.approvalMode === 'Auto' ? 'text-white' : 'text-gray-500'} />
                                </div>
                                <div className="font-semibold text-gray-900">Auto Approval</div>
                                <div className="text-sm text-gray-500 mt-1">Tickets issued instantly</div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, approvalMode: 'Manual' })}
                                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${formData.approvalMode === 'Manual'
                                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-100'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${formData.approvalMode === 'Manual' ? 'bg-amber-500' : 'bg-gray-100'
                                    }`}>
                                    <Hand size={20} className={formData.approvalMode === 'Manual' ? 'text-white' : 'text-gray-500'} />
                                </div>
                                <div className="font-semibold text-gray-900">Manual Approval</div>
                                <div className="text-sm text-gray-500 mt-1">Review each registration</div>
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Event...' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
