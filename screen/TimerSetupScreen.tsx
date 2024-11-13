import React, { FC, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import {
  type StackNavigationProp,
  type StackScreenProps,
} from "@react-navigation/stack";
import { observer } from "@legendapp/state/react";
import COLORS from "../constants/color";
import { type AppStackParamList } from "../types";
import TimerInput from "../components/TimerInput";
import store$ from "../store/store";

interface Props {
  navigation: StackNavigationProp<AppStackParamList, "SetNew">;
}

interface iPreTimer {
  time: string;
  // onPress: (fixedDuration?: number) => void;
  onPress: () => void;
}

const PreTimer: FC<iPreTimer> = ({ time, onPress }) => {
  return (
    <Pressable style={styles.preTimer} onPress={onPress}>
      <Text style={styles.preTimerText}>{time}</Text>
    </Pressable>
  );
};

const TimerSetupScreen: FC<Props> = ({ navigation }) => {
  const [hour, setHour] = useState<string>("");
  const [min, setMin] = useState<string>("");
  const [sec, setSec] = useState<string>("");
  const [label, setLabel] = useState<string>("");

  const labelCSS = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
  };

  function handleCancle() {
    setHour("");
    setMin("");
    setHour("");
    setLabel("");
    navigation.navigate("Home");
  }
  function handleAdd(fixedDuration?: number) {
    const duration =
      fixedDuration ||
      (parseInt(hour) || 0) * 3600 +
        (parseInt(min) || 0) * 60 +
        (parseInt(sec) || 0);

    store$.addTimer({ label, startTime: new Date(), duration });

    setHour("");
    setMin("");
    setHour("");
    setLabel("");

    navigation.navigate("Home");
  }

  return (
    <View style={styles.AndriodSafeArea}>
      <View style={styles.titleContainer}>
        <Pressable onPress={handleCancle}>
          <Text style={styles.topButtonText}>Cancel</Text>
        </Pressable>
        <Text style={styles.topTitleText}>Timer</Text>
        <Pressable onPress={() => handleAdd()}>
          <Text style={styles.topButtonText}>Start</Text>
        </Pressable>
      </View>
      <View style={styles.timerInputContainer}>
        <TimerInput
          title="hour"
          extraStyle={{ flex: 1 }}
          value={hour}
          setValue={setHour}
          keyboardType="numeric"
          numberOfLines={1}
          maxLength={2}
          placeholder="HH"
          autoFocus={true}
          textTextAlign="center"
        />
        <TimerInput
          title="min"
          extraStyle={{ flex: 1 }}
          value={min}
          setValue={setMin}
          keyboardType="numeric"
          numberOfLines={1}
          maxLength={2}
          placeholder="MM"
          autoFocus={false}
          textTextAlign="center"
        />
        <TimerInput
          title="sec"
          extraStyle={{ flex: 1 }}
          value={sec}
          setValue={setSec}
          keyboardType="numeric"
          numberOfLines={1}
          maxLength={2}
          placeholder="SS"
          autoFocus={false}
          textTextAlign="center"
        />
      </View>
      <TimerInput
        title="Label"
        extraStyle={labelCSS}
        value={label}
        setValue={setLabel}
        keyboardType="default"
        numberOfLines={1}
        maxLength={16}
        placeholder="label"
        autoFocus={false}
        textTextAlign="left"
      />
      <View style={styles.preTimerContainer}>
        <PreTimer time="00:10:00" onPress={() => handleAdd(600)} />
        <PreTimer time="00:15:00" onPress={() => handleAdd(900)} />
        <PreTimer time="00:30:00" onPress={() => handleAdd(1800)} />
      </View>
      <View style={styles.startButtonComponent}>
        <Pressable style={styles.startButton} onPress={() => handleAdd()}>
          <Text style={styles.startButtonText}>Start</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default observer(TimerSetupScreen);

const styles = StyleSheet.create({
  AndriodSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#000",
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 0,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topButtonText: {
    color: COLORS.appColor,
    fontSize: 16,
  },
  topTitleText: {
    color: COLORS.white,
    fontSize: 20,
  },
  timerInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 36,
  },
  preTimerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 36,
  },
  preTimer: {
    width: 100,
    backgroundColor: "#494a49",
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  preTimerText: {
    color: COLORS.appColor,
  },
  startButtonComponent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  startButton: {
    width: 120,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(0, 99, 204)",
    borderRadius: 24,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});
