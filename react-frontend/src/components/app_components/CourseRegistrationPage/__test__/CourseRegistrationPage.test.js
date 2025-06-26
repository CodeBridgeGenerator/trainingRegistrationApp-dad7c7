import React from "react";
import { render, screen } from "@testing-library/react";

import CourseRegistrationPage from "../CourseRegistrationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders courseRegistration page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CourseRegistrationPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("courseRegistration-datatable")).toBeInTheDocument();
  expect(screen.getByRole("courseRegistration-add-button")).toBeInTheDocument();
});
