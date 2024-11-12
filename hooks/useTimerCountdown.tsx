import { useState, useEffect } from "react";
import { type iStatus } from "../types";

const useTimerCountdown = (
  endTime: Date,
  status: iStatus,
  remainingTime?: number
) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Handle completed state
    if (status === "completed") {
      setTimeLeft(0);
      setIsCompleted(true);
      return;
    }

    // Handle paused state
    if (status === "paused") {
      setTimeLeft(remainingTime || 0);
      setIsCompleted(false);
      return;
    }

    // For running timer, calculate from endTime
    const updateTimeLeft = () => {
      const remaining = Math.floor((endTime.getTime() - Date.now()) / 1000);
      const newTimeLeft = Math.max(0, remaining);
      setTimeLeft(newTimeLeft);
      if (remaining <= 0) setIsCompleted(true);
    };

    //Initial value
    updateTimeLeft();

    if (status === "running") {
      const interval = setInterval(updateTimeLeft, 1000);
      return () => clearInterval(interval);
    }
  }, [status, endTime, remainingTime]);
  return { timeLeft, completedStatus: isCompleted };
};

export default useTimerCountdown;

//Flashlist
