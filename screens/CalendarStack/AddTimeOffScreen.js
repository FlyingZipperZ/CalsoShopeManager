import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TimeOffForm from "../../components/Calendar/TimeOffForm";

const AddTimeOffScreen = ({ navigation }) => {
  return (
    <View>
      <TimeOffForm onCancel={() => navigation.goBack()} />
    </View>
  );
};

export default AddTimeOffScreen;

const styles = StyleSheet.create({});
