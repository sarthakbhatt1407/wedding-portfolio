import React, { useState } from "react";
import {
  Layout,
  Menu,
  Drawer,
  Button,
  Avatar,
  Typography,
  Badge,
  Tooltip,
  Card,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  ShoppingOutlined,
  DashboardOutlined,
  MenuOutlined,
  SettingOutlined,
  BellOutlined,
  CloseOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import PhotoAdmin from "./PhotoAdmin";
import VideoAdmin from "./VideoAdmin";
import RentalAdmin from "./RentalAdmin";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const AdminLayout = styled(Layout)`
  min-height: 100vh;
  background: #f0f2f5;

  @media (max-width: 768px) {
    background: #fff;
  }
`;

const AdminHeader = styled(Header)`
  background: #fff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 0 16px;
    height: 64px;
  }
`;

const AdminSider = styled(Sider)`
  .ant-layout-sider-children {
    background: #fff;
    border-right: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .ant-menu {
    border-right: none;
    padding: 8px 0;
    background: transparent;
    flex: 1;
    overflow-y: auto;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #da1701;
      border-radius: 2px;
    }
  }

  .ant-menu-item {
    margin: 4px 16px;
    border-radius: 12px;
    height: 48px;
    display: flex;
    align-items: center;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    line-height: 1.4;
    padding: 0 16px;

    &:hover {
      background: rgba(218, 23, 1, 0.08);
      color: #da1701;
      transform: translateX(4px);
    }
  }

  .ant-menu-item-selected {
    background: linear-gradient(135deg, #da1701, #b81501) !important;
    color: #fff !important;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(218, 23, 1, 0.25);
    transform: translateX(4px);

    .anticon {
      color: #fff;
    }

    &:hover {
      transform: translateX(4px);
    }
  }

  .ant-menu-item-icon {
    font-size: 18px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
  }

  /* Hide scrollbar on mobile */
  @media (max-width: 768px) {
    .ant-menu {
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const AdminContent = styled(Content)`
  margin: 0;
  background: transparent;
  overflow: hidden;

  @media (max-width: 768px) {
    background: #f0f2f5;
  }
`;

const ContentWrapper = styled.div`
  padding: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const DashboardContent = styled.div`
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  margin: 24px;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    margin: 16px;
    padding: 24px 16px;
    border-radius: 16px;
    min-height: calc(100vh - 96px);
  }
`;

const DashboardTitle = styled(Title)`
  color: #1a1a1a !important;
  margin-bottom: 8px !important;
  font-family: "Playfair Display", serif;
  font-weight: 400 !important;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem !important;
  }
`;

const DashboardSubtitle = styled(Text)`
  font-size: 1rem;
  color: #666;
  display: block;
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 32px;
  }
`;

const DashboardGrid = styled(Row)`
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 24px;
  }
`;

const DashboardCard = styled(Card)`
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  height: 100%;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(218, 23, 1, 0.12);
    border-color: #da1701;

    .card-icon {
      transform: scale(1.1);
      color: #da1701;
    }

    .card-title {
      color: #da1701;
    }
  }

  .ant-card-body {
    padding: 32px 24px;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 768px) {
      padding: 24px 16px;
    }
  }

  .card-icon {
    font-size: 3rem;
    color: #da1701;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    opacity: 0.8;

    @media (max-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 16px;
    }
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 12px;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-bottom: 8px;
    }
  }

  .card-description {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 0.85rem;
    }
  }
`;

const MobileDrawer = styled(Drawer)`
  .ant-drawer-header {
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .ant-drawer-title {
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    font-size: 16px;
  }

  .ant-drawer-body {
    padding: 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .ant-drawer-close {
    color: #666;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      color: #da1701;
      background: rgba(218, 23, 1, 0.08);
    }
  }

  /* Ensure proper overlay */
  .ant-drawer-mask {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
  }

  .ant-drawer-content {
    border-radius: 0;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .user-details {
    display: flex;
    flex-direction: column;

    .name {
      color: #1a1a1a;
      font-weight: 600;
      font-size: 14px;
    }

    .role {
      color: #666;
      font-size: 12px;
    }
  }

  @media (max-width: 768px) {
    .user-details {
      display: none;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const ActionButton = styled(Button)`
  border: none;
  box-shadow: none;
  height: 40px;
  width: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #da1701;
    transform: translateY(-1px);
  }

  &:focus {
    box-shadow: none;
  }
`;

const BrandLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 18px;

  .logo-icon {
    font-size: 24px;
    color: #da1701;
  }

  @media (max-width: 768px) {
    .brand-text {
      display: none;
    }
  }
`;

const SiderHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
  background: #fff;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const SiderTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const SiderSubtitle = styled.div`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SiderFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const MenuButton = styled(Button)`
  border: none;
  box-shadow: none;
  background: transparent;
  color: #1a1a1a;
  height: 40px;
  width: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;

  &:hover {
    background: #f5f5f5;
    color: #da1701;
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const AdminPanel = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileDrawerVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "photos",
      icon: <PictureOutlined />,
      label: "Photo Management",
    },
    {
      key: "videos",
      icon: <VideoCameraOutlined />,
      label: "Video Management",
    },
    {
      key: "rentals",
      icon: <ShoppingOutlined />,
      label: "Rental Management",
    },
  ];

  const dashboardCards = [
    {
      key: "photos",
      icon: <PictureOutlined />,
      title: "Photo Management",
      description:
        "Upload, edit, and organize your wedding photography portfolio",
    },
    {
      key: "videos",
      icon: <VideoCameraOutlined />,
      title: "Video Management",
      description: "Manage wedding videos, cinematography, and video galleries",
    },
    {
      key: "rentals",
      icon: <ShoppingOutlined />,
      title: "Rental Management",
      description: "Add and manage camera equipment and rental accessories",
    },
  ];

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    if (isMobile) {
      setMobileDrawerVisible(false);
    }
  };

  const handleDashboardCardClick = (key) => {
    setSelectedKey(key);
  };

  const getCurrentTitle = () => {
    const item = menuItems.find((item) => item.key === selectedKey);
    return item ? item.label : "Dashboard";
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "photos":
        return <PhotoAdmin hideNavFooter={true} />;
      case "videos":
        return <VideoAdmin hideNavFooter={true} />;
      case "rentals":
        return <RentalAdmin hideNavFooter={true} />;
      default:
        return (
          <DashboardContent>
            <DashboardTitle level={1}>Welcome to Admin Panel</DashboardTitle>
            <DashboardSubtitle>
              Manage your wedding portfolio content and rental services
            </DashboardSubtitle>

            <DashboardGrid gutter={[24, 24]} justify="center">
              {dashboardCards.map((card) => (
                <Col xs={24} sm={12} lg={8} key={card.key}>
                  <DashboardCard
                    onClick={() => handleDashboardCardClick(card.key)}
                  >
                    <div className="card-icon">{card.icon}</div>
                    <div className="card-title">{card.title}</div>
                    <div className="card-description">{card.description}</div>
                  </DashboardCard>
                </Col>
              ))}
            </DashboardGrid>
          </DashboardContent>
        );
    }
  };

  const siderContent = (
    <>
      <SiderHeader>
        <SiderTitle>Rivaaz</SiderTitle>
        <SiderSubtitle>Admin Panel</SiderSubtitle>
      </SiderHeader>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          flex: 1,
          borderRight: 0,
          background: "transparent",
          overflow: "auto",
        }}
      />

      <SiderFooter>
        <Button
          type="text"
          icon={<HomeOutlined />}
          block
          style={{
            color: "#666",
            height: "44px",
            borderRadius: "10px",
            fontWeight: 500,
            border: "1px solid #f0f0f0",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#DA1701";
            e.target.style.color = "#DA1701";
            e.target.style.background = "rgba(218, 23, 1, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#f0f0f0";
            e.target.style.color = "#666";
            e.target.style.background = "transparent";
          }}
          onClick={() => (window.location.href = "/")}
        >
          Back to Website
        </Button>
      </SiderFooter>
    </>
  );

  return (
    <AdminLayout>
      <AdminHeader>
        <div style={{ display: "flex", alignItems: "center" }}>
          <MenuButton
            icon={<MenuOutlined />}
            onClick={() => setMobileDrawerVisible(true)}
          />
          <BrandLogo>
            <div className="logo-icon">
              <DashboardOutlined />
            </div>
            <span className="brand-text">{getCurrentTitle()}</span>
          </BrandLogo>
        </div>
      </AdminHeader>

      <Layout style={{ background: "transparent" }}>
        {!isMobile && (
          <AdminSider
            width={280}
            collapsible={false}
            style={{
              position: "fixed",
              left: 0,
              top: 64,
              height: "calc(100vh - 64px)",
              zIndex: 99,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {siderContent}
            </div>
          </AdminSider>
        )}

        <AdminContent style={{ marginLeft: isMobile ? 0 : 280 }}>
          {selectedKey === "dashboard" ? (
            renderContent()
          ) : (
            <ContentWrapper>{renderContent()}</ContentWrapper>
          )}
        </AdminContent>
      </Layout>

      {/* Mobile Drawer */}
      <MobileDrawer
        title="Admin Menu"
        placement="left"
        onClose={() => setMobileDrawerVisible(false)}
        open={mobileDrawerVisible}
        width={280}
        closeIcon={<CloseOutlined />}
      >
        {siderContent}
      </MobileDrawer>
    </AdminLayout>
  );
};

export default AdminPanel;
