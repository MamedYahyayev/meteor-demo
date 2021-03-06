import React from "react";
import Task from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../api/tasks";
import TaskForm from "./TaskForm.jsx";
import { Meteor } from "meteor/meteor";
import LoginForm from "./LoginForm.jsx";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = React.useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };

    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) return { ...noDataAvailable, isLoading: true };

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const pendingTasksTitle =
    pendingTasksCount === 0 ? "" : `( ${pendingTasksCount} )`;

  const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call("tasks.setIsChecked", _id, !isChecked);
  };

  // delete task
  const onDeleteTask = ({ _id }) => {
    Meteor.call("tasks.remove", _id);
  };

  const logout = () => Meteor.logout();

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
        {user ? (
          <>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>
            <TaskForm user={user} />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

            {isLoading && <div className="loading">loading...</div>}

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
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
