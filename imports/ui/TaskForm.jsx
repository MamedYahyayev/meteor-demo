import React from "react";
import { TasksCollection } from "../api/tasks";

const TaskForm = ({ user }) => {
  const [text, setText] = React.useState("");

  const handleSubmitTask = (e) => {
    e.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date(),
      userId: user._id,
    });

    setText("");
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmitTask}>
      <input
        type="text"
        placeholder="Enter the task..."
        value={text}
        onChange={onTextChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
