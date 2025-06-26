module.exports = function (app) {
  const modelName = "course_registration";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      cohort: {
        type: Schema.Types.ObjectId,
        ref: "cohort",
        comment:
          "Cohort, dropdown, false, true, true, true, true, true, true, cohort, cohort, one-to-one, name,",
      },
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profiles",
        comment:
          "Profile, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name,",
      },
      status: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        comment:
          "Status, dropdownArray, false, true, true, true, true, true, true, , , , ,",
      },
      payment: {
        type: String,
        enum: ["Unpaid", "Paid", "Declined", "Other"],
        comment:
          "Payment, dropdownArray, false, true, true, true, true, true, true, , , , ,",
      },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
