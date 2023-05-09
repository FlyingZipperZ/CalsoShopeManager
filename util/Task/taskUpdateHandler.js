import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { storeTask } from "../https";

const taskUpdateHandler = ({}) => {
  async function confirmHandler(taskData) {
    setIsSubmitting(true);
    try {
      const id = await storeTask(taskData);
      taskCtx.addTask({ ...taskData, id: id });
      navigation.goBack();
    } catch (error) {
      setError("Could not save Data try again later");
      setIsSubmitting(false);
    }
  }
  return (
    <View>
      <Text>taskUpdateHandler</Text>
    </View>
  );
};

export default taskUpdateHandler;

const styles = StyleSheet.create({});
