import React from "react";
import { render, screen } from "@testing-library/react";

import CourseCategoriesPage from "../CourseCategoriesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders courseCategories page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CourseCategoriesPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("courseCategories-datatable")).toBeInTheDocument();
  expect(screen.getByRole("courseCategories-add-button")).toBeInTheDocument();
});
