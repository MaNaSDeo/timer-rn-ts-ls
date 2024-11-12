import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { observer } from "@legendapp/state/react";
import store$ from "../store/store";
import TimerCard from "../components/TimerCard";

const HomeScreen = () => {
  const timers = store$.timers.get();

  return (
    <SafeAreaView style={styles.AndriodSafeArea}>
      <FlatList
        data={timers}
        renderItem={({ item }) => <TimerCard id={item.id} />}
        keyExtractor={(item) => item.id.toString()}
      />
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
