'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth';

export default function ProtectedRoute({ children, requiredRole }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is logged in
      if (!authService.isAuthenticated()) {
        router.push('/login');
        return;
      }

      // Check role if required
      if (requiredRole) {
        const user = authService.getUser();
        if (user?.role !== requiredRole && requiredRole !== 'all') {
          // If admin required but user is not admin
          if (requiredRole === 'admin' && user?.role !== 'admin') {
            router.push('/dashboard');
            return;
          }
          
          // If editor required but user is viewer
          if (requiredRole === 'editor' && user?.role === 'viewer') {
            router.push('/');
            return;
          }
        }
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  // Show nothing while redirecting
  if (!authService.isAuthenticated()) {
    return null;
  }

  // Check role access
  if (requiredRole && requiredRole !== 'all') {
    const user = authService.getUser();
    if (requiredRole === 'admin' && user?.role !== 'admin') {
      return null;
    }
    if (requiredRole === 'editor' && user?.role === 'viewer') {
      return null;
    }
  }

  return children;
}

// HOC for protected page
export function withProtection(WrappedComponent, options = {}) {
  return function ProtectedComponent(props) {
    return (
      <ProtectedRoute requiredRole={options.role}>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
}

