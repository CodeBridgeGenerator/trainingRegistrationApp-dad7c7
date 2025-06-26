import React from "react";
import { render, screen } from "@testing-library/react";

import CourseRegistrationCreateDialogComponent from "../CourseRegistrationCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders courseRegistration create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CourseRegistrationCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("courseRegistration-create-dialog-component"),
  ).toBeInTheDocument();
});
