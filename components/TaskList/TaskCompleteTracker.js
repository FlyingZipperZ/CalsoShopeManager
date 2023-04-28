import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TaskCompleteTracker = ({ status }) => {
  return (
    <View style={styles.statusContainer}>
      <View
        style={
          status === "CNC" ||
          status === "Drilled" ||
          status === "Edge Banded" ||
          status === "Cleaned" ||
          status === "On Site" ||
          status === "Installed"
            ? styles.circleComplete
            : styles.circle
        }
      />
      <View
        style={
          status === "Drilled" ||
          status === "Edge Banded" ||
          status === "Cleaned" ||
          status === "On Site" ||
          status === "Installed"
            ? styles.circleComplete
            : styles.circle
        }
      />
      <View
        style={
          status === "Edge Banded" ||
          status === "Cleaned" ||
          status === "On Site" ||
          status === "Installed"
            ? styles.circleComplete
            : styles.circle
        }
      />
      <View
        style={
          status === "Cleaned" || status === "On Site" || status === "Installed"
            ? styles.circleComplete
            : styles.circle
        }
      />
      <View
        style={
          status === "On Site" || status === "Installed"
            ? styles.circleComplete
            : styles.circle
        }
      />
      <View
        style={status === "Installed" ? styles.circleComplete : styles.circle}
      />
    </View>
  );
};

export default TaskCompleteTracker;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    margin: 6,
    justifyContent: "center",
  },
  circle: {
    marginTop: 6,
    marginHorizontal: 10,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: "black",
  },
  circleComplete: {
    marginTop: 6,
    marginHorizontal: 10,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "green",
  },
});
