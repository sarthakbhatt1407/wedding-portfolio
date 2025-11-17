import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Modal,
  Tag,
  Rate,
  message,
} from "antd";
import {
  CameraOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import FloatingNav from "../components/FloatingNav";
import Footer from "../components/Footer";

const { Title, Paragraph, Text } = Typography;

const RentalContainer = styled.div`
  padding: 120px 0 60px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const PageTitle = styled(Title)`
  &.ant-typography {
    font-size: 3rem !important;
    font-weight: 300 !important;
    color: #333 !important;
    margin-bottom: 20px !important;
    font-family: "Playfair Display", serif !important;

    @media (max-width: 768px) {
      font-size: 2.5rem !important;
    }
  }
`;

const PageSubtitle = styled(Paragraph)`
  &.ant-typography {
    font-size: 1.2rem !important;
    color: #666 !important;
    max-width: 600px !important;
    margin: 0 auto !important;
    line-height: 1.8 !important;
  }
`;

const RentalCard = styled(Card)`
  &.ant-card {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 100%;
    border: none;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .ant-card-cover {
      height: 250px;
      overflow: hidden;
    }

    .ant-card-cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover .ant-card-cover img {
      transform: scale(1.1);
    }

    .ant-card-body {
      padding: 24px;
      height: calc(100% - 250px - 52px); // Subtract cover and actions height
    }

    .ant-card-actions {
      display: flex;
      background: #fafafa;
      border-top: 1px solid #f0f0f0;
      padding: 0;

      li {
        flex: 1;
        margin: 0;
        padding: 12px 8px;
        text-align: center;
        border-right: 1px solid #f0f0f0;

        &:last-child {
          border-right: none;
        }

        .ant-btn {
          width: 100%;
          height: 36px;
          border: none;
          background: transparent;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;

          &:hover {
            background: rgba(218, 23, 1, 0.1);
          }

          &:disabled {
            background: transparent;

            &:hover {
              background: transparent;
            }
          }
        }
      }
    }
  }
`;

const ItemName = styled(Title)`
  &.ant-typography {
    font-size: 1.5rem !important;
    font-weight: 600 !important;
    margin-bottom: 10px !important;
    color: #333 !important;
  }
`;

const ItemDescription = styled(Paragraph)`
  &.ant-typography {
    color: #666 !important;
    margin-bottom: 15px !important;
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #da1701;

  .period {
    font-size: 0.9rem;
    color: #666;
    font-weight: 400;
  }
`;

const AvailabilityTag = styled(Tag)`
  &.ant-tag {
    border: none;
    border-radius: 15px;
    padding: 4px 12px;
    font-weight: 500;

    &.available {
      background: linear-gradient(45deg, #52c41a, #73d13d);
      color: #fff;
    }

    &.rented {
      background: linear-gradient(45deg, #ff4d4f, #ff7875);
      color: #fff;
    }
  }
`;

const SpecsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #666;

    .anticon {
      color: #da1701;
      margin-right: 8px;
      font-size: 0.8rem;
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

const RentalService = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems || []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToCart = (item) => {
    // Check if item already exists in cart
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name && cartItem.price === item.price
    );

    if (existingItem) {
      message.warning(`${item.name} is already in your cart!`);
      return;
    }

    dispatch({ type: "addToCart", data: item });
    message.success(`${item.name} added to cart!`);
  };

  const rentalItems = [
    {
      id: 1,
      name: "Canon EOS R5",
      description: "Professional mirrorless camera with 45MP full-frame sensor",
      price: "₹2,500",
      period: "per day",
      image:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      rating: 4.8,
      specs: [
        "45MP Full Frame Sensor",
        "8K Video Recording",
        "Image Stabilization",
        "Dual Memory Card Slots",
        '3.2" Vari-angle Touchscreen',
      ],
      includes: [
        "Camera Body",
        "Battery",
        "Charger",
        "Memory Card",
        "Camera Strap",
      ],
    },
    {
      id: 2,
      name: "Sony FX3 Cinema Camera",
      description: "Full-frame cinema camera for professional video production",
      price: "₹4,000",
      period: "per day",
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      rating: 4.9,
      specs: [
        "Full Frame 4K 120p",
        "S-Cinetone Color Science",
        "Dual Base ISO",
        "Active Image Stabilization",
        "Professional Audio Inputs",
      ],
      includes: [
        "Camera Body",
        "2x Batteries",
        "Charger",
        "Handle",
        "Recording Media",
      ],
    },
    {
      id: 3,
      name: "Canon RF 24-70mm f/2.8",
      description: "Professional zoom lens for portraits and events",
      price: "₹800",
      period: "per day",
      image:
        "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: false,
      rating: 4.7,
      specs: [
        "f/2.8 Constant Aperture",
        "Image Stabilization",
        "Weather Sealed",
        "Ultra-low Dispersion Elements",
        "Control Ring",
      ],
      includes: ["Lens", "Front & Rear Caps", "Lens Hood", "Cleaning Cloth"],
    },
    {
      id: 4,
      name: "DJI Ronin SC Gimbal",
      description: "3-axis handheld gimbal for smooth camera movements",
      price: "₹1,200",
      period: "per day",
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      rating: 4.6,
      specs: [
        "3-Axis Stabilization",
        "12 Hour Battery Life",
        "2.2kg Payload",
        "ActiveTrack 3.0",
        "Force Mobile Integration",
      ],
      includes: ["Gimbal", "Handle", "Battery", "Charger", "Carrying Case"],
    },
    {
      id: 5,
      name: "Godox AD600Pro Flash",
      description: "Portable studio flash with wireless control",
      price: "₹1,500",
      period: "per day",
      image:
        "https://images.unsplash.com/photo-1555881400-69d7e38fb6d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      rating: 4.5,
      specs: [
        "600Ws Flash Power",
        "TTL & HSS Support",
        "2.4G Wireless System",
        "300W Modeling Lamp",
        "Fast Recycle Time",
      ],
      includes: [
        "Flash Unit",
        "Battery",
        "Charger",
        "Reflector",
        "Wireless Trigger",
      ],
    },
    {
      id: 6,
      name: "Manfrotto Carbon Tripod",
      description: "Professional carbon fiber tripod for stability",
      price: "₹600",
      period: "per day",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: true,
      rating: 4.4,
      specs: [
        "Carbon Fiber Construction",
        "10kg Load Capacity",
        "Quick Release Plate",
        "Adjustable Leg Angles",
        "Compact Folding Design",
      ],
      includes: ["Tripod", "Ball Head", "Quick Release Plate", "Carrying Bag"],
    },
  ];

  const showDetails = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <>
      <FloatingNav />
      <RentalContainer>
        <Container>
          <PageHeader>
            <PageTitle level={1}>Camera Rental Service</PageTitle>
            <PageSubtitle>
              Professional camera equipment for your photography and videography
              needs. High-quality gear at affordable rates with flexible rental
              periods.
            </PageSubtitle>
          </PageHeader>

          <Row gutter={[30, 30]}>
            {rentalItems.map((item) => (
              <Col xs={24} sm={12} lg={8} key={item.id}>
                <RentalCard
                  cover={<img alt={item.name} src={item.image} />}
                  actions={[
                    <Button
                      type="text"
                      icon={<InfoCircleOutlined />}
                      onClick={() => showDetails(item)}
                    >
                      Details
                    </Button>,
                    <Button
                      type="text"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                      style={{
                        color: item.available ? "#DA1701" : "#ccc",
                        borderColor: item.available ? "#DA1701" : "#ccc",
                      }}
                    >
                      Add to Cart
                    </Button>,
                  ]}
                >
                  <div>
                    <ItemName level={4}>{item.name}</ItemName>
                    <Rate
                      disabled
                      defaultValue={item.rating}
                      style={{ fontSize: "14px", marginBottom: "10px" }}
                    />
                    <ItemDescription>{item.description}</ItemDescription>

                    <SpecsList>
                      {item.specs.slice(0, 3).map((spec, index) => (
                        <li key={index}>
                          <CheckCircleOutlined />
                          {spec}
                        </li>
                      ))}
                    </SpecsList>

                    <PriceContainer>
                      <Price>
                        {item.price}
                        <span className="period"> {item.period}</span>
                      </Price>
                      <AvailabilityTag
                        className={item.available ? "available" : "rented"}
                      >
                        {item.available ? "Available" : "Rented"}
                      </AvailabilityTag>
                    </PriceContainer>
                  </div>
                </RentalCard>
              </Col>
            ))}
          </Row>
        </Container>
      </RentalContainer>

      <StyledModal
        title={selectedItem?.name}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedItem && (
          <div>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            />

            <Rate
              disabled
              defaultValue={selectedItem.rating}
              style={{ marginBottom: "15px" }}
            />

            <Paragraph style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
              {selectedItem.description}
            </Paragraph>

            <Title level={5} style={{ color: "#DA1701", marginBottom: "10px" }}>
              <DollarCircleOutlined /> Pricing
            </Title>
            <Text
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#DA1701",
              }}
            >
              {selectedItem.price}
            </Text>
            <Text style={{ color: "#666", marginLeft: "10px" }}>
              {selectedItem.period}
            </Text>

            <Title
              level={5}
              style={{
                color: "#DA1701",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              <CameraOutlined /> Specifications
            </Title>
            <SpecsList>
              {selectedItem.specs.map((spec, index) => (
                <li key={index}>
                  <CheckCircleOutlined />
                  {spec}
                </li>
              ))}
            </SpecsList>

            <Title
              level={5}
              style={{
                color: "#DA1701",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              <CheckCircleOutlined /> What's Included
            </Title>
            <SpecsList>
              {selectedItem.includes.map((item, index) => (
                <li key={index}>
                  <CheckCircleOutlined />
                  {item}
                </li>
              ))}
            </SpecsList>
          </div>
        )}
      </StyledModal>

      <Footer />
    </>
  );
};

export default RentalService;
