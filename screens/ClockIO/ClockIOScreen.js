import { Alert, StyleSheet, View, Text, FlatList } from "react-native";
import ClockIO from "../../components/ClockIOComponents/ClockIO";
import { currentDate, currentTime, getNow } from "../../components/Date";
import { storeClock, fetchClock, updateClock } from "../../util/clock";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { ClockContext } from "../../store/clock-context";
import { UserContext } from "../../store/user-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClockIOScreen = () => {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const clockCtx = useContext(ClockContext);

  const clockData = {
    user: userCtx.user,
    clockInDate: currentDate(),
    clockInTime: currentTime(),
    clockOutDate: "",
    clockOutTime: "",
  };

  async function clockIn() {
    try {
      const storedClockId = await AsyncStorage.getItem("clockId");

      if (storedClockId === null) {
        const id = await storeClock(clockData, authCtx.token);
        clockCtx.clockInHandler(id);
      } else {
        Alert.alert("Already Clocked In", "You are already clocked In", [
          { text: "Okay" },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function clockOut() {
    try {
      const storedClockId = await AsyncStorage.getItem("clockId");

      if (storedClockId !== null) {
        const clockIO = (await fetchClock(authCtx.token)).find(
          (userClock) => userClock.id === storedClockId
        );

        const clockData = {
          user: userCtx.user,
          clockInDate: clockIO.clockInDate,
          clockInTime: clockIO.clockInTime,
          clockOutDate: currentDate(),
          clockOutTime: currentTime(),
        };
        await updateClock(storedClockId, clockData, authCtx.token);
        clockCtx.clockOutHandler();
      } else {
        Alert.alert("Already Clocked Out", "You are already clocked Out", [
          { text: "Okay" },
        ]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Already Clocked Out", "You are already clocked Out", [
        { text: "Okay" },
      ]);
    }
  }

  async function getClockTime() {
    let time = [];
    const times = await fetchClock(authCtx.token);
    time = times;
    // console.log(time);
    return time;
  }

  console.log(getClockTime());

  const ClockInItem = ({ clockInTime }) => (
    <View style={styles.items}>
      <Text style={styles.title}>{clockInTime}</Text>
    </View>
  );

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

const styles = StyleSheet.create({
  buttons: {
    justifyContent: "center",
    flexDirection: "row",
  },
  date: {
    alignItems: "center",
  },
  excelContainer: {
    alignItems: "center",
  },
  excel: {
    flexDirection: "row",
  },
  checkList: {
    paddingHorizontal: 50,
    marginTop: 10,
    backgroundColor: "#dfdfdf",
    borderWidth: 1,
  },
  items: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
