import React, { useEffect, useState } from 'react';

import {
  calculateRemainingFlightTimeInSeconds,
  fancyTimeFormat,
} from '../../utils/utils';

type TimerProps = {
  startDate: Date;
  endDate: Date;
  onCrashing: () => void;
};

const Timer = ({ startDate, endDate, onCrashing }: TimerProps) => {
  const [time, setTime] = useState(Date.now());
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (remainingTimeInSeconds >= 0) {
      setRemainingTimeInSeconds(
        calculateRemainingFlightTimeInSeconds(startDate, endDate),
      );
    }

    if (remainingTimeInSeconds <= 0 && remainingTimeInSeconds !== null) {
      onCrashing();
    }
  }, [time]);

  return <div>{`Time remaining: ${fancyTimeFormat(remainingTimeInSeconds)}`}</div>;
};

export default Timer;
