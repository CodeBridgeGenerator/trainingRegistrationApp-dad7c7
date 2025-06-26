import React from "react";
import { render, screen } from "@testing-library/react";

import CourseCategoriesCreateDialogComponent from "../CourseCategoriesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders courseCategories create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CourseCategoriesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("courseCategories-create-dialog-component")).toBeInTheDocument();
});
