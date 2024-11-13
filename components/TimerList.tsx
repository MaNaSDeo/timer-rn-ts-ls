import React, { FC } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { type Timer } from "../types";
import TimerCard from "./TimerCard";

type TimerCardData = Pick<
  Timer,
  "id" | "label" | "duration" | "endTime" | "status" | "remainingTime"
>;
interface Props {
  data: TimerCardData[];
  title: string;
  titleType: "heading" | "normal";
  isEditable: boolean;
}

const TimerList: FC<Props> = ({ data, title, titleType, isEditable }) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.heading,
          titleType === "normal" ? styles.normalHeading : null,
        ]}
      >
        {title}
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TimerCard
            id={item.id}
            label={item.label}
            duration={item.duration}
            endTime={item.endTime}
            status={item.status}
            remainingTime={item.remainingTime || undefined}
            isEditable={isEditable}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TimerList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  heading: {
    color: "#fff",
    paddingHorizontal: 12,
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 0,
  },
  normalHeading: {
    fontSize: 18,
  },
});
