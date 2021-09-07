import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/tasks";
import { Accounts } from "meteor/accounts-base";
import "/imports/api/methods";
import "/imports/api/publication";

function insertTasks(name, user) {
  TasksCollection.insert({
    text: name,
    userId: user._id,
    createdAt: new Date(),
  });
}

const DEMO_USERNAME = "demo";
const DEMO_PASSWORD = "12345"; 

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(DEMO_USERNAME)) {
    Accounts.createUser({
      username: DEMO_USERNAME,
      password: DEMO_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(DEMO_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((task) => insertTasks(task, user));
  }
});
