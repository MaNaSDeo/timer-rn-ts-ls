import { observable } from "@legendapp/state";
import { type Timer, type iStatus } from "../types";
import { timersFakeData } from "../assets/fakedata";

interface Store {
  timers: Timer[];
  addTimer: (timer: Omit<Timer, "id" | "endTime" | "status">) => void;
  editTimer: (timer: Timer) => void;
  playPauseTimer: (id: number, status: iStatus) => void;
  deleteTimer: (id: number) => void;
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
  store$.timers.set((prev) => {
    return prev.map((timer) => {
      let newRemainingTime = timer.remainingTime;
      let newPauseAt = timer.pausedAt;
      let newEndTime = timer.endTime;

      if (timer.id === id) {
        if (newStatus === "paused") {
          newRemainingTime = Math.floor(
            timer.endTime.getTime() - now.getTime()
          );
          newPauseAt = now;
        } else if (newStatus === "running" && timer.remainingTime) {
          newEndTime = new Date(now.getTime() + timer.remainingTime * 1000);
          newPauseAt = undefined;
        }

        return {
          ...timer,
          status: newStatus,
          remainingTime: newRemainingTime,
          pausedAt: newPauseAt,
          endTime: newEndTime,
        };
      } else return timer;
    });
  });
}
function deleteTimer(id: number) {
  // Will find the timer with just the id and will filter it out.
  store$.timers.set((prev) => prev.filter((task) => task.id !== id));
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

const store$ = observable<Store>({
  // timers: [],
  timers: timersFakeData,
  addTimer,
  editTimer,
  playPauseTimer,
  deleteTimer,
  getTimeRemaining,
});

export default store$;
