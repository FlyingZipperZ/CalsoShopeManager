import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ClockIO from "../components/ClockIOComponents/ClockIO";

const ClockIOScreen = () => {
  return (
    <View>
      <ClockIO>Clock In</ClockIO>
      <ClockIO>Clock out</ClockIO>
    </View>
  );
};

export default ClockIOScreen;

const styles = StyleSheet.create({});
