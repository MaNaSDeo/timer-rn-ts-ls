import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import { observer } from "@legendapp/state/react";
import store$ from "../store/store";
import TimerList from "../components/TimerList";

const HomeScreen = () => {
  const timers = store$.timers.get();

  const running = timers.filter((task) => task.status === "running");
  const paused = timers.filter((task) => task.status === "paused");
  const completed = timers.filter((task) => task.status === "completed");

  return (
    <SafeAreaView style={styles.AndriodSafeArea}>
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
});
