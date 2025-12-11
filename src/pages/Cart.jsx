import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FloatingNav from "../components/FloatingNav";
import Footer from "../components/Footer";
import styled from "styled-components";

const { Title, Text } = Typography;

// Clean minimal container
const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
  padding: 100px 20px 40px;
`;

// Simple card styling
const CartCard = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .ant-card-body {
    padding: 32px;
  }
`;

// Clean item container
const ItemContainer = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  background: white;

  &:hover {
    border-color: #da1701;
    transition: border-color 0.2s ease;
  }
`;

// Simple buttons
const PrimaryButton = styled(Button)`
  background-color: #da1701;
  border-color: #da1701;
  border-radius: 6px;

  &:hover {
    background-color: #b81501;
    border-color: #b81501;
  }

  &:focus {
    background-color: #da1701;
    border-color: #da1701;
  }
`;

const SecondaryButton = styled(Button)`
  border: 1px solid #d9d9d9;
  border-radius: 6px;

  &:hover {
    border-color: #da1701;
    color: #da1701;
  }
`;

// Minimal total section
const TotalSection = styled.div`
  background: #f5f5f5;
  padding: 24px;
  border-radius: 8px;
  margin: 24px 0;
  border-left: 4px solid #da1701;
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 60px 20px;

  .empty-icon {
    color: #d9d9d9;
    font-size: 48px;
    margin-bottom: 16px;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    overflow: hidden;
    margin: 16px;

    @media (max-width: 768px) {
      margin: 8px;
    }
  }

  .ant-modal-header {
    background: linear-gradient(135deg, #da1701, #b81501);
    border: none;
    padding: 16px 24px;

    @media (max-width: 768px) {
      padding: 12px 16px;
    }

    .ant-modal-title {
      color: #fff;
      font-size: 1.5rem;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 1.2rem;
        line-height: 1.4;
      }

      @media (max-width: 480px) {
        font-size: 1rem;
      }
    }
  }

  .ant-modal-close {
    color: #fff;
    top: 16px;
    right: 24px;

    @media (max-width: 768px) {
      top: 12px;
      right: 16px;

      .ant-modal-close-x {
        width: 44px;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
      }
    }

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .ant-modal-body {
    padding: 30px;

    @media (max-width: 768px) {
      padding: 20px 16px;
    }

    @media (max-width: 480px) {
      padding: 16px 12px;
    }
  }

  /* Make the modal responsive */
  @media (max-width: 768px) {
    max-width: calc(100vw - 32px);
    width: calc(100vw - 32px) !important;
  }

  @media (max-width: 480px) {
    max-width: calc(100vw - 16px);
    width: calc(100vw - 16px) !important;

    .ant-modal-content {
      margin: 8px 0;
    }
  }
`;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const cartItems = useSelector((state) => state.cartItems || []);
  const cartTotalAmount = useSelector((state) => state.cartTotalAmount || 0);

  const handleRemoveItem = (item) => {
    dispatch({ type: "itemRemover", data: item });
  };

  const handleClearCart = () => {
    dispatch({ type: "clearCart" });
  };

  const handleContinueShopping = () => {
    navigate("/rental");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleProceedToCheckout = () => {
    setCheckoutModalVisible(true);
  };

  const handleCheckoutSubmit = async (values) => {
    setSubmitting(true);
    try {
      // Format dates and prepare booking data
      const bookingData = {
        name: values.name,
        phone: values.phone,
        bookingDateFrom: values.bookingDateFrom.format("YYYY-MM-DD"),
        bookingDateTo: values.bookingDateTo.format("YYYY-MM-DD"),
        notes: values.notes || "",
        rentalItem: cartItems,
        totalAmount: cartTotalAmount,

        status: "pending",
        orderDate: new Date().toISOString().split("T")[0],
        amount: cartTotalAmount,
      };

      console.log("Booking Data:", bookingData);

      // Submit to backend API
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/add-rental-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit booking");
      }

      console.log("Booking Response:", result);
      message.success("Booking request submitted successfully!");
      setCheckoutModalVisible(false);
      form.resetFields();

      // Clear cart after successful booking
      dispatch({ type: "clearCart" });
    } catch (error) {
      console.error("Checkout error:", error);
      message.error(
        error.message || "Failed to submit booking request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <FloatingNav />
        <Container>
          <CartCard>
            <EmptyStateContainer>
              <div className="empty-icon">
                <ShoppingCartOutlined />
              </div>
              <Title level={3} style={{ color: "#666", marginBottom: "8px" }}>
                Your cart is empty
              </Title>
              <Text style={{ color: "#999", fontSize: "16px" }}>
                Add some rental equipment to get started
              </Text>
              <div style={{ marginTop: "32px" }}>
                <PrimaryButton
                  size="large"
                  onClick={handleContinueShopping}
                  style={{ marginRight: "12px" }}
                >
                  Browse Equipment
                </PrimaryButton>
                <SecondaryButton
                  size="large"
                  onClick={handleGoHome}
                  icon={<HomeOutlined />}
                >
                  Go Home
                </SecondaryButton>
              </div>
            </EmptyStateContainer>
          </CartCard>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <FloatingNav />
      <Container>
        <CartCard>
          <Row align="middle" style={{ marginBottom: "32px" }}>
            <Col>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleContinueShopping}
                style={{ color: "#666" }}
              >
                Back to Rentals
              </Button>
            </Col>
          </Row>

          <Title level={2} style={{ marginBottom: "8px", color: "#333" }}>
            Shopping Cart
          </Title>
          <Text style={{ color: "#666", fontSize: "16px" }}>
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
            cart
          </Text>

          <Divider style={{ margin: "32px 0" }} />

          {cartItems.map((item, index) => (
            <ItemContainer key={`${item.name}-${item.price}-${index}`}>
              <Row align="middle" gutter={[16, 16]}>
                <Col xs={24} sm={18}>
                  <Title
                    level={4}
                    style={{ margin: 0, marginBottom: "4px", color: "#333" }}
                  >
                    {item.name}
                  </Title>
                  <Text style={{ color: "#666" }}>
                    {item.description || "Professional equipment rental"}
                  </Text>
                  <div style={{ marginTop: "8px" }}>
                    <Text strong style={{ fontSize: "18px", color: "#DA1701" }}>
                      {item.price}
                    </Text>
                  </div>
                </Col>
                <Col xs={24} sm={6} style={{ textAlign: "right" }}>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(item)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </ItemContainer>
          ))}

          <TotalSection>
            <Row justify="space-between" align="middle">
              <Col>
                <Text style={{ fontSize: "16px", color: "#666" }}>Total</Text>
              </Col>
              <Col>
                <Title level={3} style={{ margin: 0, color: "#333" }}>
                  ₹{cartTotalAmount.toLocaleString()}
                </Title>
              </Col>
            </Row>
          </TotalSection>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <SecondaryButton
                size="large"
                block
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </SecondaryButton>
            </Col>
            <Col xs={24} sm={12}>
              <PrimaryButton
                type="primary"
                size="large"
                block
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </PrimaryButton>
            </Col>
          </Row>

          {cartItems.length > 1 && (
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Button
                type="text"
                onClick={handleClearCart}
                style={{ color: "#999" }}
              >
                Clear all items
              </Button>
            </div>
          )}
        </CartCard>
      </Container>

      {/* Checkout Modal */}
      <StyledModal
        title="Complete Your Booking"
        open={checkoutModalVisible}
        onCancel={() => {
          setCheckoutModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={window.innerWidth <= 768 ? "95%" : 600}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCheckoutSubmit}
          style={{ marginTop: 20 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  { required: true, message: "Please enter your full name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                ]}
              >
                <Input placeholder="Enter your full name" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your phone number"
                  size="large"
                  maxLength={10}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="bookingDateFrom"
                label="Booking Start Date"
                rules={[
                  {
                    required: true,
                    message: "Please select booking start date",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Select start date"
                  size="large"
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    // Disable past dates
                    return current && current.isBefore(new Date(), "day");
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="bookingDateTo"
                label="Booking End Date"
                rules={[
                  { required: true, message: "Please select booking end date" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const startDate = getFieldValue("bookingDateFrom");
                      if (!value || !startDate) {
                        return Promise.resolve();
                      }
                      if (
                        value.isAfter(startDate) ||
                        value.isSame(startDate, "day")
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("End date must be after start date")
                      );
                    },
                  }),
                ]}
              >
                <DatePicker
                  placeholder="Select end date"
                  size="large"
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    const startDate = form.getFieldValue("bookingDateFrom");
                    if (startDate) {
                      return current && current.isBefore(startDate, "day");
                    }
                    return current && current.isBefore(new Date(), "day");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="notes" label="Additional Notes (Optional)">
            <Input.TextArea
              placeholder="Any special requirements or notes..."
              rows={3}
              size="large"
            />
          </Form.Item>

          <div
            style={{
              background: "#f5f5f5",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Text style={{ fontSize: "16px", color: "#666" }}>
                  Total Amount ({cartItems.length} item
                  {cartItems.length !== 1 ? "s" : ""})
                </Text>
              </Col>
              <Col>
                <Text
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#da1701",
                  }}
                >
                  ₹{cartTotalAmount.toLocaleString()}
                </Text>
              </Col>
            </Row>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Button
                  size="large"
                  block
                  onClick={() => {
                    setCheckoutModalVisible(false);
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs={24} sm={12}>
                <PrimaryButton
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={submitting}
                >
                  {submitting ? "Submitting..." : "Confirm Booking"}
                </PrimaryButton>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </StyledModal>

      <Footer />
    </>
  );
};

export default Cart;
