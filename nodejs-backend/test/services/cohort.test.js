const assert = require("assert");
const app = require("../../src/app");

describe("cohort service", () => {
  let thisService;
  let cohortCreated;

  beforeEach(async () => {
    thisService = await app.service("cohort");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (cohort)");
  });

  describe("#create", () => {
    const options = {"course":"aasdfasdfasdfadsfadfa","name":"new value","start":1750912817105,"end":1750912817105,"format":["new value"],"capacity":23,"enrolledCount":23};

    beforeEach(async () => {
      cohortCreated = await thisService.create(options);
    });

    it("should create a new cohort", () => {
      assert.strictEqual(cohortCreated.course, options.course);
assert.strictEqual(cohortCreated.name, options.name);
assert.strictEqual(cohortCreated.start, options.start);
assert.strictEqual(cohortCreated.end, options.end);
assert.strictEqual(cohortCreated.format, options.format);
assert.strictEqual(cohortCreated.capacity, options.capacity);
assert.strictEqual(cohortCreated.enrolledCount, options.enrolledCount);
    });
  });

  describe("#get", () => {
    it("should retrieve a cohort by ID", async () => {
      const retrieved = await thisService.get(cohortCreated._id);
      assert.strictEqual(retrieved._id, cohortCreated._id);
    });
  });

  describe("#update", () => {
    let cohortUpdated;
    const options = {"course":"345345345345345345345","name":"updated value","start":null,"end":null,"format":["updated value"],"capacity":100,"enrolledCount":100};

    beforeEach(async () => {
      cohortUpdated = await thisService.update(cohortCreated._id, options);
    });

    it("should update an existing cohort ", async () => {
      assert.strictEqual(cohortUpdated.course, options.course);
assert.strictEqual(cohortUpdated.name, options.name);
assert.strictEqual(cohortUpdated.start, options.start);
assert.strictEqual(cohortUpdated.end, options.end);
assert.strictEqual(cohortUpdated.format, options.format);
assert.strictEqual(cohortUpdated.capacity, options.capacity);
assert.strictEqual(cohortUpdated.enrolledCount, options.enrolledCount);
    });
  });

  describe("#delete", () => {
  let cohortDeleted;
    beforeEach(async () => {
      cohortDeleted = await thisService.remove(cohortCreated._id);
    });

    it("should delete a cohort", async () => {
      assert.strictEqual(cohortDeleted._id, cohortCreated._id);
    });
  });
});