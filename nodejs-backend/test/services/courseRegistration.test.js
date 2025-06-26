const assert = require("assert");
const app = require("../../src/app");

describe("courseRegistration service", () => {
  let thisService;
  let courseRegistrationCreated;

  beforeEach(async () => {
    thisService = await app.service("courseRegistration");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (courseRegistration)");
  });

  describe("#create", () => {
    const options = {"cohort":"aasdfasdfasdfadsfadfa","profile":"aasdfasdfasdfadsfadfa","status":["new value"],"payment":["new value"]};

    beforeEach(async () => {
      courseRegistrationCreated = await thisService.create(options);
    });

    it("should create a new courseRegistration", () => {
      assert.strictEqual(courseRegistrationCreated.cohort, options.cohort);
assert.strictEqual(courseRegistrationCreated.profile, options.profile);
assert.strictEqual(courseRegistrationCreated.status, options.status);
assert.strictEqual(courseRegistrationCreated.payment, options.payment);
    });
  });

  describe("#get", () => {
    it("should retrieve a courseRegistration by ID", async () => {
      const retrieved = await thisService.get(courseRegistrationCreated._id);
      assert.strictEqual(retrieved._id, courseRegistrationCreated._id);
    });
  });

  describe("#update", () => {
    let courseRegistrationUpdated;
    const options = {"cohort":"345345345345345345345","profile":"345345345345345345345","status":["updated value"],"payment":["updated value"]};

    beforeEach(async () => {
      courseRegistrationUpdated = await thisService.update(courseRegistrationCreated._id, options);
    });

    it("should update an existing courseRegistration ", async () => {
      assert.strictEqual(courseRegistrationUpdated.cohort, options.cohort);
assert.strictEqual(courseRegistrationUpdated.profile, options.profile);
assert.strictEqual(courseRegistrationUpdated.status, options.status);
assert.strictEqual(courseRegistrationUpdated.payment, options.payment);
    });
  });

  describe("#delete", () => {
  let courseRegistrationDeleted;
    beforeEach(async () => {
      courseRegistrationDeleted = await thisService.remove(courseRegistrationCreated._id);
    });

    it("should delete a courseRegistration", async () => {
      assert.strictEqual(courseRegistrationDeleted._id, courseRegistrationCreated._id);
    });
  });
});