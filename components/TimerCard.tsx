import React, { FC, useEffect, useMemo, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { type iStatus } from "../types";
import { Ionicons } from "@expo/vector-icons";
import useTimerCountdown from "../hooks/useTimerCountdown";
import { observer } from "@legendapp/state/react";
import store$ from "../store/store";

interface Props {
  id: number;
  label: string | undefined;
  endTime: Date;
  status: iStatus;
  duration: number;
  remainingTime?: number;
}

const TimerCard: FC<Props> = ({
  id,
  label,
  endTime,
  status,
  duration,
  remainingTime,
}) => {
  const [iconName, setIconName] = useState<"play" | "pause" | "checkmark">(
    "play"
  );
  const { timeLeft, completedStatus } = useTimerCountdown(
    endTime,
    status,
    remainingTime
  );
  const currentStatus = store$.timers
    .peek()
    .find((task) => task.id === id)?.status;

  useEffect(() => {
    if (!currentStatus) return;

    switch (currentStatus) {
      case "paused":
        setIconName("play");
        break;
      case "running":
        setIconName("pause");
        break;
      case "completed":
        setIconName("checkmark");
        break;
    }
  }, [status, id, completedStatus]);

  useEffect(() => {
    if (completedStatus) store$.timerCompleted(id);
  }, [completedStatus]);

  const formatedTime = useMemo(() => {
    const time = status === "completed" ? duration : timeLeft;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    if (hours) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  }, [timeLeft, status]);

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

  function handlePlayPause() {
    if (!currentStatus) return;

    const newStatus: iStatus =
      currentStatus === "running" ? "paused" : "running";

    store$.playPauseTimer(id, newStatus);
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatedTime}</Text>
        <Text style={styles.labelDuration}>
          {label ? label : totalDuration}
        </Text>
      </View>
      <Pressable
        style={[
          styles.button,
          iconName === "checkmark" ? styles.completedBtn : null,
        ]}
        onPress={handlePlayPause}
      >
        <Ionicons
          name={iconName}
          size={30}
          color={iconName === "checkmark" ? "#02fa07" : "#f5b84e"}
        />
      </Pressable>
    </View>
  );
};

export default observer(TimerCard);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 92,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderColor: "#1a1919",
    backgroundColor: "#000",
  },
  timerContainer: {
    flex: 1,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "300",
    color: "#fff",
    marginBottom: 0,
  },
  labelDuration: {
    fontWeight: "bold",
    color: "#fff",
    marginTop: 0,
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 30,
    borderColor: "#f5b84e",
  },
  completedBtn: {
    backgroundColor: "#065207",
    borderColor: "#000",
  },
});
