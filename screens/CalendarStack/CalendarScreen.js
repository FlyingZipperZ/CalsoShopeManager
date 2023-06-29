import { StyleSheet, View, Text, FlatList } from "react-native";
import MyCalendar from "../../components/Calendar/MyCalendar";

const CalendarScreen = () => {
  return (
    <View style={styles.calendarContainer}>
      <MyCalendar />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
});
