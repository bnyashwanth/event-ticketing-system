import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import ManageEvent from './pages/ManageEvent';
import EventRegistration from './pages/EventRegistration';
import Ticket from './pages/Ticket';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

// Layout Wrapper
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </main>
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Organizer Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/create-event" element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            } />
            <Route path="/event/:id/manage" element={
              <ProtectedRoute>
                <ManageEvent />
              </ProtectedRoute>
            } />

            {/* Public Routes */}
            <Route path="/event/:id" element={<EventRegistration />} />
            <Route path="/ticket/:ticketId" element={<Ticket />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
