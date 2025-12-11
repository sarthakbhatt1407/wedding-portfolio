import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Space,
  Button,
  Tag,
  Modal,
  Descriptions,
  Image,
  Row,
  Col,
  message,
  Input,
} from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  PhoneOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: none;

  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
    padding: 20px 24px;

    .ant-card-head-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }

  .ant-card-body {
    padding: 0;
  }
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: linear-gradient(135deg, #da1701, #b81501);
    color: #fff;
    font-weight: 600;
    border: none;
    padding: 12px 8px;
    font-size: 0.85rem;

    @media (max-width: 768px) {
      padding: 8px 4px;
      font-size: 0.75rem;
    }
  }

  .ant-table-tbody > tr:hover > td {
    background: rgba(218, 23, 1, 0.05);
  }

  .ant-table {
    border-radius: 12px;
    overflow: hidden;
  }

  .ant-table-tbody > tr > td {
    padding: 12px 8px;
    border-bottom: 1px solid #f0f0f0;

    @media (max-width: 768px) {
      padding: 8px 4px;
      font-size: 0.85rem;
    }
  }

  .ant-table-container {
    overflow-x: auto;
  }
`;

const StatusTag = styled(Tag)`
  border-radius: 20px;
  padding: 4px 12px;
  font-weight: 500;
  text-transform: capitalize;
`;

const ActionButton = styled(Button)`
  border-radius: 6px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  padding: 0 8px;

  @media (max-width: 768px) {
    height: 28px;
    font-size: 0.7rem;
    padding: 0 6px;
  }
`;

const OrderModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    overflow: hidden;
  }

  .ant-modal-header {
    background: linear-gradient(135deg, #da1701, #b81501);
    border: none;

    .ant-modal-title {
      color: #fff;
      font-size: 1.3rem;
      font-weight: 600;
    }
  }

  .ant-modal-close {
    color: #fff;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const ItemCard = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background: #fafafa;
  transition: all 0.3s ease;

  &:hover {
    border-color: #da1701;
    background: #fff;
  }
`;

