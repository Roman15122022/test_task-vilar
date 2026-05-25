import { Button, Descriptions, Space, Typography } from "antd";
import type { ReactElement } from "react";
import { getCountryLabel } from "@/features/wizard/utils/wizardForm";
import type { WizardValues } from "@/features/wizard/utils/wizardForm";

const { Title } = Typography;

type WizardSummaryProps = {
  onReset: () => void;
  values: WizardValues;
};

export function WizardSummary({ onReset, values }: WizardSummaryProps): ReactElement {
  return (
    <Space orientation="vertical" size="large" style={{ display: "flex", maxWidth: 720 }}>
      <Title level={2}>Підсумок</Title>
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Імʼя">{values.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{values.email}</Descriptions.Item>
        <Descriptions.Item label="Країна">{getCountryLabel(values.country)}</Descriptions.Item>
        <Descriptions.Item label="Вік">{values.age}</Descriptions.Item>
      </Descriptions>
      <div>
        <Button onClick={onReset} type="primary">
          Почати заново
        </Button>
      </div>
    </Space>
  );
}
