'use client';

import { useEffect } from 'react';
import { useClockStore } from '@/app/store/clockStore';
import { useNarrationStore } from '@/app/store/narrationStore';


export const useMatchClock = () => {
  const status = useClockStore((state) => state.status);
  const currentMinute = useClockStore((state) => state.currentMinute);
  const currentPeriod = useClockStore((state) => state.currentPeriod);
  const advanceMinute = useClockStore((state) => state.advanceMinute);
  const setPeriod = useClockStore((state) => state.setPeriod);
  const setStatus = useClockStore((state) => state.setStatus);
  const resetClock = useClockStore((state) => state.resetClock);

  const narrations = useNarrationStore((state) => state.narrations || []);

  const getLastMomentForPeriod = (period: number) => {
    const events = narrations.filter((n) => n.match_period_id === period);
    if (!events.length) return 0;
    return Math.max(...events.map((e) => e.moment));
  };

  const isEndOfGame = () => {
    const lastEventPeriod4 = narrations
      .filter(
        (n) =>
          n.match_period_id === 4 &&
          n.important_action &&
          n.important_action.toLowerCase().includes('fim de jogo')
      )
      .sort((a, b) => b.moment - a.moment)[0];

    return currentPeriod === 4 && currentMinute >= (lastEventPeriod4?.moment ?? 0);
  };

  useEffect(() => {
    if (status !== 'running') return;
    console.log('File: UseMatchClock', 'minute: ', currentMinute, 'period: ', currentPeriod )

    const interval = setInterval(() => {
      advanceMinute();
      console.log(currentPeriod)
  
      if (currentPeriod === 2) {
        const lastMomentPeriod2 = getLastMomentForPeriod(2);
        console.log(lastMomentPeriod2)
        if (currentMinute >= lastMomentPeriod2) {
          console.log('🏁 Fim do Primeiro Tempo. Iniciando o Segundo Tempo.');
          setPeriod(4); // Segundo Tempo
          setStatus('running');
          return;
        }
      }


      if (isEndOfGame()) {
        console.log('🏁 Fim de Jogo detectado. Parando o clock.');
        setStatus('finished');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status, currentMinute, currentPeriod, narrations]);
};
