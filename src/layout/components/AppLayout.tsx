import { Grid, Layout, Menu } from "antd";
import type { ReactElement } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { routes } from "@/app/routes";

const { Header, Sider, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const menuItems = routes.map((route) => ({
  key: route.path,
  icon: route.icon,
  label: <Link to={route.path}>{route.label}</Link>,
}));

function AppLayout(): ReactElement {
  const { pathname } = useLocation();
  const screens = useBreakpoint();
  const isDesktop = screens.md ?? true;

  return (
    <Layout>
      <Header>
        <div>My App</div>
        {!isDesktop && (
          <Menu
            aria-label="Main navigation"
            items={menuItems}
            mode="horizontal"
            selectedKeys={[pathname]}
            theme="dark"
          />
        )}
      </Header>
      <Layout>
        {isDesktop && (
          <Sider width={220}>
            <Menu
              aria-label="Main navigation"
              mode="inline"
              selectedKeys={[pathname]}
              items={menuItems}
            />
          </Sider>
        )}
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer>My App ©{new Date().getFullYear()}</Footer>
    </Layout>
  );
}

export default AppLayout;
