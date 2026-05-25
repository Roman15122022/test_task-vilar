import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import type { ReactElement } from "react";
import { useState } from "react";
import {
  countryOptions,
  requiredWizardFields,
  wizardValidation,
} from "@/features/wizard/utils/wizardForm";
import type { WizardValues } from "@/features/wizard/utils/wizardForm";

type WizardFormProps = {
  onSubmit: (values: WizardValues) => void;
};

function hasRequiredValue(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}

export function WizardForm({ onSubmit }: WizardFormProps): ReactElement {
  const [form] = Form.useForm<WizardValues>();
  const [canSubmit, setCanSubmit] = useState(false);

  function updateSubmitState() {
    const values = form.getFieldsValue();
    const hasAllRequiredValues = requiredWizardFields.every((field) => {
      const value = values[field];
      return hasRequiredValue(value);
    });
    const hasValidAge =
      typeof values.age === "number" &&
      values.age >= wizardValidation.ageMin &&
      values.age <= wizardValidation.ageMax;
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);

    setCanSubmit(hasAllRequiredValues && hasValidAge && !hasErrors);
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFieldsChange={updateSubmitState}
      onFinish={onSubmit}
      style={{ maxWidth: 640, width: "100%" }}
    >
      <Form.Item
        label="Імʼя"
        name="name"
        rules={[
          { message: "Введіть імʼя", required: true },
          {
            message: `Мінімум ${wizardValidation.nameMinLength} символи`,
            min: wizardValidation.nameMinLength,
          },
        ]}
      >
        <Input placeholder="Ваше імʼя" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { message: "Введіть email", required: true },
          { message: "Некоректний email", type: "email" },
        ]}
      >
        <Input placeholder="name@example.com" />
      </Form.Item>
      <Form.Item
        label="Країна"
        name="country"
        rules={[{ message: "Оберіть країну", required: true }]}
      >
        <Select aria-label="Країна" options={countryOptions} placeholder="Оберіть країну" />
      </Form.Item>
      <Form.Item
        label="Вік"
        name="age"
        rules={[
          { message: "Введіть вік", required: true },
          {
            message: `Мінімум ${wizardValidation.ageMin}`,
            min: wizardValidation.ageMin,
            type: "number",
          },
          {
            max: wizardValidation.ageMax,
            message: `Максимум ${wizardValidation.ageMax}`,
            type: "number",
          },
        ]}
      >
        <InputNumber
          aria-label="Вік"
          max={wizardValidation.ageMax}
          placeholder={String(wizardValidation.ageMin)}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button disabled={!canSubmit} htmlType="submit" type="primary">
            Відправити
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
