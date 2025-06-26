const assert = require("assert");
const app = require("../../src/app");

describe("courseCategories service", () => {
  let thisService;
  let courseCategoryCreated;

  beforeEach(async () => {
    thisService = await app.service("courseCategories");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (courseCategories)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      courseCategoryCreated = await thisService.create(options);
    });

    it("should create a new courseCategory", () => {
      assert.strictEqual(courseCategoryCreated.name, options.name);
assert.strictEqual(courseCategoryCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a courseCategory by ID", async () => {
      const retrieved = await thisService.get(courseCategoryCreated._id);
      assert.strictEqual(retrieved._id, courseCategoryCreated._id);
    });
  });

  describe("#update", () => {
    let courseCategoryUpdated;
    const options = {"name":"updated value","description":"updated value"};

    beforeEach(async () => {
      courseCategoryUpdated = await thisService.update(courseCategoryCreated._id, options);
    });

    it("should update an existing courseCategory ", async () => {
      assert.strictEqual(courseCategoryUpdated.name, options.name);
assert.strictEqual(courseCategoryUpdated.description, options.description);
    });
  });

  describe("#delete", () => {
  let courseCategoryDeleted;
    beforeEach(async () => {
      courseCategoryDeleted = await thisService.remove(courseCategoryCreated._id);
    });

    it("should delete a courseCategory", async () => {
      assert.strictEqual(courseCategoryDeleted._id, courseCategoryCreated._id);
    });
  });
});