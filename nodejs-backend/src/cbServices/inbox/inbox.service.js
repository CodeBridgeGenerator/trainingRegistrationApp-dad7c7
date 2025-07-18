const { Inbox } = require("./inbox.class");
const createModel = require("../../cbModels/inbox.model");
const hooks = require("./inbox.hooks");

module.exports = function (app) {
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use("/inbox", new Inbox(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("inbox");

  // Get the schema of the collections
  app.get("/inboxSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const excludes = ["__v", "id"];
    const result = Object.keys(schema)
      .map((key) => {
        if (typeof schema[key].type === "function") {
          if (schema[key].type === String) schema[key].type = "String";
          else if (schema[key].type === Number) schema[key].type = "Number";
          else if (schema[key].type === Boolean) schema[key].type = "Boolean";
          else if (schema[key].type === Date) schema[key].type = "Date";
          else if (schema[key].type === Schema.Types.ObjectId)
            schema[key].type = "ObjectId";
          else if (schema[key].type === Schema.Types.Mixed)
            schema[key].type = "Mixed";
          else schema[key].type = "undefined";
        } else if (Array.isArray(schema[key].type)) {
          schema[key].description
            ? (schema[key].description += "isArray")
            : (schema[key].description = "isArray");
          if (typeof schema[key].type[0] === "function") {
            if (schema[key].type[0] === String) schema[key].type = "String";
            else if (schema[key].type[0] === Number)
              schema[key].type = "Number";
            else if (schema[key].type[0] === Boolean)
              schema[key].type = "Boolean";
            else if (schema[key].type[0] === Date) schema[key].type = "Date";
            else if (schema[key].type[0] === Schema.Types.ObjectId)
              schema[key].type[0] = "ObjectId";
            else if (schema[key].type[0] === Schema.Types.Mixed)
              schema[key].type[0] = "Mixed";
            else schema[key].type[0] = "undefined";
          }
        }
        return (
          !excludes.includes(key) && {
            field: key,
            ...schema[key],
          }
        );
      })
      .filter((item) => item);
    return response.status(200).json(result);
  });
  service.hooks(hooks);
};
