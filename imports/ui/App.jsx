import React from "react";
import Task from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/tasks";
import TaskForm from "./TaskForm.jsx";

export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  return (
    <>
      <TaskForm />

      <div style={{ margin: "2em 0" }}>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </>
  );
};
