import { Card, Typography } from "antd";
import type { ReactElement } from "react";

const { Title, Paragraph, Link } = Typography;

function HomePage(): ReactElement {
  return (
    <Card>
      <Title level={2}>Тестове завдання</Title>
      <Paragraph>
        Це стартовий шаблон. Усі завдання описані у файлі{" "}
        <Link href="/TASK.md" target="_blank">
          TASK.md
        </Link>{" "}
        у корені проєкту.
      </Paragraph>
      <Paragraph type="secondary">Стек: React + Vite + Ant Design + React Router.</Paragraph>
    </Card>
  );
}

export default HomePage;
