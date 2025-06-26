module.exports = function (app) {
  const modelName = "courses";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      category: {
        type: Schema.Types.ObjectId,
        ref: "courseCategory",
        comment:
          "Category, dropdown, false, true, true, true, true, true, true, courseCategory, courseCategory, one-to-one, name,",
      },
      title: {
        type: String,
        required: true,
        comment: "Title, p, false, true, true, true, true, true, true, , , , ,",
      },
      description: {
        type: String,
        required: true,
        comment:
          "Description, inputTextarea, false, true, true, true, true, true, true, , , , ,",
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
