import { useState, useCallback, useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, ScrollView } from "react-native";

import { Calendar } from "react-native-calendars";
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

  function getDateFromSlashToMill(date) {
    if (date !== "") {
      const year = [date.split("-")[0]];
      const month = [date.split("-")[1]];
      const day = [date.split("-")[2]];
      return year + "/" + month + "/" + day;
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

  useEffect(() => {
    async function getTimeOff() {
      setIsFetching(true);
      try {
        const timeOff = await fetchTimeOff(authCtx.token);
        timeOffCtx.setTimeOff(timeOff);
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }

    getTimeOff();
  }, []);

  function getDateTimeOff(date) {
    if (date !== "") {
      const year = [date.split("/")[0]];
      const month = [date.split("/")[1]];
      const day = [date.split("/")[2]];
      return year + "-" + month + "-" + day;
    }
  }

  let nextDayTimeOffStart = [];
  let nextDayTimeOffEnd = [];
  let dayInbetween = [];
  let newDaysObject = {};
  let oneDay = 86400000;

  for (const element of timeOffCtx.timeOff) {
    const start = [getDateTimeOff(element.start)];
    const end = [getDateTimeOff(element.end)];

    nextDayTimeOffStart.push(start);

    let startDate = new Date(start + "T24:00:00+0000");
    let startResult = startDate.getTime();

    let endDate1 = new Date(end + "T00:00:00+0000");
    let endResult = endDate1.getTime();

    for (let i = endResult; i >= startResult; i = i - oneDay) {
      const myDate = new Date(i);
      dayInbetween.push(myDate.toLocaleDateString("sv"));
    }
    nextDayTimeOffEnd.push(end);
  }

  nextDayTimeOffStart.forEach((day) => {
    newDaysObject[day] = {
      marked: true,
      dotColor: "red",
    };
  });

  dayInbetween.forEach((day) => {
    newDaysObject[day] = {
      marked: true,
      dotColor: "red",
    };
  });

  nextDayTimeOffEnd.forEach((day) => {
    newDaysObject[day] = {
      marked: true,
      dotColor: "red",
    };
  });

  let nextDay = [];

  for (const element of tasksCtx.tasks) {
    nextDay.push(getDateToDash(element.dueDate));
  }

  nextDay.forEach((day) => {
    newDaysObject[day] = {
      selected: true,
    };
  });

  Object.assign(newDaysObject, {
    [selected]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: "orange",
      selectedTextColor: "black",
    },
  });

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
          markingType={""}
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
