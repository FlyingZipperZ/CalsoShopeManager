import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const ClockIO = ({ children, onPress }) => {
  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.title}>{children}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ClockIO;

const styles = StyleSheet.create({
  mealItem: {
    marginVertical: 110,
    marginHorizontal: 30,
    borderRadius: 50,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "green",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 32,
    margin: 8,
  },
});
