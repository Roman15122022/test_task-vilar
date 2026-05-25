import { Space, Typography } from "antd";
import { useState } from "react";
import { WizardForm } from "@/features/wizard/components/WizardForm";
import { WizardSummary } from "@/features/wizard/components/WizardSummary";
import type { WizardValues } from "@/features/wizard/utils/wizardForm";

const { Paragraph, Title } = Typography;

function WizardPage() {
  const [submittedValues, setSubmittedValues] = useState<WizardValues | null>(null);

  if (submittedValues) {
    return <WizardSummary values={submittedValues} onReset={() => setSubmittedValues(null)} />;
  }

  return (
    <Space orientation="vertical" size="large" style={{ display: "flex" }}>
      <div>
        <Title level={2}>Форма користувача</Title>
        <Paragraph type="secondary">Заповніть поля, щоб побачити фінальний підсумок.</Paragraph>
      </div>
      <WizardForm onSubmit={setSubmittedValues} />
    </Space>
  );
}

export default WizardPage;
