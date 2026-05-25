export const countryOptions = [
  { label: "Україна", value: "ua" },
  { label: "Польща", value: "pl" },
  { label: "Німеччина", value: "de" },
  { label: "Франція", value: "fr" },
  { label: "Іспанія", value: "es" },
];

export type WizardValues = {
  age: number;
  country: string;
  email: string;
  name: string;
};

export const requiredWizardFields: Array<keyof WizardValues> = ["name", "email", "country", "age"];

export const wizardValidation = {
  ageMax: 100,
  ageMin: 18,
  nameMinLength: 2,
};
