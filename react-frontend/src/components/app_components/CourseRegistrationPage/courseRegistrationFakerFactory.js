
import { faker } from "@faker-js/faker";
export default (user,count,cohortIds,profileIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
cohort: cohortIds[i % cohortIds.length],
profile: profileIds[i % profileIds.length],
status: "Pending",
payment: "Paid",

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
