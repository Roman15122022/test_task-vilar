import { render, screen } from "@testing-library/react";
import App from "@/App.jsx";

describe("App", () => {
    it("renders the starter home route", () => {
        render(<App />);

        expect(screen.getByRole("heading", { name: "Тестове завдання" })).toBeInTheDocument();
        expect(
            screen.getByText(/React \+ Vite \+ Ant Design \+ React Router/i),
        ).toBeInTheDocument();
    });
});
