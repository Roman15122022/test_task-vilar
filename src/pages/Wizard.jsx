import { Space, Typography } from "antd";
import { useState } from "react";
import { WizardForm } from "@/components/WizardForm.jsx";
import { WizardSummary } from "@/components/WizardSummary.jsx";

const { Paragraph, Title } = Typography;

function Wizard() {
    const [submittedValues, setSubmittedValues] = useState(null);

    if (submittedValues) {
        return <WizardSummary values={submittedValues} onReset={() => setSubmittedValues(null)} />;
    }

    return (
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
            <div>
                <Title level={2}>Форма користувача</Title>
                <Paragraph type="secondary">
                    Заповніть поля, щоб побачити фінальний підсумок.
                </Paragraph>
            </div>
            <WizardForm onSubmit={setSubmittedValues} />
        </Space>
    );
}

export default Wizard;
