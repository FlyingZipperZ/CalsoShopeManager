import { StyleSheet, FlatList } from "react-native";
import TaskTile from "../../components/TaskTile";
import { TASKS } from "../../data/testData";

const CalendarTasks = ({ navigation }) => {
  function renderTaskItem(itemData) {
    function pressHandler() {
      navigation.navigate("CalendarOverviewScreen", {
        taskId: itemData.item.id,
      });
    }

    return (
      <TaskTile
        name="test"
        status="test"
        dueDate="test"
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={TASKS}
      keyExtractor={(item) => item.id}
      renderItem={renderTaskItem}
    />
  );
};

export default CalendarTasks;

const styles = StyleSheet.create({});
