import { FlatList } from "react-native";
import React from "react";

import TaskSummery from "../TaskOutput/TaskSummery";

function renderTaskItem(itemData) {
  return <TaskSummery {...itemData.item} />;
}

const TaskList = ({ tasks }) => {
  return (
    <FlatList
      data={tasks}
      renderItem={renderTaskItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TaskList;
