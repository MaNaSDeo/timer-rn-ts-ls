import { type Timer, type iStatus } from "../types";

export const timersFakeData: Timer[] = [
  {
    id: 1,
    label: "Workout",
    startTime: new Date("2024-11-10T08:00:00"),
    endTime: new Date("2024-11-10T08:30:00"),
    duration: 1800, // 30 minutes
    remainingTime: 600, // 10 minutes left when paused
    status: "paused" as iStatus,
    pausedAt: new Date("2024-11-10T08:20:00"),
  },
  {
    id: 2,
    label: "Study",
    startTime: new Date("2024-11-10T10:00:00"),
    endTime: new Date("2024-11-10T12:00:00"),
    duration: 7200, // 2 hours
    remainingTime: 0, // Completed
    status: "completed" as iStatus,
  },
  {
    id: 3,
    label: "Reading",
    startTime: new Date("2024-11-10T13:00:00"),
    endTime: new Date("2024-11-10T13:30:00"),
    duration: 1800, // 30 minutes
    remainingTime: 300, // 5 minutes left when paused
    status: "paused" as iStatus,
    pausedAt: new Date("2024-11-10T13:25:00"),
  },
  {
    id: 4,
    label: "Meditation",
    startTime: new Date("2024-11-10T14:00:00"),
    endTime: new Date("2024-11-10T14:15:00"),
    duration: 900, // 15 minutes
    status: "running" as iStatus,
  },
  {
    id: 5,
    label: "Break",
    startTime: new Date("2024-11-10T15:00:00"),
    endTime: new Date("2024-11-10T15:10:00"),
    duration: 600, // 10 minutes
    remainingTime: 0, // No time left (completed)
    status: "completed" as iStatus,
  },
];
