import { observable } from "@legendapp/state";
import { type Timer, type iStatus } from "../types";
import { timersFakeData } from "../assets/fakedata";
import { useState, useEffect } from "react";

interface Store {
  timers: Timer[];
  addTimer: (timer: Omit<Timer, "id" | "endTime" | "status">) => void;
  playPauseTimer: (id: number, status: iStatus) => void;
  timerCompleted: (id: number) => void;
  deleteTimer: (ids: number[]) => void;
  timerCountDown: (
    endTime: Date,
    status: iStatus,
    remainingTime?: number
  ) => { timeLeft: number; completedStatus: boolean };
}

// function addTimer(label: string, startTime: Date, duration: number) {
function addTimer(timer: Omit<Timer, "id" | "endTime" | "status">) {
  /**
     * Will take
        label - if provided else empty string,
        startTime - when started,
        duration - totoal duration of the time,
        as props.
        not sure what will be the value of 'endTime, remainingTime & pausedAt'
        Will generate id while creation.
     */
  const newTimer: Timer = {
    id: Date.now(),
    label: timer.label || "",
    startTime: timer.startTime,
    duration: timer.duration,
    endTime: new Date(Date.now() + timer.duration * 1000),
    status: "running",
  };
  store$.timers.push(newTimer);
}

function playPauseTimer(id: number, newStatus: iStatus) {
  /**
   * Can play pause or even declare the task as completed.
   * Will call this whenever the start or pause button is pressed, and will update pausedAt.
   * Will call again when the the timer will end and update the the staus as 'completed'
   */

  const now = new Date();
  store$.timers.set((prevTimers) => {
    return prevTimers.map((timer) => {
      if (timer.id !== id) return timer;

      // Handle different status transitions
      switch (newStatus) {
        case "paused": {
          // Calculate remaining time only if timer was running
          if (timer.status === "running") {
            const remainingMS = timer.endTime.getTime() - now.getTime();
            return {
              ...timer,
              status: "paused",
              remainingTime: Math.max(0, Math.floor(remainingMS / 1000)),
              pausedAt: now,
            };
          }
          return timer;
        }
        case "running": {
          // Resume from pause - calculate new end time based on remaining time
          if (timer.status === "paused" && timer.remainingTime) {
            return {
              ...timer,
              status: "running",
              endTime: new Date(now.getTime() + timer.remainingTime * 1000),
              pausedAt: undefined,
              remainingTime: undefined,
            };
          }
          if (timer.status === "completed") {
            return {
              ...timer,
              status: "running",
              endTime: new Date(now.getTime() + timer.duration * 1000),
              startTime: now,
            };
          }
          return timer;
        }
        default:
          return timer;
      }
      // If no valid transition found, return unchanged timer
      // console.warn(`Invalid timer transition: ${timer.status} -> ${newStatus}`);
    });
  });
}

function deleteTimer(ids: number[]) {
  // Will find the timer with just the id and will filter it out.
  // store$.timers.set((prev) => prev.filter((task) => !ids.includes(task.id)));

  const idSet = new Set(ids);
  store$.timers.set((prev) => prev.filter((task) => !idSet.has(task.id)));
}

function timerCompleted(id: number) {
  store$.timers.set((prev) => {
    return prev.map((task) => {
      return task.id === id ? { ...task, status: "completed" } : task;
    });
  });
}

function timerCountDown(
  endTime: Date,
  status: iStatus,
  remainingTime?: number
) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (status === "completed") {
      setTimeLeft(0);
      setIsCompleted(true);
      return;
    }

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
}

const store$ = observable<Store>({
  // timers: [],
  timers: timersFakeData,
  addTimer,
  playPauseTimer,
  deleteTimer,
  timerCompleted,
  timerCountDown,
});

export default store$;

//action,
