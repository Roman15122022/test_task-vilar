import { countryOptions } from "@/shared/constants/wizard";
import type { Rule } from "antd/es/form";

export { countryOptions, requiredWizardFields, wizardValidation } from "@/shared/constants/wizard";
export type { WizardValues } from "@/shared/constants/wizard";
import { requiredWizardFields, wizardValidation } from "@/shared/constants/wizard";
import type { WizardValues } from "@/shared/constants/wizard";

type WizardFieldError = {
  errors: unknown[];
  name?: unknown;
  warnings?: unknown[];
};

export function getCountryLabel(value: string) {
  return countryOptions.find((country) => country.value === value)?.label ?? value;
}

export function hasRequiredValue(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}

export function normalizeAge(value: string | number | undefined) {
  return value === "" ? undefined : Number(value);
}

export function validateAge(value: WizardValues["age"] | undefined) {
  if (value === undefined || value === null) {
    return Promise.resolve();
  }

  if (value < wizardValidation.ageMin) {
    return Promise.reject(new Error(`Мінімум ${wizardValidation.ageMin}`));
  }

  if (value > wizardValidation.ageMax) {
    return Promise.reject(new Error(`Максимум ${wizardValidation.ageMax}`));
  }

  return Promise.resolve();
}

export function canSubmitWizardForm(values: Partial<WizardValues>, fields: WizardFieldError[]) {
  const hasAllRequiredValues = requiredWizardFields.every((field) =>
    hasRequiredValue(values[field]),
  );
  const hasValidAge =
    typeof values.age === "number" &&
    values.age >= wizardValidation.ageMin &&
    values.age <= wizardValidation.ageMax;
  const hasErrors = fields.some(({ errors }) => errors.length > 0);

  return hasAllRequiredValues && hasValidAge && !hasErrors;
}

export const wizardRules = {
  age: [
    { message: "Введіть вік", required: true },
    {
      validator: (_: unknown, value: WizardValues["age"] | undefined) => validateAge(value),
    },
  ],
  country: [{ message: "Оберіть країну", required: true }],
  email: [
    { message: "Введіть email", required: true },
    { message: "Некоректний email", type: "email" },
  ],
  name: [
    { message: "Введіть імʼя", required: true },
    {
      message: `Мінімум ${wizardValidation.nameMinLength} символи`,
      min: wizardValidation.nameMinLength,
    },
  ],
} satisfies Record<keyof WizardValues, Rule[]>;
