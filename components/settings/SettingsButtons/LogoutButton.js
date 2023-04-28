import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const LogoutButton = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.logOut}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderColor: "#c3c3c3",
    borderWidth: 0.5,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "#ffffff",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
    padding: 16,
  },
  logOut: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
