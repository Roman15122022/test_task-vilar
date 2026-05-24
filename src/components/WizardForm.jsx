import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { useState } from "react";
import { countryOptions, requiredWizardFields } from "@/utils/wizardForm.js";

export function WizardForm({ onSubmit }) {
    const [form] = Form.useForm();
    const [canSubmit, setCanSubmit] = useState(false);

    function updateSubmitState() {
        const values = form.getFieldsValue();
        const hasAllRequiredValues = requiredWizardFields.every((field) => {
            const value = values[field];
            return value !== undefined && value !== null && value !== "";
        });
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);

        setCanSubmit(hasAllRequiredValues && !hasErrors);
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
                    { message: "Мінімум 2 символи", min: 2 },
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
                    { max: 100, message: "Максимум 100", type: "number" },
                    { message: "Мінімум 18", min: 18, type: "number" },
                ]}
            >
                <InputNumber
                    aria-label="Вік"
                    max={100}
                    min={18}
                    placeholder="18"
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
