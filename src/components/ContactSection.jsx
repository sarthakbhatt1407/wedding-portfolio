import React from "react";
import { Row, Col, Typography, Form, Input, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactContainer = styled.section`
  padding: 120px 0;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(Title)`
  &.ant-typography {
    text-align: center;
    font-size: 2.5rem !important;
    font-weight: 300 !important;
    margin-bottom: 20px !important;
    color: #333 !important;
    font-family: "Playfair Display", serif !important;

    @media (max-width: 768px) {
      font-size: 2rem !important;
    }
  }
`;

const SectionSubtitle = styled(Paragraph)`
  &.ant-typography {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 60px !important;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const ContactForm = styled(Form)`
  background: #f8f9fa;
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ContactInfo = styled.div`
  padding: 50px 0;

  @media (max-width: 768px) {
    padding: 30px 0;
    text-align: center;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #4a90a4, #2c5f75);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  color: #fff;
  font-size: 1.2rem;
`;

const ContactText = styled.div`
  h4 {
    margin: 0 0 5px 0;
    color: #333;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #666;
  }
`;

const StyledInput = styled(Input)`
  &.ant-input {
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    padding: 12px 15px;
    font-size: 1rem;

    &:focus {
      border-color: #4a90a4;
      box-shadow: 0 0 0 2px rgba(74, 144, 164, 0.2);
    }
  }
`;

const StyledTextArea = styled(TextArea)`
  &.ant-input {
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    padding: 12px 15px;
    font-size: 1rem;
    resize: none;

    &:focus {
      border-color: #4a90a4;
      box-shadow: 0 0 0 2px rgba(74, 144, 164, 0.2);
    }
  }
`;

const SubmitButton = styled(Button)`
  &.ant-btn {
    background: linear-gradient(135deg, #DA1701, #B81501);
    border: none;
    color: #fff;
    padding: 12px 40px;
    height: auto;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 25px;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #B81501, #A01301);
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(218, 23, 1, 0.3);
    }
  }
`;

const ContactSection = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission here
  };

  return (
    <ContactContainer>
      <Container>
        <SectionTitle level={2}>Get In Touch</SectionTitle>
        <SectionSubtitle>
          Follow our latest stories and let us capture your beautiful moments.
        </SectionSubtitle>

        <Row gutter={[60, 60]} align="middle">
          <Col xs={24} md={12}>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <EnvironmentOutlined />
                </ContactIcon>
                <ContactText>
                  <h4>Our Studio</h4>
                  <p>
                    123 Photography Street
                    <br />
                    New York, NY 10001
                  </p>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <PhoneOutlined />
                </ContactIcon>
                <ContactText>
                  <h4>Call Us</h4>
                  <p>
                    +1 (555) 123-4567
                    <br />
                    +1 (555) 987-6543
                  </p>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>
                  <MailOutlined />
                </ContactIcon>
                <ContactText>
                  <h4>Email Us</h4>
                  <p>
                    hello@weddingphoto.com
                    <br />
                    info@weddingphoto.com
                  </p>
                </ContactText>
              </ContactItem>
            </ContactInfo>
          </Col>

          <Col xs={24} md={12}>
            <ContactForm
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
            >
              <Row gutter={20}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
                    ]}
                  >
                    <StyledInput placeholder="John" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
                    ]}
                  >
                    <StyledInput placeholder="Doe" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <StyledInput placeholder="john@example.com" />
              </Form.Item>

              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: "Please enter a subject" }]}
              >
                <StyledInput placeholder="Wedding Photography Inquiry" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <StyledTextArea
                  rows={5}
                  placeholder="Tell us about your special day..."
                />
              </Form.Item>

              <Form.Item>
                <SubmitButton type="primary" htmlType="submit" size="large">
                  Send Message
                </SubmitButton>
              </Form.Item>
            </ContactForm>
          </Col>
        </Row>
      </Container>
    </ContactContainer>
  );
};

export default ContactSection;
