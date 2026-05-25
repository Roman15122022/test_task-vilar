import { Button, Form, Input, Select, Space } from "antd";
import type { ReactElement } from "react";
import { useState } from "react";
import {
  canSubmitWizardForm,
  countryOptions,
  normalizeAge,
  wizardValidation,
  wizardRules,
} from "@/features/wizard/utils/wizardForm";
import type { WizardValues } from "@/features/wizard/utils/wizardForm";

type WizardFormProps = {
  onSubmit: (values: WizardValues) => void;
};

export function WizardForm({ onSubmit }: WizardFormProps): ReactElement {
  const [form] = Form.useForm<WizardValues>();
  const [canSubmit, setCanSubmit] = useState(false);

  function updateSubmitState() {
    setCanSubmit(canSubmitWizardForm(form.getFieldsValue(), form.getFieldsError()));
  }

  return (
    <Form form={form} layout="vertical" onFieldsChange={updateSubmitState} onFinish={onSubmit}>
      <Form.Item label="Імʼя" name="name" rules={wizardRules.name}>
        <Input placeholder="Ваше імʼя" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={wizardRules.email}>
        <Input placeholder="name@example.com" />
      </Form.Item>
      <Form.Item label="Країна" name="country" rules={wizardRules.country}>
        <Select aria-label="Країна" options={countryOptions} placeholder="Оберіть країну" />
      </Form.Item>
      <Form.Item label="Вік" name="age" normalize={normalizeAge} rules={wizardRules.age}>
        <Input aria-label="Вік" placeholder={String(wizardValidation.ageMin)} type="number" />
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
