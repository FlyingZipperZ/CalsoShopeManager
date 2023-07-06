import { Alert, StyleSheet, View, Text, FlatList } from "react-native";
import ClockIO from "../../components/ClockIOComponents/ClockIO";
import { currentDate, currentTime } from "../../components/Date";
import { storeClock, fetchClock, updateClock } from "../../util/clock";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { ClockContext } from "../../store/clock-context";
import { UserContext } from "../../store/user-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "../../components/ui/LoadingOverlay";

const ClockIOScreen = () => {
  const [isFetching, setIsFetching] = useState(true);

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const clockCtx = useContext(ClockContext);

  useEffect(() => {
    async function getTime() {
      setIsFetching(true);
      try {
        const time = await fetchClock(authCtx.token);
        let clock = [];
        for (const element of time) {
          console.log(element);
          if (
            userCtx.user === element.user &&
            currentDate() === element.clockInDate
          ) {
            clock.push(element);
          }
        }
        clockCtx.setClockIn(clock);
        clockCtx.setClockOut(clock);
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    }

    getTime();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  async function clockIn() {
    try {
      const storedClockId = await AsyncStorage.getItem("clockId");
      const clockData = {
        user: userCtx.user,
        clockInDate: currentDate(),
        clockInTime: currentTime(),
        clockOutDate: "",
        clockOutTime: "",
      };

      if (storedClockId === null) {
        const id = await storeClock(clockData, authCtx.token);
        clockCtx.addClockIn({ ...clockData, id: id });
        clockCtx.addClockOut({ id: id });
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
    // clockCtx.clockOutHandler();
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
        clockCtx.updateClockOut(storedClockId, clockData);
        clockCtx.clockOutHandler();
      } else {
        Alert.alert("Already Clocked Out", "You are already clocked Out", [
          { text: "Okay" },
        ]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error", [{ text: "Okay" }]);
    }
  }

  const ClockItem = ({ clockTime }) => {
    // console.log(clockTime);
    if (clockTime === undefined) {
      return (
        <View style={styles.items}>
          <Text style={styles.title}> </Text>
        </View>
      );
    }
    return (
      <View style={styles.items}>
        <Text style={styles.title}>{clockTime}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.buttons}>
        <ClockIO onPress={clockIn}>Clock In</ClockIO>
        <ClockIO onPress={clockOut}>Clock Out</ClockIO>
      </View>
      <View style={styles.date}>
        <Text style={styles.title}>{currentDate()}</Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>Clocked In </Text>
        <Text style={styles.title}> Clocked Out</Text>
      </View>
      <View style={styles.excelContainer}>
        <View style={styles.excel}>
          <View style={styles.checkList}>
            <FlatList
              data={clockCtx.clockIn}
              renderItem={({ item }) => (
                <ClockItem clockTime={item.clockInTime} />
              )}
              keyExtractor={(item) => item.id}
              inverted={true}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.checkList}>
            <FlatList
              data={clockCtx.clockOut}
              renderItem={({ item }) => (
                <ClockItem clockTime={item.clockOutTime} />
              )}
              keyExtractor={(item) => item.id}
              inverted={true}
              scrollEnabled={false}
            />
          </View>
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
  text: {
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
    // paddingHorizontal: 50,
    marginTop: 10,
    backgroundColor: "#dfdfdf",
    // borderWidth: 1,
  },
  items: {
    // backgroundColor: "#f9c2ff",
    padding: 20,
    borderWidth: 1,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
});
