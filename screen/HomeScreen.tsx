import React, { FC } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Text,
  Pressable,
} from "react-native";
import { observer } from "@legendapp/state/react";
import store$ from "../store/store";
import TimerList from "../components/TimerList";
import { Ionicons } from "@expo/vector-icons";
import type { StackScreenProps } from "@react-navigation/stack";
import { type AppStackParamList } from "../types";

type Props = StackScreenProps<AppStackParamList, "Home">;

const HomeScreen: FC<Props> = ({ navigation }) => {
  const timers = store$.timers.get();

  const running = timers.filter((task) => task.status === "running");
  const paused = timers.filter((task) => task.status === "paused");
  const completed = timers.filter((task) => task.status === "completed");

  function handleEdit() {
    console.log("handleEdit Clicked");
  }
  function handleAdd() {
    navigation.navigate("SetNew");
  }

  return (
    <SafeAreaView style={styles.AndriodSafeArea}>
      <View style={styles.topButtonContainer}>
        <Pressable onPress={handleEdit}>
          <Text style={styles.topEditText}>Edit</Text>
        </Pressable>
        <Pressable style={styles.topAddButton} onPress={handleAdd}>
          <Ionicons name="add" size={20} color="#f5b84e" />
        </Pressable>
      </View>
      {running.length ? (
        <TimerList data={running} title="Timers" titleType="heading" />
      ) : (
        <></>
      )}
      {paused.length || completed.length ? (
        <TimerList
          data={[...paused, ...completed]}
          title="Recent"
          titleType="normal"
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default observer(HomeScreen);

const styles = StyleSheet.create({
  AndriodSafeArea: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  topEditText: {
    color: "#f5b84e",
    fontSize: 16,
  },
  topAddButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
