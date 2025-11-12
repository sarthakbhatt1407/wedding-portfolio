import React from "react";
import { Row, Col, Typography, Space, Button, Input, Form } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  HeartFilled,
} from "@ant-design/icons";
import styled from "styled-components";

const { Title, Paragraph, Text } = Typography;

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="rgba(255,255,255,0.02)" fill-rule="evenodd"><circle cx="30" cy="30" r="2"/></g></svg>')
      repeat;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;
  position: relative;
  z-index: 1;
`;

const FooterTop = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 60px;
  margin-bottom: 40px;
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterTitle = styled(Title)`
  &.ant-typography {
    color: #fff !important;
    font-family: "Playfair Display", serif !important;
    font-size: 1.8rem !important;
    margin-bottom: 20px !important;
    font-weight: 600 !important;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      border-radius: 2px;
    }
  }
`;

const FooterText = styled(Paragraph)`
  &.ant-typography {
    color: rgba(255, 255, 255, 0.7) !important;
    line-height: 1.8;
    margin-bottom: 20px !important;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;

  &:hover {
    color: #667eea;
    transform: translateX(5px);
  }

  .anticon {
    color: #667eea;
    font-size: 1.2rem;
  }
`;

const SocialButton = styled(Button)`
  &.ant-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    margin: 0 5px;

    .anticon {
      font-size: 1.4rem;
    }

    &:hover {
      transform: translateY(-5px) scale(1.1);
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.2);
      color: #fff;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }

    &.facebook:hover {
      border-color: #1877f2;
      background: rgba(24, 119, 242, 0.2);
      box-shadow: 0 10px 30px rgba(24, 119, 242, 0.3);
    }

    &.instagram:hover {
      border-color: #e4405f;
      background: rgba(228, 64, 95, 0.2);
      box-shadow: 0 10px 30px rgba(228, 64, 95, 0.3);
    }

    &.twitter:hover {
      border-color: #1da1f2;
      background: rgba(29, 161, 242, 0.2);
      box-shadow: 0 10px 30px rgba(29, 161, 242, 0.3);
    }

    &.youtube:hover {
      border-color: #ff0000;
      background: rgba(255, 0, 0, 0.2);
      box-shadow: 0 10px 30px rgba(255, 0, 0, 0.3);
    }
  }
`;

const NewsletterForm = styled.div`
  margin-top: 30px;
`;

const NewsletterInput = styled(Input)`
  &.ant-input {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    border-radius: 25px;
    padding: 12px 20px;
    backdrop-filter: blur(10px);

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:hover,
    &:focus {
      border-color: #667eea;
      box-shadow: 0 0 15px rgba(102, 126, 234, 0.3);
    }
  }
`;

const SubscribeButton = styled(Button)`
  &.ant-btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
    border: none;
    color: #fff;
    border-radius: 25px;
    padding: 0 30px;
    height: 45px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    margin-top: 15px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
  }
`;

const QuickLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: block;
  padding: 8px 0;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #667eea;
    transform: translateX(10px);

    &::before {
      width: 20px;
    }
  }

  &::before {
    content: "";
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 2px;
    background: #667eea;
    transition: width 0.3s ease;
  }
`;

const CopyrightText = styled(Text)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
`;

const HeartIcon = styled(HeartFilled)`
  color: #ff6b6b;
  margin: 0 5px;
  animation: heartbeat 1.5s ease-in-out infinite;

  @keyframes heartbeat {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

const BackToTop = styled(Button)`
  &.ant-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border: none;
    color: #fff;
    font-size: 1.2rem;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
    }

    @media (max-width: 768px) {
      bottom: 20px;
      right: 20px;
      width: 45px;
      height: 45px;
    }
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    "About Us",
    "Our Services",
    "Portfolio",
    "Wedding Packages",
    "Contact Info",
    "Privacy Policy",
    "Terms of Service",
  ];

  const services = [
    "Wedding Photography",
    "Engagement Shoots",
    "Bridal Portraits",
    "Event Photography",
    "Photo Editing",
    "Wedding Albums",
    "Video Production",
  ];

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <FooterTop>
            <Row gutter={[40, 40]}>
              <Col xs={24} sm={12} lg={6}>
                <div data-aos="fade-up">
                  <FooterTitle level={3}>Solène Studio</FooterTitle>
                  <FooterText>
                    We capture the magic of your special day with artistic
                    vision and professional expertise. Every moment becomes a
                    treasured memory.
                  </FooterText>

                  <Space size="small" wrap>
                    <SocialButton
                      className="facebook"
                      icon={<FacebookOutlined />}
                      data-aos="zoom-in"
                      data-aos-delay="100"
                    />
                    <SocialButton
                      className="instagram"
                      icon={<InstagramOutlined />}
                      data-aos="zoom-in"
                      data-aos-delay="200"
                    />
                    <SocialButton
                      className="twitter"
                      icon={<TwitterOutlined />}
                      data-aos="zoom-in"
                      data-aos-delay="300"
                    />
                    <SocialButton
                      className="youtube"
                      icon={<YoutubeOutlined />}
                      data-aos="zoom-in"
                      data-aos-delay="400"
                    />
                  </Space>
                </div>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <div data-aos="fade-up" data-aos-delay="100">
                  <FooterTitle level={4}>Quick Links</FooterTitle>
                  {quickLinks.map((link, index) => (
                    <QuickLink
                      key={index}
                      href="#"
                      data-aos="fade-up"
                      data-aos-delay={150 + index * 50}
                    >
                      {link}
                    </QuickLink>
                  ))}
                </div>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <div data-aos="fade-up" data-aos-delay="200">
                  <FooterTitle level={4}>Our Services</FooterTitle>
                  {services.map((service, index) => (
                    <QuickLink
                      key={index}
                      href="#"
                      data-aos="fade-up"
                      data-aos-delay={250 + index * 50}
                    >
                      {service}
                    </QuickLink>
                  ))}
                </div>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <div data-aos="fade-up" data-aos-delay="300">
                  <FooterTitle level={4}>Get In Touch</FooterTitle>

                  <ContactInfo data-aos="fade-up" data-aos-delay="350">
                    <EnvironmentOutlined />
                    <span>123 Wedding Street, Love City, LC 12345</span>
                  </ContactInfo>

                  <ContactInfo data-aos="fade-up" data-aos-delay="400">
                    <PhoneOutlined />
                    <span>+1 (555) 123-4567</span>
                  </ContactInfo>

                  <ContactInfo data-aos="fade-up" data-aos-delay="450">
                    <MailOutlined />
                    <span>hello@solenestudio.com</span>
                  </ContactInfo>

                  <NewsletterForm data-aos="fade-up" data-aos-delay="500">
                    <FooterText>Subscribe to our newsletter</FooterText>
                    <Form>
                      <NewsletterInput
                        placeholder="Enter your email"
                        suffix={<MailOutlined />}
                      />
                      <SubscribeButton block>Subscribe</SubscribeButton>
                    </Form>
                  </NewsletterForm>
                </div>
              </Col>
            </Row>
          </FooterTop>

          <FooterBottom data-aos="fade-up" data-aos-delay="600">
            <CopyrightText>
              © 2024 Solène Photography Studio. Made with <HeartIcon /> for
              couples in love.
            </CopyrightText>
          </FooterBottom>
        </FooterContent>
      </FooterContainer>

      <BackToTop
        icon="↑"
        onClick={scrollToTop}
        data-aos="fade-up"
        data-aos-delay="700"
      />
    </>
  );
};

export default Footer;
