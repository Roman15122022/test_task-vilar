import { render, screen } from "@testing-library/react";
import HomePage from "@/pages/home/HomePage";

describe("HomePage", () => {
  it("renders the task entry content", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Тестове завдання" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "TASK.md" })).toHaveAttribute("href", "/TASK.md");
  });
});
