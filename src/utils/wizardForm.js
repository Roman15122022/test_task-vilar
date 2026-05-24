export const countryOptions = [
    { label: "Україна", value: "ua" },
    { label: "Польща", value: "pl" },
    { label: "Німеччина", value: "de" },
    { label: "Франція", value: "fr" },
    { label: "Іспанія", value: "es" },
];

export const requiredWizardFields = ["name", "email", "country", "age"];

export function getCountryLabel(value) {
    return countryOptions.find((country) => country.value === value)?.label ?? value;
}
