'use client';

import { useEffect } from 'react';
import { useClockStore } from '@/app/store/clockStore';

export const useMatchClock = () => {
  const status = useClockStore((state) => state.status);
  const advanceMinute = useClockStore((state) => state.advanceMinute);

  useEffect(() => {
    if (status !== 'running') return;

    const interval = setInterval(() => {
      advanceMinute();
    }, 1000);

    return () => clearInterval(interval);
  }, [status, advanceMinute]);
};
