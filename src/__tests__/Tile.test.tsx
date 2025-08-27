import { render, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import type { dataType } from "../store/formSlice";
import { describe, expect, it } from "vitest";
import Tile from "../Tile";

describe("Tile", () => {
  const mock: dataType = {
    name: "Pavel",
    age: 30,
    email: "example@example.com",
    password1: "p1",
    password2: "p2",
    gender: "male",
    terms: true,
    country: "Russia",
  };

  it("should draw data", () => {
    const { container } = render(<Tile data={mock} />);
    const tile = container.querySelector(".tile");
    if (tile instanceof HTMLElement) {
      expect(tile).toBeInTheDocument();
      expect(within(tile).getByText("Pavel")).toBeInTheDocument();
      expect(within(tile).getByText("30")).toBeInTheDocument();
      expect(within(tile).getByText("example@example.com")).toBeInTheDocument();
      expect(within(tile).getByText("p1")).toBeInTheDocument();
      expect(within(tile).getByText("p2")).toBeInTheDocument();
      expect(within(tile).getByText("male")).toBeInTheDocument();
      expect(within(tile).getByText("Russia")).toBeInTheDocument();
      expect(within(tile).getByText("true")).toBeInTheDocument();
    }
  });

  it("should tile none", () => {
    const { container } = render(<Tile data={null} />);
    expect(container.querySelector(".tile")).toBeNull();
  });
});
