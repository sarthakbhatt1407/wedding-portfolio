import React, { useState, useEffect } from "react";
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
  Spin,
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
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch rental items from API
  const fetchRentals = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/get-rental`
      );
      const data = await response.json();
      console.log(data);

      // Transform API data to match component structure and filter only available items
      const transformedItems = data
        .filter((item) => item.available) // Only show available items
        .map((item) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          price: `₹${item.price}`,
          period: item.period,
          image: `${process.env.REACT_APP_BASE_URL}/${item.link}`,
          available: item.available,
          specification: item.specification
            ? item.specification.split(",").map((s) => s.trim())
            : [],
          included: item.included
            ? item.included.split(",").map((s) => s.trim())
            : [],
          type: item.type,
          rating: 4.5, // Default rating since it's not in schema
          specs: item.specification
            ? item.specification.split(",").map((s) => s.trim())
            : [],
          includes: item.included
            ? item.included.split(",").map((s) => s.trim())
            : [],
        }));

      setRentals(transformedItems);
    } catch (error) {
      console.error("Error fetching rental items:", error);
      message.error("Failed to load rental items");
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchRentals();
  }, []);

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

  const handleViewDetails = (item) => {
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

          {loading ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <Spin size="large" />
              <div style={{ marginTop: 16, color: "#666" }}>
                Loading rental items...
              </div>
            </div>
          ) : (
            <Row gutter={[30, 30]}>
              {rentals.map((item) => (
                <Col xs={24} sm={12} lg={8} key={item.id}>
                  <RentalCard
                    cover={<img alt={item.name} src={item.image} />}
                    actions={[
                      <Button
                        type="text"
                        icon={<InfoCircleOutlined />}
                        onClick={() => handleViewDetails(item)}
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
          )}
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
