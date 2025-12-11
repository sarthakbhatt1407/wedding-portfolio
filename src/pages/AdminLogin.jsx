import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
  Spin,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  DashboardOutlined,
  HomeOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  SafetyOutlined,
  HeartFilled,
} from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

const { Content } = Layout;
const { Title, Text } = Typography;

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

// Styled Components
const LoginContainer = styled(Layout)`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #da1701 50%,
    #b81501 75%,
    #1a1a2e 100%
  );
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(120, 119, 198, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 119, 198, 0.3) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        rgba(120, 219, 255, 0.3) 0%,
        transparent 50%
      );
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M40 40L0 80V0l40 40zm0 0l40 40V0L40 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    animation: ${float} 20s ease-in-out infinite;
    z-index: 0;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const LoginContent = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  z-index: 10;
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 380px;
  border: none;
  border-radius: 28px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(218, 23, 1, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px);
  background: rgba(255, 255, 255, 0.98);
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.25),
      0 16px 32px rgba(218, 23, 1, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(
      90deg,
      #da1701 0%,
      #ff6b6b 25%,
      #4ecdc4 50%,
      #45b7d1 75%,
      #96ceb4 100%
    );
    background-size: 300% 100%;
    animation: ${gradient} 3s ease infinite;
  }

  .ant-card-body {
    padding: 40px 35px 35px;
    position: relative;

    @media (max-width: 768px) {
      padding: 35px 30px 30px;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 25px;
    }
  }

  @media (max-width: 768px) {
    margin: 20px;
    border-radius: 24px;
    max-width: 340px;
  }
`;

const FloatingIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;

  .floating-icon {
    position: absolute;
    color: rgba(218, 23, 1, 0.1);
    animation: ${float} 6s ease-in-out infinite;

    &:nth-child(1) {
      top: 10%;
      left: 10%;
      animation-delay: -2s;
      font-size: 24px;
    }

    &:nth-child(2) {
      top: 20%;
      right: 15%;
      animation-delay: -4s;
      font-size: 28px;
    }

    &:nth-child(3) {
      bottom: 20%;
      left: 15%;
      animation-delay: -1s;
      font-size: 20px;
    }

    &:nth-child(4) {
      bottom: 15%;
      right: 10%;
      animation-delay: -3s;
      font-size: 32px;
    }
  }
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;

  .logo-container {
    position: relative;
    display: inline-block;
    margin-bottom: 16px;
  }

  .logo-icon {
    font-size: 3rem;
    background: linear-gradient(135deg, #da1701, #ff6b6b, #4ecdc4);
    background-size: 300% 300%;
    animation: ${gradient} 3s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 4px 8px rgba(218, 23, 1, 0.3));
    animation: ${pulse} 3s ease-in-out infinite;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: radial-gradient(
      circle,
      rgba(218, 23, 1, 0.2) 0%,
      transparent 70%
    );
    border-radius: 50%;
    animation: ${pulse} 3s ease-in-out infinite;

    @media (max-width: 768px) {
      width: 80px;
      height: 80px;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const BrandText = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1a1a1a, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
  letter-spacing: 2px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, #da1701, #ff6b6b);
    border-radius: 1px;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const LoginTitle = styled(Title)`
  &.ant-typography {
    color: #1a1a1a !important;
    font-size: 1.8rem !important;
    font-weight: 700 !important;
    margin-bottom: 8px !important;
    font-family: "Playfair Display", serif;
    text-align: center;
    line-height: 1.2;
    background: linear-gradient(135deg, #1a1a1a, #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;

    @media (max-width: 768px) {
      font-size: 1.6rem !important;
    }
  }
`;

const LoginSubtitle = styled(Text)`
  display: block;
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 24px;
  }
`;

const StyledForm = styled(Form)`
  position: relative;
  z-index: 2;

  .ant-form-item {
    margin-bottom: 20px;
    position: relative;

    @media (max-width: 768px) {
      margin-bottom: 18px;
    }
  }

  .ant-form-item-label {
    padding: 0;
    margin-bottom: 12px;

    > label {
      color: #333;
      font-weight: 600;
      font-size: 1rem;

      @media (max-width: 768px) {
        font-size: 0.95rem;
      }
    }
  }

  .ant-input,
  .ant-input-password {
    height: 48px;
    border-radius: 14px;
    border: 2px solid #f0f0f0;
    padding: 0 18px;
    font-size: 1rem;
    background: rgba(250, 250, 250, 0.8);
    backdrop-filter: blur(10px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &:hover {
      border-color: #da1701;
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(218, 23, 1, 0.12);
    }

    &:focus {
      border-color: #da1701;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(218, 23, 1, 0.12),
        0 6px 20px rgba(218, 23, 1, 0.15);
      transform: translateY(-1px);
    }

    &::placeholder {
      color: #999;
      font-weight: 400;
    }

    @media (max-width: 768px) {
      height: 44px;
      font-size: 0.95rem;
      padding: 0 16px;
    }
  }

  .ant-input-prefix {
    color: #666;
    margin-right: 16px;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      margin-right: 14px;
      font-size: 1.1rem;
    }
  }

  .ant-input-affix-wrapper:focus .ant-input-prefix,
  .ant-input-affix-wrapper-focused .ant-input-prefix {
    color: #da1701;
  }

  .ant-input-suffix {
    .anticon {
      color: #999;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.1rem;

      &:hover {
        color: #da1701;
        transform: scale(1.1);
      }
    }
  }
`;

const LoginButton = styled(Button)`
  &.ant-btn {
    width: 100%;
    height: 48px;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 700;
    background: linear-gradient(135deg, #da1701, #ff6b6b);
    background-size: 200% 200%;
    border: none;
    margin-top: 12px;
    box-shadow: 0 6px 24px rgba(218, 23, 1, 0.25);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 1px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s ease;
    }

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(218, 23, 1, 0.35);
      background-position: right center;

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0);
    }

    &.ant-btn-loading {
      background: linear-gradient(135deg, #da1701, #ff6b6b);
      animation: ${shimmer} 1.5s ease infinite;
    }

    @media (max-width: 768px) {
      height: 44px;
      font-size: 0.95rem;
    }
  }
`;

const BackButton = styled(Button)`
  &.ant-btn {
    position: absolute;
    top: 24px;
    left: 24px;
    color: rgba(255, 255, 255, 0.9);
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    height: 44px;
    border-radius: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
    z-index: 100;

    &:hover {
      color: #fff;
      border-color: rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      top: 20px;
      left: 20px;
      height: 40px;
      font-size: 0.9rem;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  background: linear-gradient(135deg, #fff2f0, #fff5f5);
  border: 1px solid #ffccc7;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
  font-size: 0.95rem;
  line-height: 1.5;
  animation: ${fadeInUp} 0.3s ease-out;
  position: relative;
  box-shadow: 0 4px 12px rgba(255, 77, 79, 0.1);

  &::before {
    content: "⚠️";
    font-size: 1.2rem;
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    padding: 14px 18px;
    font-size: 0.9rem;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  animation: ${fadeInUp} 0.3s ease-out;

  .ant-spin-text {
    color: #666;
    margin-left: 16px;
    font-size: 1rem;
    font-weight: 500;
  }

  .ant-spin-dot {
    font-size: 24px;
  }
`;

// Default admin credentials
const DEFAULT_ADMIN_CREDENTIALS = {
  email: "rivaazfilm@gmail.com",
  password: "@Rivaaz#Films620",
};

const AdminLogin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, adminView } = useSelector((state) => state);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (isAdmin && adminView) {
      navigate("/admin");
    }
  }, [isAdmin, adminView, navigate]);

  const handleLogin = async (values) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { email, password } = values;

      // Simple credential validation (in production, this should be an API call)
      if (
        email === DEFAULT_ADMIN_CREDENTIALS.email &&
        password === DEFAULT_ADMIN_CREDENTIALS.password
      ) {
        // Successful login
        const adminData = {
          token: "admin_token_" + Date.now(),
          name: "Admin",
          email: email,
        };

        dispatch({ type: "adminLogin", data: adminData });
        message.success("Login successful! Welcome to Admin Panel");
        navigate("/admin");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      message.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <LoginContainer>
      <BackButton
        icon={<HomeOutlined />}
        onClick={handleBackToHome}
        type="default"
      >
        Back to Home
      </BackButton>

      <FloatingIcons>
        <SafetyOutlined className="floating-icon" />
        <HeartFilled className="floating-icon" />
        <DashboardOutlined className="floating-icon" />
        <UserOutlined className="floating-icon" />
      </FloatingIcons>

      <LoginContent>
        <LoginCard>
          <LogoSection>
            <div className="logo-container">
              <div className="logo-glow"></div>
              <DashboardOutlined className="logo-icon" />
            </div>
            <BrandText>RIVAAZ ADMIN</BrandText>
          </LogoSection>

          <LoginTitle level={1}>Welcome Back</LoginTitle>
          <LoginSubtitle>
            Sign in to access your wedding portfolio administration dashboard
          </LoginSubtitle>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <StyledForm
            form={form}
            name="admin-login"
            onFinish={handleLogin}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your email address"
                size="large"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                size="large"
                disabled={loading}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <LoginButton
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Sign In to Dashboard"}
              </LoginButton>
            </Form.Item>

            {loading && (
              <LoadingWrapper>
                <Spin size="large" />
                <span className="ant-spin-text">Verifying credentials...</span>
              </LoadingWrapper>
            )}
          </StyledForm>
        </LoginCard>
      </LoginContent>
    </LoginContainer>
  );
};

export default AdminLogin;
