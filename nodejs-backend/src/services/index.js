
const courseCategories = require("./courseCategories/courseCategories.service.js");
const courses = require("./courses/courses.service.js");
const cohort = require("./cohort/cohort.service.js");
const courseRegistration = require("./courseRegistration/courseRegistration.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    
  app.configure(courseCategories);
  app.configure(courses);
  app.configure(cohort);
  app.configure(courseRegistration);
    // ~cb-add-configure-service-name~
};
