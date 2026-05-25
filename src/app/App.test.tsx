import { render, screen } from "@testing-library/react";
import App from "@/app/App";

describe("App", () => {
  it("renders the starter home route", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Тестове завдання" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByText(/React \+ Vite \+ Ant Design \+ React Router/i)).toBeInTheDocument();
  });
});
