import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Wizard from "@/pages/Wizard.jsx";
import { renderWithClient } from "@/test/renderWithClient.jsx";

async function selectCountry(user, country = "Україна") {
    await user.click(screen.getByLabelText("Країна"));
    await user.click(screen.getByText(country));
}

async function fillValidForm(user) {
    await user.type(screen.getByLabelText("Імʼя"), "Alex");
    await user.type(screen.getByLabelText("Email"), "alex@example.com");
    await selectCountry(user);
    await user.type(screen.getByLabelText("Вік"), "28");
}

describe("Wizard page", () => {
    it("keeps submit disabled until required fields are valid", async () => {
        const user = userEvent.setup();
        renderWithClient(<Wizard />);

        const submit = screen.getByRole("button", { name: "Відправити" });
        expect(submit).toBeDisabled();

        await user.type(screen.getByLabelText("Імʼя"), "A");
        await user.type(screen.getByLabelText("Email"), "bad-email");
        await selectCountry(user);
        await user.type(screen.getByLabelText("Вік"), "28");

        expect(submit).toBeDisabled();

        await user.clear(screen.getByLabelText("Імʼя"));
        await user.type(screen.getByLabelText("Імʼя"), "Alex");
        await user.clear(screen.getByLabelText("Email"));
        await user.type(screen.getByLabelText("Email"), "alex@example.com");

        await waitFor(() => {
            expect(submit).toBeEnabled();
        });
    });

    it("shows summary after submit and resets back to an empty form", async () => {
        const user = userEvent.setup();
        renderWithClient(<Wizard />);

        await fillValidForm(user);
        await waitFor(() => {
            expect(screen.getByRole("button", { name: "Відправити" })).toBeEnabled();
        });
        await user.click(screen.getByRole("button", { name: "Відправити" }));

        expect(await screen.findByRole("heading", { name: "Підсумок" })).toBeInTheDocument();
        expect(screen.getByText("Alex")).toBeInTheDocument();
        expect(screen.getByText("alex@example.com")).toBeInTheDocument();
        expect(screen.getByText("Україна")).toBeInTheDocument();
        expect(screen.getByText("28")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: "Почати заново" }));

        expect(screen.getByRole("heading", { name: "Форма користувача" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Відправити" })).toBeDisabled();
    });
});
