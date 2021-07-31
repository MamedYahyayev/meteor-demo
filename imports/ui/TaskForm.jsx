import React from "react";
import { TasksCollection } from "../api/tasks";

const TaskForm = () => {
  const [text, setText] = React.useState("");

  const handleSubmitTask = (e) => {
    e.preventDefault();

    TasksCollection.insert({
      text,
      createdAt: new Date(),
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
      <button type="submit" style={{ padding: ".4em 3em", marginLeft: "1em" }}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
