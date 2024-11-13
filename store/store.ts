import { observable } from "@legendapp/state";
import { type Timer, type iStatus } from "../types";
import { timersFakeData } from "../assets/fakedata";

interface Store {
  timers: Timer[];
  addTimer: (timer: Omit<Timer, "id" | "endTime" | "status">) => void;
  editTimer: (timer: Timer) => void;
  playPauseTimer: (id: number, status: iStatus) => void;
  timerCompleted: (id: number) => void;
  deleteTimer: (ids: number[]) => void;
  getTimeRemaining: (id: number) => number;
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

function editTimer(updatedTimer: Timer) {
  /**
   * Will pass everything in the timer data, with updating the edited data/
   */
  // const index = store$.timers.peek().findIndex((t) => t.id === updatedTimer.id);
  // if (index !== -1) {
  // }
  store$.timers.set((prev) => {
    return prev.map((timer) => {
      if (timer.id === updatedTimer.id) {
        return updatedTimer;
      }
      return timer;
    });
  });
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

function getTimeRemaining(id: number): number {
  const timer: Timer | undefined = store$.timers
    .peek()
    .find((t) => t.id === id);
  if (!timer) return 0;
  if (timer.status === "completed") return 0;
  if (timer.status === "paused") return timer.remainingTime || 0;

  const remaining = Math.floor((timer.endTime.getTime() - Date.now()) / 1000);
  return Math.max(0, remaining);
}

function timerCompleted(id: number) {
  store$.timers.set((prev) => {
    return prev.map((task) => {
      return task.id === id ? { ...task, status: "completed" } : task;
    });
  });
}

const store$ = observable<Store>({
  // timers: [],
  timers: timersFakeData,
  addTimer,
  editTimer,
  playPauseTimer,
  deleteTimer,
  getTimeRemaining,
  timerCompleted,
});

export default store$;
