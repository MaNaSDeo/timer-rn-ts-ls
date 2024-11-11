import React from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { observer } from "@legendapp/state/react";
import store$ from "../store/store";

const HomeScreen = () => {
  const timers = store$.timers.get();

  return (
    <SafeAreaView style={styles.AndriodSafeArea}>
      <FlatList
        data={timers}
        renderItem={({ item }) => (
          <View>
            <Text>label: {item.label}</Text>
            <Text>duration: {item.duration}</Text>
            <Text>startTime: {item.startTime.toLocaleTimeString()}</Text>
            <Text>remainingTime: {item.remainingTime}</Text>
            <Text>status: {item.status}</Text>
            <Text>endTime: {item.endTime.toLocaleTimeString()}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default observer(HomeScreen);

const styles = StyleSheet.create({
  AndriodSafeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
