import { useState, useEffect } from 'react';
import { DashboardData } from '../types/dashboard.types';
import { dashboardData } from '../data/dashboardData';

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(dashboardData);
    setIsLoading(false);
  }, []);

  return { data, isLoading };
}
