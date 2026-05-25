import { Grid, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { routes } from "@/app/routes";

const { Header, Sider, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const menuItems = routes.map((route) => ({
  key: route.path,
  icon: route.icon,
  label: <Link to={route.path}>{route.label}</Link>,
}));

function AppLayout() {
  const { pathname } = useLocation();
  const screens = useBreakpoint();
  const isDesktop = screens.md ?? true;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          alignItems: "center",
          display: "flex",
          gap: 24,
          minWidth: 0,
          paddingInline: isDesktop ? 32 : 16,
        }}
      >
        <div
          style={{
            color: "#fff",
            flex: "0 0 auto",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          My App
        </div>
        {!isDesktop && (
          <Menu
            aria-label="Main navigation"
            items={menuItems}
            mode="horizontal"
            selectedKeys={[pathname]}
            style={{ flex: "1 1 auto", minWidth: 0 }}
            theme="dark"
          />
        )}
      </Header>
      <Layout style={{ minWidth: 0 }}>
        {isDesktop && (
          <Sider width={220}>
            <Menu
              aria-label="Main navigation"
              mode="inline"
              selectedKeys={[pathname]}
              items={menuItems}
              style={{ height: "100%", borderRight: 0 }}
            />
          </Sider>
        )}
        <Layout
          style={{
            minWidth: 0,
            padding: isDesktop ? 24 : 12,
          }}
        >
          <Content
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              margin: 0,
              minHeight: 280,
              minWidth: 0,
              overflow: "hidden",
              padding: isDesktop ? 24 : 16,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer
        style={{
          padding: isDesktop ? "24px 50px" : 16,
          textAlign: "center",
        }}
      >
        My App ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default AppLayout;
