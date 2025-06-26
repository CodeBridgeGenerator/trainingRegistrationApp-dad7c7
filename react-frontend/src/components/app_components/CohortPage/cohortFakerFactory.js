
import { faker } from "@faker-js/faker";
export default (user,count,courseIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
course: courseIds[i % courseIds.length],
name: faker.datatype.number(""),
start: faker.datatype.number(""),
end: faker.datatype.number(""),
format: faker.datatype.number(""),
capacity: faker.datatype.number(""),
enrolledCount: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
