import React from "react";
import Task from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/tasks";

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}).fetch());

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};
