import { useState, useEffect } from 'react';
import { DashboardData } from '../types/dashboard.types';
import { getDashboardData } from '../data/dashboardData';

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setData(getDashboardData());
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
}