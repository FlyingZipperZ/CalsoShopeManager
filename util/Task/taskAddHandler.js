import { useState } from "react";
import { storeTask } from "../tasks";

const taskAddHandler = ({ taskData }) => {
  const [error, setError] = useState();

  async function confirmHandler(taskData) {
    // setIsSubmitting(true);
    try {
      const id = await storeTask(taskData);
      taskCtx.addTask({ ...taskData, id: id });
    } catch (error) {
      setError("Could not save Data try again later");
      // setIsSubmitting(false);
    }
  }

  confirmHandler(taskData);
};

export default taskAddHandler;
