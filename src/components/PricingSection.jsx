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
import { CheckOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const PricingContainer = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
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
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .ant-card-body {
      padding: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    @media (max-width: 1200px) {
      .ant-card-body {
        padding: 35px;
        flex-direction: column;
        text-align: center;
      }
    }

    @media (max-width: 768px) {
      .ant-card-body {
        padding: 25px;
        flex-direction: column;
        text-align: center;
      }
    }

    @media (max-width: 576px) {
      .ant-card-body {
        padding: 20px;
        flex-direction: column;
        text-align: center;
      }
    }

    &.featured {
      box-shadow: 0 20px 50px rgba(212, 175, 55, 0.2);
      border: 2px solid #da1701;

      &::before {
        content: "Most Popular";
        position: absolute;
        top: 15px;
        right: -25px;
        background: linear-gradient(135deg, #da1701, #b81501);
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

    &.custom {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border: 2px solid #da1701;

      &::before {
        content: "Fully Customizable";
        position: absolute;
        top: 15px;
        right: -35px;
        background: linear-gradient(135deg, #da1701, #b81501);
        color: #fff;
        padding: 6px 45px;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transform: rotate(45deg);
        z-index: 10;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        width: 140px;
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
    font-size: 1.8rem !important;
    margin-bottom: 10px !important;
    color: #333 !important;
    font-weight: 500 !important;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 1.3 !important;

    @media (max-width: 768px) {
      font-size: 1.5rem !important;
      text-align: center;
    }
  }
`;

const PlanPrice = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #da1701;
  margin-bottom: 5px;
  font-family: "Playfair Display", serif;
  line-height: 1.1;

  span {
    font-size: 0.8rem;
    font-weight: 400;
    color: #666;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;

    span {
      font-size: 0.7rem;
    }
  }
`;

const PlanDuration = styled(Paragraph)`
  &.ant-typography {
    color: #666;
    margin-bottom: 0 !important;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media (max-width: 768px) {
      text-align: center;
    }
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 40px;

  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 30px;
    text-align: center;
  }
`;

const PackageHeader = styled.div`
  /* flex-shrink: 0; */
  min-width: 200px;
  text-align: left;

  @media (max-width: 1200px) {
    text-align: center;
    min-width: auto;
  }
`;

const PackageFeatures = styled.div`
  /* flex: 4; */
  text-align: left;
  margin: 0 30px;
  width: 100%;
  /* background-color: red; */
  .ant-list {
    text-align: left;
  }

  @media (max-width: 1200px) {
    text-align: left;
    margin: 0;

    .ant-list {
      text-align: left;
    }
  }
`;

const FeatureList = styled(List)`
  .ant-list-item {
    border: none;
    padding: 8px 12px;
    justify-content: flex-start;
    font-size: 0.95rem;
    line-height: 1.4;
    text-align: left;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;

    .anticon {
      color: #da1701;
      margin-right: 10px;
      font-size: 0.95rem;
      flex-shrink: 0;
    }

    .ant-list-item-meta-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }
  }

  @media (max-width: 1200px) {
    .ant-list-item {
      justify-content: flex-start;
      text-align: left;
      white-space: nowrap;
    }
  }

  @media (max-width: 768px) {
    .ant-list-item {
      padding: 6px 8px;
      font-size: 0.9rem;
      text-align: left;
      white-space: nowrap;
    }
  }
`;

const PricingButton = styled(Button)`
  &.ant-btn {
    width: 90%;
    height: 45px;
    border: 2px solid #da1701;
    background: transparent;
    color: #da1701;
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 25px;
    transition: all 0.3s ease;
    margin-top: 20px;
    &:hover {
      background: #da1701;
      color: #fff;
      border-color: #da1701;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
    }

    &.featured {
      background: #da1701;
      color: #fff;

      &:hover {
        background: #b81501;
        border-color: #b81501;
      }
    }

    &.custom-btn {
      background: linear-gradient(135deg, #da1701, #b81501);
      border: 2px solid #da1701;
      color: #fff;

      &:hover {
        background: linear-gradient(135deg, #b81501, #a01301);
        border-color: #b81501;
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(218, 23, 1, 0.4);
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      max-width: 200px;
    }
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    overflow: hidden;
  }

  .ant-modal-header {
    background: linear-gradient(135deg, #da1701 0%, #b81501 100%);
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
      border-color: #da1701;
      box-shadow: 0 0 0 2px rgba(218, 23, 1, 0.1);
    }
  }
`;

const SubmitButton = styled(Button)`
  &.ant-btn {
    width: 100%;
    height: 45px;
    background: linear-gradient(135deg, #da1701 0%, #b81501 100%);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;

    &:hover {
      background: linear-gradient(135deg, #b81501 0%, #a01301 100%);
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

  const weddingPackages = [
    {
      name: "Mundri",
      price: 40000,
      duration: "Wedding Package",
      features: [
        "40 Sheet Album NTR",
        "Acrylic Pad Included",
        "FHD Video (1920x1080)",
        "2 Photo Frames (16x24)",
        "Professional Photographer",
        "Videographer",
        "Complete Wedding Coverage",
        "Digital Gallery Access",
      ],
      featured: false,
    },
    {
      name: "Nathuli",
      price: 60000,
      duration: "Wedding Package",
      features: [
        "50 Sheet Album NTR",
        "Acrylic Pad Included",
        "Candid Photography",
        "FHD Video (1920x1080)",
        "Drone Photography",
        "Photo Frames (16x24, 20x30)",
        "Professional Photographer",
        "Videographer",
        "Candid Shooter",
        "Drone Operator",
      ],
      featured: false,
    },
    {
      name: "Guloband",
      price: 80000,
      duration: "Wedding Package",
      features: [
        "53 Sheet Album NTR + 2 MT (Emboss)",
        "Acrylic Pad Included",
        "Candid Photography",
        "FHD Video (1920x1080)",
        "Drone Photography",
        "Cinematography",
        "2 Welcome Standy Frames (20x30)",
        "Professional Photographer",
        "Videographer",
        "Candid Shooter",
        "Drone Operator",
        "Cinematographer",
      ],
      featured: true,
    },
    {
      name: "Timaniya",
      price: 140000,
      duration: "Complete Wedding",
      features: [
        "Pre-Wedding Cinematic Video",
        "15 Sheet Pre-Wedding Album",
        "58 Sheet Album NTR + 2 MT (Emboss)",
        "Acrylic Pad Included",
        "Candid Photography",
        "FHD Video (1920x1080)",
        "Drone Photography",
        "Cinematography",
        "LED Wall (8x12)",
        "Photo Frame (20x30)",
        "4 LED Welcome Frames (20x30 Magic Touch)",
        "Complete Professional Team",
        "Premium Wedding Coverage",
      ],
      featured: false,
    },
    {
      name: "Custom Package",
      price: "Let's Discuss",
      duration: "Tailored for You",
      features: [
        "Customizable Photography Hours",
        "Choose Your Album Size & Style",
        "Select Video Quality & Duration",
        "Pick Your Photo Frame Sizes",
        "Choose Your Team Size",
        "Add Drone Photography (Optional)",
        "Include Cinematography (Optional)",
        "LED Wall Setup (Optional)",
        "Pre-Wedding Shoot (Optional)",
        "Candid Photography (Optional)",
        "Professional Makeup Artist (Optional)",
        "Flexible Pricing Options",
        "Personalized Service Package",
        "Complete Wedding Coverage",
      ],
      featured: false,
      isCustom: true,
    },
  ];

  return (
    <PricingContainer>
      <Container>
        <SectionTitle level={2}>Wedding Photography Packages</SectionTitle>
        <SectionSubtitle>
          Choose the perfect wedding photography package that captures every
          precious moment of your special day with professional excellence.
        </SectionSubtitle>

        <Row gutter={[0, 40]} justify="center" align="stretch">
          {weddingPackages.map((pkg, index) => (
            <Col xs={24} key={index}>
              <PricingCard
                className={
                  pkg.featured ? "featured" : pkg.isCustom ? "custom" : ""
                }
                featured={pkg.featured}
              >
                <CardContent>
                  <PackageHeader>
                    <PlanName level={3}>{pkg.name}</PlanName>
                    <PlanPrice>
                      {pkg.isCustom ? (
                        <span
                          style={{ fontSize: "1.8rem", fontStyle: "italic" }}
                        >
                          {pkg.price}
                        </span>
                      ) : (
                        `₹${pkg.price.toLocaleString("en-IN")}`
                      )}
                    </PlanPrice>
                    <PlanDuration>{pkg.duration}</PlanDuration>
                    <PricingButton
                      className={
                        pkg.featured
                          ? "featured"
                          : pkg.isCustom
                          ? "custom-btn"
                          : ""
                      }
                      onClick={showModal}
                    >
                      {pkg.isCustom ? "Customize Now" : "Book This Package"}
                    </PricingButton>
                  </PackageHeader>

                  <PackageFeatures>
                    <FeatureList
                      grid={{
                        gutter: [20, 8],
                        column: 2,
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 2,
                        xl: 2,
                      }}
                      dataSource={pkg.features}
                      renderItem={(feature) => {
                        return (
                          <>
                            <List.Item style={{ display: "flex" }}>
                              <CheckOutlined />
                              <div
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  // textOverflow: "ellipsis",
                                  textWrap: "wrap",
                                }}
                              >
                                <span> {feature}</span>
                              </div>
                            </List.Item>
                          </>
                        );
                      }}
                    />
                  </PackageFeatures>

                  {/* <PackageActions>
                 
                  </PackageActions> */}
                </CardContent>
              </PricingCard>
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
                  pattern: /^[+]?[1-9][\d]{0,15}$/,
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
