import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  // Show a loading message while checking for a session
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is a session, show the page's content
  if (session) {
    return <Outlet />;
  }

  // If there is no session, redirect to the login page
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;