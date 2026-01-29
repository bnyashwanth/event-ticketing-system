import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar, PlusCircle, Ticket } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:shadow-indigo-300 transition-all duration-300">
                                <Ticket className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Ticketeer
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-indigo-50 transition-all duration-200"
                                >
                                    <Calendar size={18} />
                                    My Events
                                </Link>
                                <Link
                                    to="/create-event"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105"
                                >
                                    <PlusCircle size={18} />
                                    Create Event
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-lg hover:scale-105"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
