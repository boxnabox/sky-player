import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/server-like';

export default function ProtectedRoute() {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace={true} />;
  }

  useEffect(() => {
    console.log('render: _protected route');
  }, []);

  return <Outlet />;
}
