import { useState, useEffect } from "react";
import { type iStatus } from "../types";

const useTimerCountdown = (
  endTime: Date,
  status: iStatus,
  remainingTime?: number
) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (status === "completed") {
      setTimeLeft(0);
      return;
    }

    if (status === "paused") {
      setTimeLeft(remainingTime || 0);
    }

    // For running timer, calculate from endTime
    const updateTimeLeft = () => {
      const remaining = Math.floor((endTime.getTime() - Date.now()) / 1000);
      setTimeLeft(Math.max(0, remaining));
    };

    //Initial value
    updateTimeLeft();

    if (status === "running") {
      const interval = setInterval(updateTimeLeft, 1000);
      return () => clearInterval(interval);
    }
  }, [status, endTime, remainingTime]);
  return timeLeft;
};

export default useTimerCountdown;
