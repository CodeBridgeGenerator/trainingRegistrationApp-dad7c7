import React from "react";
import { render, screen } from "@testing-library/react";

import CohortPage from "../CohortPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cohort page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CohortPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("cohort-datatable")).toBeInTheDocument();
  expect(screen.getByRole("cohort-add-button")).toBeInTheDocument();
});
