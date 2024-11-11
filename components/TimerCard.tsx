import React, { FC, useMemo } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { type iStatus } from "../types";
import { Ionicons } from "@expo/vector-icons";
import useTimerCountdown from "../hooks/useTimerCountdown";

interface Props {
  label: string | undefined;
  endTime: Date;
  status: iStatus;
  duration: number;
  remainingTime?: number;
}

const TimerCard: FC<Props> = ({
  label,
  endTime,
  status,
  duration,
  remainingTime,
}) => {
  let iconName: "play" | "pause" | "checkmark" = "play";
  if (status === "paused") iconName = "pause";
  if (status === "completed") iconName = "checkmark";
  const timeLeft = useTimerCountdown(endTime, status, remainingTime);

  const formatedTime = useMemo(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  const totalDuration = useMemo(() => {
    if (duration < 60) return `${duration} sec`;
    else if (duration < 3600)
      return `${Math.floor(duration / 60)} min ${
        duration % 60 ? `${duration % 60} sec` : ""
      }`;
    else {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;

      return `${hours} hr ${minutes ? `${minutes} min` : ""} ${
        seconds ? `${seconds} sec` : ""
      }`;
    }
  }, [duration]);

  return (
    <View style={styles.container}>
      <View>
        {/* <Text>{endTime.toLocaleTimeString()}</Text> */}
        <Text>{formatedTime}</Text>
        <Text>{label ? label : totalDuration}</Text>
      </View>
      <Pressable>
        <Ionicons name={iconName} size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default TimerCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
