const assert = require("assert");
const app = require("../../src/app");

describe("courses service", () => {
  let thisService;
  let courseCreated;

  beforeEach(async () => {
    thisService = await app.service("courses");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (courses)");
  });

  describe("#create", () => {
    const options = {"category":"aasdfasdfasdfadsfadfa","title":"new value","description":"new value"};

    beforeEach(async () => {
      courseCreated = await thisService.create(options);
    });

    it("should create a new course", () => {
      assert.strictEqual(courseCreated.category, options.category);
assert.strictEqual(courseCreated.title, options.title);
assert.strictEqual(courseCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a course by ID", async () => {
      const retrieved = await thisService.get(courseCreated._id);
      assert.strictEqual(retrieved._id, courseCreated._id);
    });
  });

  describe("#update", () => {
    let courseUpdated;
    const options = {"category":"345345345345345345345","title":"updated value","description":"updated value"};

    beforeEach(async () => {
      courseUpdated = await thisService.update(courseCreated._id, options);
    });

    it("should update an existing course ", async () => {
      assert.strictEqual(courseUpdated.category, options.category);
assert.strictEqual(courseUpdated.title, options.title);
assert.strictEqual(courseUpdated.description, options.description);
    });
  });

  describe("#delete", () => {
  let courseDeleted;
    beforeEach(async () => {
      courseDeleted = await thisService.remove(courseCreated._id);
    });

    it("should delete a course", async () => {
      assert.strictEqual(courseDeleted._id, courseCreated._id);
    });
  });
});