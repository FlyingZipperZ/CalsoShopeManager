import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ClockIO from "../../components/ClockIOComponents/ClockIO";

const ClockIOScreen = () => {
  function clockIn() {
    console.log("Clock in");
  }

  function clockOut() {
    console.log("Clock out");
  }

  return (
    <View>
      <ClockIO onPress={clockIn}>Clock In</ClockIO>
      <ClockIO onPress={clockOut}>Clock out</ClockIO>
    </View>
  );
};

export default ClockIOScreen;

const styles = StyleSheet.create({});
