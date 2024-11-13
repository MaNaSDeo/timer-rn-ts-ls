import React, {
  FC,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { type iStatus } from "../types";
import { Ionicons } from "@expo/vector-icons";
import useTimerCountdown from "../hooks/useTimerCountdown";
import { observer } from "@legendapp/state/react";
import store$ from "../store/store";
import COLORS from "../constants/color";

interface Props {
  id: number;
  label: string | undefined;
  endTime: Date;
  status: iStatus;
  duration: number;
  remainingTime?: number;
  isEditable: boolean;
  // setSelectedIds: (ids: number[]) => void;
  setSelectedIds: Dispatch<SetStateAction<number[]>>;
}

const TimerCard: FC<Props> = ({
  id,
  label,
  endTime,
  status,
  duration,
  remainingTime,
  isEditable,
  setSelectedIds,
}) => {
  const [iconName, setIconName] = useState<"play" | "pause">("play");
  const [isSelected, setIsSlected] = useState<boolean>(false);
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
        setIconName("play");
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

    // const newStatus: iStatus =
    //   currentStatus === "running" ? "paused" : "running";

    const newStatus: iStatus =
      currentStatus === "paused" || currentStatus === "completed"
        ? "running"
        : "paused";

    store$.playPauseTimer(id, newStatus);
  }

  function handleEdit() {
    setIsSlected((prev) => !prev);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    <View style={styles.container}>
      {isEditable ? (
        <View style={styles.editBtnContainer}>
          <Pressable
            style={[
              styles.editButton,
              isSelected ? null : styles.selectedEditButton,
            ]}
            onPress={handleEdit}
          >
            <Ionicons name="remove" color={"white"} size={16} />
          </Pressable>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatedTime}</Text>
        <Text style={styles.labelDuration}>
          {label ? label : totalDuration}
        </Text>
      </View>
      <Pressable
        style={[
          styles.button,
          status === "completed" ? styles.completedBtn : null,
        ]}
        onPress={handlePlayPause}
      >
        <Ionicons
          name={iconName}
          size={30}
          color={status === "completed" ? "#02fa07" : "#f5b84e"}
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
    borderWidth: 0,
    backgroundColor: "#065207",
    borderColor: "#000",
  },
  editBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "red",
    width: 20,
    aspectRatio: 1 / 1,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  selectedEditButton: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.white,
    borderWidth: 1,
  },
});
