import { useState, useCallback, useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ScrollView } from "react-native";

import { Calendar } from "react-native-calendars";
import { TASKS } from "../../data/testData";
import moment from "moment";
import TaskTile from "../TaskTile";

const _format = "YYYY-MM-DD";
const _today = moment().format(_format);

import { useNavigation } from "@react-navigation/native";
import { TaskContext } from "../../store/task-context";
import { fetchTimeOff } from "../../util/timeoff";
import { TimeOffContext } from "../../store/timeoff-context";
import { AuthContext } from "../../store/auth-context";

const MyCalendar = () => {
  const tasksCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);
  const timeOffCtx = useContext(TimeOffContext);

  const navigation = useNavigation();

  const INITIAL_DATE = _today;

  const [selected, setSelected] = useState(INITIAL_DATE);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  function getDateFromSlash(date) {
    if (date !== "") {
      const year = [date.split("-")[0]];
      const month = [date.split("-")[1]];
      const day = [date.split("-")[2]];
      return month + "/" + day + "/" + year;
    }
  }

  function getDateToDash(date) {
    if (date !== "") {
      const month = [date.split("/")[0]];
      const day = [date.split("/")[1]];
      const year = [date.split("/")[2]];
      return year + "-" + month + "-" + day;
    }
  }

  var nextDay = [];

  for (const element of tasksCtx.tasks) {
    nextDay.push(getDateToDash(element.dueDate));
  }

  let newDaysObject = {};

  nextDay.forEach((day) => {
    newDaysObject[day] = {
      marked: true,
    };
  });

  Object.assign(newDaysObject, {
    [selected]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: "orange",
      selectedTextColor: "red",
    },
  });

  useEffect(() => {
    async function getTimeOff() {
      setIsFetching(true);
      try {
        const timeOff = await fetchTimeOff(authCtx.token);
        console.log(timeOff);
        timeOffCtx.setTimeOff(timeOff);
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }

    getTimeOff();
  }, []);

  console.log(timeOffCtx.timeOff);

  const onDayPress = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  function renderTaskItem(itemData) {
    function pressHandler() {
      navigation.navigate("CalendarOverviewScreen", {
        taskId: itemData.item.id,
      });
    }

    return (
      <TaskTile
        name={itemData.item.name}
        status={itemData.item.status}
        dueDate={itemData.item.dueDate}
        onPress={pressHandler}
      />
    );
  }

  const displayedTasks = tasksCtx.tasks.filter((taskItem) => {
    return taskItem.dueDate.indexOf(getDateFromSlash(selected)) >= 0;
  });

  return (
    <View style={styles.container}>
      <View>
        <Calendar
          current={_today}
          style={styles.calendar}
          onDayPress={onDayPress}
          markedDates={newDaysObject}
          headerStyle={null}
        />
      </View>
      <View style={styles.taskContainer}>
        <FlatList
          data={displayedTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTaskItem}
        />
      </View>
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    borderWidth: 1,
    borderColor: "#b6c1cd",
  },
  taskContainer: {
    flex: 1,
  },
});
