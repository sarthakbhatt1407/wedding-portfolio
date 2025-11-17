import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Typography, Row, Col, Empty, Divider } from "antd";
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

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
                onClick={() => {
                  console.log("Proceeding to checkout with items:", cartItems);
                }}
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
      <Footer />
    </>
  );
};

export default Cart;
