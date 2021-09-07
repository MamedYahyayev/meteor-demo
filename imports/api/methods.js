import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./tasks";

function checkUserAuthorized(userId) {
  if (!userId) {
    throw new Meteor.Error("Not authorized.");
  }
  return;
}

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);
    checkUserAuthorized(this.userId);

    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);
    checkUserAuthorized(this.userId);

    TasksCollection.remove(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    checkUserAuthorized(this.userId);

    TasksCollection.update(taskId, {
      $set: { isChecked },
    });
  },
});
