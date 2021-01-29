import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { handlers as mockHandlers } from '../mocks/handlers';

jest.mock('../mocks/handlers')
let data = {data: [
    {
      color: "aliceblue",
      code: {
        hex: "#f0f8ff"
      },
      id: 1
    },
    {
      color: "limegreen",
      code: {
        hex: "#99ddbc"
      },
      id: 2
    },
    {
      color: "aqua",
      code: {
        hex: "#00ffff"
      },
      id: 3
    },
]};

test("Renders BubblePage without errors", async () => {
  // Finish this test
});

test("Fetches data and renders the bubbles on mounting", async () => {
  // mockHandlers.mockResolvedValueOnce(data)
  // render(<BubblePage />)
  // await waitFor(()=> {

  //   screen.getByText(/bubbles/i)
  // }
  // Finish this test
},);

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading