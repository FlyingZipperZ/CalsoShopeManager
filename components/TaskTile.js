import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import TaskCompleteTracker from "./TaskList/TaskCompleteTracker";

const TaskTile = ({ name, status, dueDate, onPress }) => {
  return (
    <View style={styles.item}>
      <Pressable
        android_ripple={{ color: "ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Job name: {name}</Text>
          <Text style={styles.text}>Status: {status}</Text>
          <Text style={styles.text}>Due Date: {dueDate}</Text>
          <TaskCompleteTracker status={status} />
        </View>
      </Pressable>
    </View>
  );
};

export default TaskTile;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 16,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    borderRadius: 16,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
