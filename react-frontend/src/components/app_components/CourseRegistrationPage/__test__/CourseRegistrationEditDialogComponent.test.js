import React from "react";
import { render, screen } from "@testing-library/react";

import CourseRegistrationEditDialogComponent from "../CourseRegistrationEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders courseRegistration edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CourseRegistrationEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("courseRegistration-edit-dialog-component"),
  ).toBeInTheDocument();
});
