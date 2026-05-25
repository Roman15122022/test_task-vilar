import { countryOptions } from "@/shared/constants/wizard";

export { countryOptions, requiredWizardFields, wizardValidation } from "@/shared/constants/wizard";
export type { WizardValues } from "@/shared/constants/wizard";

export function getCountryLabel(value: string) {
  return countryOptions.find((country) => country.value === value)?.label ?? value;
}
