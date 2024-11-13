import React, { FC } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import COLORS from "../constants/color";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  title: string;
  extraStyle: any;
  value: string;
  setValue: (value: string) => void;
  keyboardType: KeyboardTypeOptions;
  numberOfLines: number;
  maxLength: number;
  placeholder: string;
  autoFocus: boolean;
  textTextAlign: "auto" | "left" | "right" | "center" | "justify" | undefined;
}
const TimerInput: FC<Props> = ({
  title,
  extraStyle,
  value,
  setValue,
  keyboardType,
  numberOfLines,
  maxLength,
  placeholder,
  autoFocus,
  textTextAlign,
}) => {
  return (
    // <View style={styles.container}>
    <LinearGradient
      colors={["#000", "#494a49", "#000"]}
      style={[styles.container, extraStyle]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <Text style={[styles.titleText, { textAlign: textTextAlign }]}>
        {title}
      </Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.inputBox}
        placeholder={placeholder}
        placeholderTextColor="#dcdcdc"
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        autoFocus={autoFocus}
      />
    </LinearGradient>
    // </View>
  );
};

export default TimerInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#494a49",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    margin: 8,
    height: 80,
  },
  titleText: {
    color: COLORS.appColor,
    textAlign: "center",
    fontSize: 20,
    width: 100,
  },
  inputBox: {
    paddingTop: 8,
    color: "#dcdcdc",
    textAlign: "center",
    fontSize: 20,
    // height: 28,
    paddingBottom: 0,
    borderBottomColor: "#494a49",
    borderBottomWidth: 1,
    flex: 1,
  },
});
