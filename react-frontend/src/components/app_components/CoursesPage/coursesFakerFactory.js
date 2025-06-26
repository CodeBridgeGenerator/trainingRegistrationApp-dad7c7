
import { faker } from "@faker-js/faker";
export default (user,count,categoryIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
category: categoryIds[i % categoryIds.length],
title: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