const ItemImage = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
`;

const RentalQueries = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Fetch rental orders from API
  const fetchRentalOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/get-all-rental-orders`
      );
      const data = await response.json();
      console.log(data);

      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error("Error fetching rental orders:", error);
      message.error("Failed to load rental orders");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/update-rental-order/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus, orderId }),
        }
      );

      if (response.ok) {
        message.success("Order status updated successfully");
        fetchRentalOrders(); // Refresh the list
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status");
    }
  };

  // Confirm order with confirmation dialog
  const confirmOrder = (orderId, customerName) => {
    Modal.confirm({
      title: "Confirm Order",
      content: `Are you sure you want to confirm the rental order for ${customerName}?`,
      okText: "Yes, Confirm",
      cancelText: "Cancel",
      okType: "primary",
      okButtonProps: {
        style: { background: "#52c41a", borderColor: "#52c41a" },
      },
      onOk() {
        updateOrderStatus(orderId, "Confirmed");
        setModalVisible(false);
      },
    });
  };

  // Reject order with confirmation dialog
  const rejectOrder = (orderId, customerName) => {
    Modal.confirm({
      title: "Reject Order",
      content: `Are you sure you want to reject the rental order for ${customerName}? This action cannot be undone.`,
      okText: "Yes, Reject",
      cancelText: "Cancel",
      okType: "danger",
      onOk() {
        updateOrderStatus(orderId, "Rejected");
        setModalVisible(false);
      },
    });
  };

  useEffect(() => {
    fetchRentalOrders();
  }, []);

  // Search function
  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.name.toLowerCase().includes(value.toLowerCase()) ||
          order.phone.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  };

  // Update filtered results when orders change
  useEffect(() => {
    handleSearch(searchText);
  }, [orders, searchText]);

  const getStatusColor = (status) => {
    const colors = {
      Pending: "orange",
      pending: "orange",
      Confirmed: "blue",
      confirmed: "blue",
      "In-Progress": "cyan",
      "in-progress": "cyan",
      Completed: "green",
      completed: "green",
      Cancelled: "red",
      cancelled: "red",
      Rejected: "red",
      rejected: "red",
    };
    return colors[status] || "default";
  };

  const columns = [
    {
      title: "Customer",
      key: "customer",
      width: 160,
      render: (record) => (
        <div>
          <div
            style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "0.85rem" }}
          >
            <UserOutlined style={{ marginRight: 6, color: "#da1701" }} />
            {record.name}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#666" }}>
            <PhoneOutlined style={{ marginRight: 4 }} />
            {record.phone}
          </div>
        </div>
      ),
    },
    {
      title: "Booking Period",
      key: "period",
      width: 150,
      responsive: ["md"],
      render: (record) => (
        <div>
          <div style={{ fontSize: "0.75rem", color: "#666" }}>
            <CalendarOutlined style={{ marginRight: 4, color: "#da1701" }} />
            {new Date(record.bookingDateFrom).toLocaleDateString()}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#666" }}>
            to {new Date(record.bookingDateTo).toLocaleDateString()}
          </div>
        </div>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      align: "right",
      render: (amount) => (
        <div style={{ fontWeight: 600, color: "#da1701", fontSize: "0.85rem" }}>
          ₹{amount?.toLocaleString()}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "center",
      render: (status) => (
        <StatusTag
          color={getStatusColor(status)}
          style={{ fontSize: "0.75rem" }}
        >
          {status}
        </StatusTag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      fixed: "right",
      align: "center",
      render: (record) => (
        <Space size={4} style={{ display: "flex", justifyContent: "center" }}>
          <ActionButton
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedOrder(record);
              setModalVisible(true);
            }}
          >
            <span
              style={{ display: window.innerWidth > 768 ? "inline" : "none" }}
            >
              View
            </span>
          </ActionButton>
          {(record.status === "Pending" || record.status === "pending") && (
            <>
              <ActionButton
                type="default"
                size="small"
                icon={<CheckCircleOutlined />}
                onClick={() => confirmOrder(record._id, record.name)}
                style={{ color: "#52c41a", borderColor: "#52c41a" }}
              >
                <span
                  style={{
                    display: window.innerWidth > 768 ? "inline" : "none",
                  }}
                >
                  Confirm
                </span>
              </ActionButton>
              <ActionButton
                type="default"
                size="small"
                icon={<CloseCircleOutlined />}
                onClick={() => rejectOrder(record._id, record.name)}
                style={{ color: "#ff4d4f", borderColor: "#ff4d4f" }}
              >
                <span
                  style={{
                    display: window.innerWidth > 768 ? "inline" : "none",
                  }}
                >
                  Reject
                </span>
              </ActionButton>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <StyledCard
        title={
          <span>
            <ShoppingCartOutlined />
            Rental Booking Queries
          </span>
        }
        extra={
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <Input.Search
              placeholder="Search by name or phone..."
              allowClear
              enterButton={<SearchOutlined />}
              style={{ width: 250 }}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
              size="middle"
            />
            <Button
              type="primary"
              style={{
                background: "#da1701",
                borderColor: "#da1701",
                borderRadius: "8px",
              }}
              onClick={fetchRentalOrders}
              loading={loading}
            >
              Refresh
            </Button>
          </div>
        }
      >
        {searchText && (
          <div style={{ marginBottom: 16, color: "#666", fontSize: "0.9rem" }}>
            <SearchOutlined style={{ marginRight: 8 }} />
            Found {filteredOrders.length} of {orders.length} orders matching "
            {searchText}"
          </div>
        )}
        <StyledTable
          columns={columns}
          dataSource={filteredOrders}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} orders`,
            responsive: true,
          }}
          scroll={{ x: 800, y: 600 }}
          size="small"
          style={{ padding: "16px" }}
        />
      </StyledCard>

      {/* Order Details Modal */}
      <OrderModal
        title={`Order Details - ${selectedOrder?._id?.slice(-6)}`}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setSelectedOrder(null);
        }}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
          (selectedOrder?.status === "Pending" ||
            selectedOrder?.status === "pending") && (
            <>
              <Button
                key="reject"
                type="default"
                style={{ color: "#ff4d4f", borderColor: "#ff4d4f" }}
                icon={<CloseCircleOutlined />}
                onClick={() => {
                  rejectOrder(selectedOrder._id, selectedOrder.name);
                }}
              >
                Reject Order
              </Button>
              <Button
                key="confirm"
                type="primary"
                style={{ background: "#52c41a", borderColor: "#52c41a" }}
                icon={<CheckCircleOutlined />}
                onClick={() => {
                  confirmOrder(selectedOrder._id, selectedOrder.name);
                }}
              >
                Confirm Order
              </Button>
            </>
          ),
        ]}
        width={800}
      >
        {selectedOrder && (
          <div style={{ padding: "20px 0" }}>
            {/* Customer Information */}
            <Descriptions
              title="Customer Information"
              bordered
              size="small"
              style={{ marginBottom: 24 }}
            >
              <Descriptions.Item label="Name" span={2}>
                {selectedOrder.name}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedOrder.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Booking From" span={1}>
                {new Date(selectedOrder.bookingDateFrom).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Booking To" span={2}>
                {new Date(selectedOrder.bookingDateTo).toLocaleDateString()}
              </Descriptions.Item>
              <Descriptions.Item label="Order Status" span={3}>
                <StatusTag color={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status}
                </StatusTag>
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount" span={3}>
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "#da1701",
                  }}
                >
                  ₹{selectedOrder.amount?.toLocaleString()}
                </span>
              </Descriptions.Item>
              {selectedOrder.notes && (
                <Descriptions.Item label="Notes" span={3}>
                  {selectedOrder.notes}
                </Descriptions.Item>
              )}
            </Descriptions>

            {/* Rental Items */}
            <div style={{ marginTop: 24 }}>
              <h3 style={{ marginBottom: 16, color: "#1a1a1a" }}>
                Rental Items ({selectedOrder.rentalItem?.length || 0})
              </h3>
              <Row gutter={[16, 16]}>
                {selectedOrder.rentalItem?.map((item, index) => (
                  <Col xs={24} sm={12} key={index}>
                    <ItemCard>
                      <Row gutter={16} align="middle">
                        <Col span={8}>
                          <ItemImage
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            style={{ borderRadius: "8px" }}
                            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RUG8A+b1Hgtf8QFGvwPXbZc3w=="
                          />
                        </Col>
                        <Col span={16}>
                          <div style={{ fontWeight: 600, marginBottom: 4 }}>
                            {item.name}
                          </div>
                          <div
                            style={{
                              color: "#666",
                              fontSize: "0.85rem",
                              marginBottom: 4,
                            }}
                          >
                            {item.description}
                          </div>
                          <div style={{ color: "#da1701", fontWeight: 600 }}>
                            {item.price} / {item.period}
                          </div>
                          {item.type && (
                            <Tag size="small" style={{ marginTop: 4 }}>
                              {item.type}
                            </Tag>
                          )}
                        </Col>
                      </Row>
                    </ItemCard>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        )}
      </OrderModal>
    </Container>
  );
};

export default RentalQueries;
