import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TaskCompleteTracker from "../TaskList/TaskCompleteTracker";

const TaskSummery = ({ name, status, dueDate }) => {
  console.log(name);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Job name: {name}</Text>
        <Text style={styles.text}>Status: {status}</Text>
        <Text style={styles.text}>Due Date: {dueDate}</Text>
        <TaskCompleteTracker status={status} />
      </View>
    </View>
  );
};

export default TaskSummery;

const styles = StyleSheet.create({
  outerContainer: {},
  innerContainer: {
    flex: 1,
    margin: 16,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    backgroundColor: "#ccc",
    borderWidth: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
