import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

import { expect } from "chai";

describe("App", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("Has name", () => {
        expect(document.body.contains(screen.getByText(/Worklog/)));
    });
});
