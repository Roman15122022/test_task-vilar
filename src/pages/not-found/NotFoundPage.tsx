import { Button, Result } from "antd";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";

function NotFoundPage(): ReactElement {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Сторінку не знайдено."
      extra={
        <Link to="/">
          <Button type="primary">На головну</Button>
        </Link>
      }
    />
  );
}

export default NotFoundPage;
