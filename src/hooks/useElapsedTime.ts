import { useState, useEffect, useRef } from 'react';

export interface ElapsedTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export function useElapsedTime(startDate: string | null): ElapsedTime {
  const [elapsed, setElapsed] = useState<ElapsedTime>(
    startDate
      ? calculateElapsed(startDate)
      : { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 },
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!startDate) return;

    setElapsed(calculateElapsed(startDate));

    intervalRef.current = setInterval(() => {
      setElapsed(calculateElapsed(startDate));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startDate]);

  return elapsed;
}

function calculateElapsed(startDate: string): ElapsedTime {
  const now = Date.now();
  const start = new Date(startDate).getTime();
  const totalSeconds = Math.max(0, Math.floor((now - start) / 1000));

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, totalSeconds };
}
