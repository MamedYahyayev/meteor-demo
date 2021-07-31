import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/tasks";

function insertTasks({ name }) {
  TasksCollection.insert({ name, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    insertTasks({
      name: "Task One",
    });

    insertTasks({
      name: "Task Two",
    });

    insertTasks({
      name: "Task Three",
    });

    insertTasks({
      name: "Task Four",
    });
  }
});
