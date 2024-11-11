import { type Timer, type iStatus } from "../types";

const now = new Date();

export const timersFakeData: Timer[] = [
  {
    id: 11,
    label: "Workout",
    startTime: new Date(now.getTime() - 20 * 60 * 1000), // Started 20 minutes ago
    endTime: new Date(now.getTime() + 10 * 60 * 1000), // Ends in 10 minutes
    duration: 1800, // 30 minutes
    remainingTime: 600, // 10 minutes left when paused
    status: "paused" as iStatus,
    pausedAt: new Date(now.getTime() - 10 * 60 * 1000), // Paused 10 minutes ago
  },
  {
    id: 12,
    label: "Study",
    startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000), // Started 2 hours ago
    endTime: new Date(now.getTime() - 30 * 60 * 1000), // Ended 30 minutes ago
    duration: 7200, // 2 hours
    remainingTime: 0, // Completed
    status: "completed" as iStatus,
  },
  {
    id: 13,
    label: "Reading",
    startTime: new Date(now.getTime() - 30 * 60 * 1000), // Started 30 minutes ago
    endTime: new Date(now.getTime() + 5 * 60 * 1000), // Ends in 5 minutes
    duration: 1800, // 30 minutes
    remainingTime: 300, // 5 minutes left when paused
    status: "paused" as iStatus,
    pausedAt: new Date(now.getTime() - 5 * 60 * 1000), // Paused 5 minutes ago
  },
  {
    id: 14,
    // label: "Meditation",
    label: "",
    startTime: new Date(now.getTime() - 5 * 60 * 1000), // Started 5 minutes ago
    endTime: new Date(now.getTime() + 10 * 60 * 1000), // Ends in 10 minutes
    duration: 900, // 15 minutes
    status: "running" as iStatus,
  },
  {
    id: 15,
    label: "Break",
    startTime: new Date(now.getTime() - 30 * 60 * 1000), // Started 30 minutes ago
    endTime: new Date(now.getTime() - 20 * 60 * 1000), // Ended 20 minutes ago
    duration: 600, // 10 minutes
    remainingTime: 0, // No time left (completed)
    status: "completed" as iStatus,
  },

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
    label: "",
    startTime: new Date("2024-11-10T15:00:00"),
    endTime: new Date("2024-11-10T15:10:00"),
    // duration: 600, // 10 minutes
    duration: 14401,
    remainingTime: 0, // No time left (completed)
    status: "completed" as iStatus,
  },
];
