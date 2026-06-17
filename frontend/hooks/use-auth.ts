'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, []);

  return { isAuthenticated };
}