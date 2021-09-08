import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/tasks";
import { Random } from "meteor/random";
import { mockMethodCall } from "meteor/quave:testing";
import { assert } from "chai";
import "/imports/api/methods";

if (Meteor.isServer) {
  describe("Tasks", () => {
    describe("methods", () => {
      const userId = Random.id(5);
      let taskId;

      beforeEach(() => {
        TasksCollection.remove({});
        taskId = TasksCollection.insert({
          text: "Demo text",
          createdAt: new Date(),
          userId,
        });
      });

      it("can delete user task", () => {
        mockMethodCall("tasks.remove", taskId, { context: { userId } });

        assert.equal(TasksCollection.find().count(), 0);
      });

      it("must throw unauthorized exception", () => {
        const fn = () => mockMethodCall("tasks.remove", taskId);
        assert.throw(fn, "Not authorized");
      });

      it("can add new task", () => {
        mockMethodCall("tasks.insert", "Demo text 2", { context: { userId } });

        const tasksCount = TasksCollection.find().count();

        const isGreater = tasksCount >= 1;

        assert.isTrue(isGreater);
      });
    });
  });
}
