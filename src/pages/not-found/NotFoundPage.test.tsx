import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

describe("NotFoundPage", () => {
  it("renders a link back to the home route", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Сторінку не знайдено.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "На головну" })).toHaveAttribute("href", "/");
  });
});
