import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { CheckCircle, XCircle, ChevronLeft, RefreshCw, Users, Clock, CheckCheck, X } from 'lucide-react';
import { format } from 'date-fns';

const ManageEvent = () => {
    const { id } = useParams();
    const [registrations, setRegistrations] = useState([]);
    const [eventDetails, setEventDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [regRes, eventRes] = await Promise.all([
                API.get(`/registrations/event/${id}`),
                API.get(`/events/${id}`)
            ]);
            setRegistrations(regRes.data);
            setEventDetails(eventRes.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (regId, newStatus) => {
        try {
            const { data } = await API.put(`/registrations/${regId}/status`, { status: newStatus });
            setRegistrations((prev) =>
                prev.map((reg) => (reg._id === regId ? { ...reg, status: data.status, ticketId: data.ticketId } : reg))
            );
        } catch (error) {
            console.error('Failed to update status', error);
            alert('Failed to update status');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
            </div>
        );
    }

    const stats = {
        total: registrations.length,
        approved: registrations.filter((r) => r.status === 'Approved').length,
        pending: registrations.filter((r) => r.status === 'Pending').length,
        rejected: registrations.filter((r) => r.status === 'Rejected').length,
    };

    return (
        <div className="max-w-6xl mx-auto">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                <ChevronLeft size={18} /> Back to Dashboard
            </Link>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{eventDetails?.title}</h1>
                <p className="text-gray-500 mt-1">Manage registrations and approve attendees</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Users size={18} className="text-indigo-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                            <div className="text-sm text-gray-500">Total</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <CheckCheck size={18} className="text-emerald-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-emerald-600">{stats.approved}</div>
                            <div className="text-sm text-gray-500">Approved</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                            <Clock size={18} className="text-amber-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                            <div className="text-sm text-gray-500">Pending</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                            <X size={18} className="text-red-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                            <div className="text-sm text-gray-500">Rejected</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Attendee
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Registered
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Ticket ID
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {registrations.map((reg) => (
                                <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-semibold text-gray-900">{reg.userName}</div>
                                            <div className="text-sm text-gray-500">{reg.userEmail}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {format(new Date(reg.createdAt), 'MMM d, yyyy')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${reg.status === 'Approved'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : reg.status === 'Rejected'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-amber-100 text-amber-700'
                                                }`}
                                        >
                                            {reg.status === 'Approved' && <CheckCircle size={12} />}
                                            {reg.status === 'Rejected' && <XCircle size={12} />}
                                            {reg.status === 'Pending' && <Clock size={12} />}
                                            {reg.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {reg.ticketId ? (
                                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">{reg.ticketId.slice(0, 8)}...</code>
                                        ) : (
                                            <span className="text-gray-300">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {reg.status === 'Pending' && (
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(reg._id, 'Approved')}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg font-medium text-sm hover:bg-emerald-100 transition-colors"
                                                >
                                                    <CheckCircle size={14} /> Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(reg._id, 'Rejected')}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors"
                                                >
                                                    <XCircle size={14} /> Reject
                                                </button>
                                            </div>
                                        )}
                                        {reg.status !== 'Pending' && (
                                            <button
                                                onClick={() => handleStatusUpdate(reg._id, 'Pending')}
                                                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                title="Reset to Pending"
                                            >
                                                <RefreshCw size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {registrations.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Users size={28} className="text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">No registrations yet</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageEvent;
