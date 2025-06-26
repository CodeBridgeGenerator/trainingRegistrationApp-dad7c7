import React from "react";
import { render, screen } from "@testing-library/react";

import CourseCategoriesEditDialogComponent from "../CourseCategoriesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders courseCategories edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CourseCategoriesEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("courseCategories-edit-dialog-component"),
  ).toBeInTheDocument();
});
