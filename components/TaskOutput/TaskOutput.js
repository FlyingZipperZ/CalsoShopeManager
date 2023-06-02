import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import TaskListOverView from "../../screens/TaskStack/TaskListOverView";

const TaskOutput = ({ tasks, fallBackText }) => {
  let content = <Text>{fallBackText}</Text>;

  // console.log(tasks);

  if (tasks.length > 0) {
    content = <TaskListOverView tasks={tasks} />;
  }

  return (
    <View
      style={[tasks.length === 0 ? styles.contentContainer : "", { flex: 1 }]}
    >
      {content}
    </View>
  );
};

export default TaskOutput;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
