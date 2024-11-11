export type Timer = {
  id: number;
  label?: string;
  startTime: Date; // When timer was first started
  endTime: Date; // Expected end time (will change when paused/resumed)
  duration: number; // Total duration in seconds
  remainingTime?: number; // Time left when paused
  status?: iStatus;
  pausedAt?: Date; // When was it paused last
};

/**
 id: number,
  label: string,
  startTime: Date,
  endTime: Date,
  duration: number,
  remainingTime: number,
  status: iStatus,
  pausedAt: Date
 */

export type iStatus = "running" | "paused" | "completed";

export type AppStackParamList = {
  Home: undefined;
  SetNew: undefined;
};
