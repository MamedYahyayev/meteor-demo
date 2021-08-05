import React from "react";
import Task from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/tasks";
import TaskForm from "./TaskForm.jsx";

export const App = () => {
  const [hideCompleted, setHideCompleted] = React.useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };

  // delete task
  const onDeleteTask = ({ _id }) => {
    TasksCollection.remove(_id);
  };

  // show how many have tasks
  const pendingTasksCount = useTracker(() => {
    return TasksCollection.find(hideCompletedFilter).count();
  });

  const pendingTasksTitle =
    pendingTasksCount === 0 ? "" : `( ${pendingTasksCount} )`;

  return (
    <div className="app">
      <header>
        <div className="app-header">
          <div className="app-bar">
            <h1>Todo List {pendingTasksTitle}</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm />

        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? "Show All" : "Hide Completed"}
          </button>
        </div>

        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={onDeleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
