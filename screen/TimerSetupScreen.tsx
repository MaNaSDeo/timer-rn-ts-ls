import React, { FC, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";
import {
  type StackNavigationProp,
  type StackScreenProps,
} from "@react-navigation/stack";
import COLORS from "../constants/color";
import { type AppStackParamList } from "../types";

interface Props {
  navigation: StackNavigationProp<AppStackParamList, "SetNew">;
}

const TimerSetupScreen: FC<Props> = ({ navigation }) => {
  const [hour, setHour] = useState<string>("");
  const [min, setMin] = useState<string>("");
  const [sec, setSec] = useState<string>("");

  function handleCancle() {
    console.log("handleCancle");
    navigation.navigate("Home");
  }
  function handleAdd() {
    console.log("handleAdd");
    navigation.navigate("Home");
  }

  return (
    <View style={styles.AndriodSafeArea}>
      <View style={styles.titleContainer}>
        <Pressable onPress={handleCancle}>
          <Text style={styles.topButtonText}>Cancel</Text>
        </Pressable>
        <Text style={styles.topTitleText}>Timer</Text>
        <Pressable onPress={handleAdd}>
          <Text style={styles.topButtonText}>Start</Text>
        </Pressable>
      </View>
      <View>
        <View>
          <Text>hour</Text>
          <TextInput />
        </View>
        <View>
          <Text>min</Text>
          <TextInput />
        </View>
        <View>
          <Text>sec</Text>
          <TextInput />
        </View>
      </View>
      <View>
        <Text>Label</Text>
        <TextInput />
      </View>
      <View>
        <View>
          <Text>00:10:00</Text>
        </View>
        <View>
          <Text>00:15:00</Text>
        </View>
        <View>
          <Text>00:30:00</Text>
        </View>
      </View>
      <View></View>
      <View></View>
    </View>
  );
};

export default TimerSetupScreen;

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
});
