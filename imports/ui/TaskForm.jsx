import React from "react";
import { Meteor } from "meteor/meteor";

const TaskForm = () => {
  const [text, setText] = React.useState("");

  const handleSubmitTask = (e) => {
    e.preventDefault();

    if (!text) return;

    Meteor.call("tasks.insert", text);

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
