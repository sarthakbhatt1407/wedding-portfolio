import React, { useState } from "react";
import {
  Row,
  Col,
  Typography,
  Card,
  Button,
  List,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
} from "antd";
import { CheckOutlined, StarOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const PricingContainer = styled.section`
  padding: 120px 0;
  background: #f8f9fa;
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

const PricingCard = styled(Card)`
  &.ant-card {
    border: none;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    text-align: center;
    height: 550px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .ant-card-body {
      padding: 40px 30px;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    @media (max-width: 1200px) {
      height: 520px;

      .ant-card-body {
        padding: 35px 25px;
      }
    }

    @media (max-width: 992px) {
      height: 500px;

      .ant-card-body {
        padding: 30px 20px;
      }
    }

    @media (max-width: 768px) {
      height: auto;
      min-height: 450px;

      .ant-card-body {
        padding: 25px 20px;
      }
    }

    @media (max-width: 576px) {
      min-height: 400px;

      .ant-card-body {
        padding: 20px 15px;
      }
    }

    @media (max-width: 480px) {
      min-height: 380px;
    }

    &.featured {
      box-shadow: 0 20px 50px rgba(212, 175, 55, 0.2);
      border: 2px solid #d4af37;

      &::before {
        content: "Most Popular";
        position: absolute;
        top: 15px;
        right: -25px;
        background: linear-gradient(135deg, #d4af37, #f1c40f);
        color: #fff;
        padding: 6px 35px;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transform: rotate(45deg);
        z-index: 10;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        width: 120px;
        text-align: center;
      }
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
      height: auto;
      min-height: 450px;
    }
  }
`;

const PlanName = styled(Title)`
  &.ant-typography {
    font-size: 1.5rem !important;
    margin-bottom: 10px !important;
    color: #333 !important;
    font-weight: 500 !important;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const PlanPrice = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 5px;
  font-family: "Playfair Display", serif;

  span {
    font-size: 1rem;
    font-weight: 400;
    color: #666;
  }
`;

const PlanDuration = styled(Paragraph)`
  &.ant-typography {
    color: #666;
    margin-bottom: 30px !important;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px;
`;

const CardFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;

const FeatureList = styled(List)`
  margin-bottom: 30px;
  flex: 1;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .ant-list-item {
    border: none;
    padding: 8px 0;
    justify-content: flex-start;

    .anticon {
      color: #d4af37;
      margin-right: 10px;
      font-size: 1rem;
    }
  }
`;

const PricingButton = styled(Button)`
  &.ant-btn {
    width: 100%;
    height: 45px;
    border: 2px solid #d4af37;
    background: transparent;
    color: #d4af37;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 25px;
    transition: all 0.3s ease;

    &:hover {
      background: #d4af37;
      color: #fff;
      border-color: #d4af37;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
    }

    &.featured {
      background: #d4af37;
      color: #fff;

      &:hover {
        background: #f1c40f;
        border-color: #f1c40f;
      }
    }
  }
`;

const CustomCard = styled(PricingCard)`
  &.ant-card {
    background: #fff;
    color: #333;
    height: 550px;

    .ant-card-body {
      text-align: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
      height: auto;
      min-height: 450px;
    }
  }
`;
const CustomPlanName = styled(PlanName)`
  &.ant-typography {
    color: #333 !important;
  }
`;

const CustomPlanPrice = styled(PlanPrice)`
  color: #d4af37;
`;

const CustomFeatureList = styled(FeatureList)`
  .ant-list-item {
    color: #333;

    .anticon {
      color: #d4af37;
    }
  }
`;

const CustomButton = styled(PricingButton)`
  &.ant-btn {
    background: linear-gradient(135deg, #d4af37, #f1c40f);
    border: 2px solid transparent;
    color: #fff;

    &:hover {
      background: linear-gradient(135deg, #f1c40f, #d4af37);
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
    }
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    overflow: hidden;
  }

  .ant-modal-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;

    .ant-modal-title {
      color: #fff;
      font-family: "Playfair Display", serif;
      font-size: 1.5rem;
      font-weight: 300;
    }
  }

  .ant-modal-close {
    color: #fff;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .ant-modal-body {
    padding: 30px;
  }
`;

const FormTitle = styled.h3`
  color: #333;
  font-family: "Playfair Display", serif;
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    color: #333;
    font-weight: 500;
  }

  .ant-input,
  .ant-picker {
    border-radius: 8px;
    border: 1px solid #d9d9d9;

    &:hover,
    &:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
    }
  }
`;

const SubmitButton = styled(Button)`
  &.ant-btn {
    width: 100%;
    height: 45px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;

    &:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
      transform: translateY(-1px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }
  }
`;

const PricingSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    console.log("Custom Plan Form Data:", values);
    message.success(
      "Your custom plan request has been submitted successfully!"
    );
    setIsModalVisible(false);
    form.resetFields();
  };

  const pricingPlans = [
    {
      name: "Standard",
      price: 291,
      duration: "Package",
      features: [
        "4 Hours Photography",
        "50 Edited Photos",
        "Online Gallery",
        "Basic Retouching",
      ],
      featured: false,
    },
    {
      name: "Premium",
      price: 491,
      duration: "Package",
      features: [
        "8 Hours Photography",
        "100 Edited Photos",
        "Online Gallery",
        "Advanced Retouching",
        "Engagement Session",
      ],
      featured: true,
    },
    {
      name: "Luxury",
      price: 791,
      duration: "Package",
      features: [
        "Full Day Photography",
        "200+ Edited Photos",
        "Premium Online Gallery",
        "Advanced Retouching",
        "Engagement Session",
        "Wedding Album",
      ],
      featured: false,
    },
    {
      name: "Custom",
      price: "?",
      duration: "Let's Talk",
      features: [
        "Tailored to Your Needs",
        "Unlimited Photography Hours",
        "Custom Photo Packages",
        "Personalized Services",
        "Flexible Pricing",
      ],
      featured: false,
      custom: true,
    },
  ];

  return (
    <PricingContainer>
      <Container>
        <SectionTitle level={2}>Pricing Plans</SectionTitle>
        <SectionSubtitle>
          Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
          expetendis in mei.
        </SectionSubtitle>

        <Row gutter={[40, 40]} justify="center">
          {pricingPlans.map((plan, index) => (
            <Col xs={24} lg={6} key={index}>
              {plan.custom ? (
                <CustomCard>
                  <CardContent>
                    <CustomPlanName level={3}>
                      <StarOutlined style={{ marginRight: 8 }} />
                      {plan.name}
                    </CustomPlanName>
                    <CustomPlanPrice>
                      {plan.price}
                      <span>/{plan.duration}</span>
                    </CustomPlanPrice>
                    <PlanDuration>{plan.duration}</PlanDuration>

                    <CustomFeatureList
                      dataSource={plan.features}
                      renderItem={(feature) => (
                        <List.Item>
                          <CheckOutlined />
                          {feature}
                        </List.Item>
                      )}
                    />
                  </CardContent>

                  <CardFooter>
                    <CustomButton onClick={showModal}>Choose Plan</CustomButton>
                  </CardFooter>
                </CustomCard>
              ) : (
                <PricingCard
                  className={plan.featured ? "featured" : ""}
                  featured={plan.featured}
                >
                  <CardContent>
                    <PlanName level={3}>{plan.name}</PlanName>
                    <PlanPrice>
                      ${plan.price}
                      <span>/{plan.duration}</span>
                    </PlanPrice>
                    <PlanDuration>{plan.duration}</PlanDuration>

                    <FeatureList
                      dataSource={plan.features}
                      renderItem={(feature) => (
                        <List.Item>
                          <CheckOutlined />
                          {feature}
                        </List.Item>
                      )}
                    />
                  </CardContent>

                  <CardFooter>
                    <PricingButton className={plan.featured ? "featured" : ""}>
                      Choose Plan
                    </PricingButton>
                  </CardFooter>
                </PricingCard>
              )}
            </Col>
          ))}
        </Row>

        <StyledModal
          title="Custom Plan Request"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={500}
        >
          <FormTitle>Let's create your perfect wedding package!</FormTitle>
          <StyledForm
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input placeholder="Enter your full name" size="large" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^[\+]?[1-9][\d]{0,15}$/,
                  message: "Please enter a valid phone number",
                },
              ]}
            >
              <Input placeholder="Enter your phone number" size="large" />
            </Form.Item>

            <Form.Item
              label="Preferred Booking Date"
              name="bookingDate"
              rules={[
                {
                  required: true,
                  message: "Please select your preferred booking date",
                },
              ]}
            >
              <DatePicker
                placeholder="Select booking date"
                size="large"
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
              />
            </Form.Item>

            <Form.Item
              label="Additional Requirements (Optional)"
              name="requirements"
            >
              <Input.TextArea
                rows={4}
                placeholder="Tell us about your specific needs, event details, or any special requirements..."
              />
            </Form.Item>

            <Form.Item>
              <SubmitButton htmlType="submit">Submit Request</SubmitButton>
            </Form.Item>
          </StyledForm>
        </StyledModal>
      </Container>
    </PricingContainer>
  );
};

export default PricingSection;
