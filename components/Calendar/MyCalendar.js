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
import { UserContext } from "../../store/user-context";

const MyCalendar = () => {
  const tasksCtx = useContext(TaskContext);
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
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

  useEffect(() => {
    async function getTimeOff() {
      setIsFetching(true);
      try {
        const timeOff = await fetchTimeOff(authCtx.token);
        timeOffCtx.setTimeOff(timeOff);
        // console.log(timeOff);
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

  let daysOff = [];
  let newDaysObject = {};
  let oneDay = 86400000;

  for (const element of timeOffCtx.timeOff) {
    const start = [getDateTimeOff(element.start)];
    const end = [getDateTimeOff(element.end)];
    const user = [element.user];
    const reason = [element.reason];

    let startDate = new Date(start + "T24:00:00+0000");
    let startResult = startDate.getTime();

    // console.log(start);

    let endDate1 = new Date(end + "T00:00:00+0000");
    let endResult = endDate1.getTime();

    // daysOff.push(start);

    for (let i = endResult; i >= startResult; i = i - oneDay) {
      const middle = new Date(i);
      // const timeOffData = {
      //   user: user,
      //   reason: reason,
      //   start: middle,
      //   end: middle,
      // };

      daysOff.push(middle.toLocaleDateString("sv"));
      // timeOffCtx.addTimeOff({ ...timeOffData });
    }
    daysOff.push(end);
  }

  // console.log(daysOffStart);
  // console.log(daysOff);
  // console.log(daysOffEnd);

  const dayOffColor = "#ff0000";

  daysOff.forEach((day) => {
    newDaysObject[day] = {
      marked: true,
      dotColor: dayOffColor,
    };
  });

  let nextDay = [];

  for (const element of tasksCtx.tasks) {
    nextDay.push(getDateToDash(element.dueDate));
  }

  nextDay.forEach((day) => {
    newDaysObject[day] = {
      startingDay: true,
      endingDay: true,
      color: "#56c7ff",
      textColor: "black",
    };
  });

  Object.assign(newDaysObject, {
    [selected]: {
      startingDay: true,
      endingDay: true,
      color: "orange",
      textColor: "black",
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

  function renderTimeOff(itemData) {
    return (
      <View style={styles.timeOff}>
        <Text style={styles.timeOffText}>Time Off: {itemData.item.user}</Text>
      </View>
    );
  }

  function whatTheFuck(date) {
    if (date !== "") {
      const year = [date.split("/")[0]];
      const month = [date.split("/")[1]];
      const day = [date.split("/")[2]];
      return month + "/" + day + "/" + year;
    }
  }

  const displayedTimeOff = timeOffCtx.timeOff.filter((timeOffItem) => {
    let startDate = new Date(
      getDateTimeOff(timeOffItem.start) + "T24:00:00+0000"
    );
    let startResult = startDate.getTime();

    let endDate = new Date(getDateTimeOff(timeOffItem.end) + "T00:00:00+0000");
    let endResult = endDate.getTime();

    let selectedDate = new Date(selected + "T24:00:00+0000");
    let selectedResult = selectedDate.getTime();

    if (startResult <= selectedResult && selectedResult <= endResult) {
      return timeOffItem.user;
    }

    return (
      whatTheFuck(timeOffItem.start).indexOf(getDateFromSlash(selected)) >= 0 ||
      whatTheFuck(timeOffItem.end).indexOf(getDateFromSlash(selected)) >= 0
    );
  });

  return (
    <View style={styles.container}>
      <View>
        <Calendar
          current={_today}
          style={styles.calendar}
          onDayPress={onDayPress}
          headerStyle={null}
          markingType={"period"}
          markedDates={newDaysObject}
        />
      </View>
      <View>
        <FlatList
          data={displayedTimeOff}
          keyExtractor={(item) => item.id}
          renderItem={renderTimeOff}
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
  timeOff: {
    alignItems: "center",
    paddingTop: 12,
  },
  timeOffText: {
    fontSize: 16,
  },
});
