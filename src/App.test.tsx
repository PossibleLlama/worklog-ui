import React from "react";
import App from "./App";

import { expect } from "chai";
import { render, screen } from "@testing-library/react";

describe("App", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("Has name", () => {
        expect(document.body.contains(screen.getByText(/Worklog/)));
    });
});
