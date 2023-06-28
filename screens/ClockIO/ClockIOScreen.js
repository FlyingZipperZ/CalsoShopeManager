import { StyleSheet, Text, View } from "react-native";
import ClockIO from "../../components/ClockIOComponents/ClockIO";
import { currentDate, currentTime, getNow } from "../../components/Date";
import { storeClock, fetchClock, updateClock } from "../../util/clock";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { ClockContext } from "../../store/clock-context";
import { UserContext } from "../../store/user-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClockIOScreen = () => {
  function clockIn() {
    console.log("Clock in");
  }

  function clockOut() {
    console.log("Clock out");
  }

  return (
    <>
      <View style={styles.buttons}>
        <ClockIO onPress={clockIn}>Clock In</ClockIO>
        <ClockIO onPress={clockOut}>Clock Out</ClockIO>
      </View>
      <View style={styles.date}>
        <Text>{currentDate()}</Text>
      </View>
      <View style={styles.buttons}>
        <Text>Clocked In </Text>
        <Text> Clocked Out</Text>
      </View>
      <View style={styles.excelContainer}>
        <View style={styles.excel}>
          <View style={styles.checkList}>
            {/* <FlatList
              data={getClockTime()}
              keyExtractor={({ clock }) => clock.id}
              renderItem={({ item }) => <ClockInItem clockInTime={item.user} />}
            /> */}
          </View>
          <View style={styles.checkList}></View>
        </View>
      </View>
    </>
  );
};

export default ClockIOScreen;

const styles = StyleSheet.create({});
