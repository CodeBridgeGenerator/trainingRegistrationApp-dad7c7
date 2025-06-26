
    module.exports = function (app) {
        const modelName = "cohort";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            course: { type: Schema.Types.ObjectId, ref: "courses", comment: "Course, dropdown, false, true, true, true, true, true, true, courses, courses, one-to-one, title," },
name: { type:  String , required: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
start: { type: Date, comment: "Start, p_calendar, false, true, true, true, true, true, true, , , , ," },
end: { type: Date, comment: "End, p_calendar, false, true, true, true, true, true, true, , , , ," },
format: { type: String , enum: ["Face-to-face","Online"], comment: "Format, dropdownArray, false, true, true, true, true, true, true, , , , ," },
capacity: { type: Number, max: 1000000, comment: "Capacity, p_number, false, true, true, true, true, true, true, , , , ," },
enrolledCount: { type: Number, max: 1000000, comment: "Enrolled Count, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };