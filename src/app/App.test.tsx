import { render, screen } from "@testing-library/react";
import App from "@/app/App";

describe("App", () => {
  it("renders the starter home route", () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Тестове завдання" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByText(/React \+ Vite \+ Ant Design \+ React Router/i)).toBeInTheDocument();
  });

  it("builds navigation links from the root path", () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.getByRole("link", { name: /^coins$/i })).toHaveAttribute("href", "/coins");
  });
});
