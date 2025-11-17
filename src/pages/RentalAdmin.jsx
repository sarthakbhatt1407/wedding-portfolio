import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  Table,
  Space,
  Tag,
  Modal,
  message,
  Select,
  Popconfirm,
  InputNumber,
  Switch,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import FloatingNav from "../components/FloatingNav";
import Footer from "../components/Footer";

const { TextArea } = Input;
const { Option } = Select;

const AdminContainer = styled.div`
  padding: ${(props) => (props.hideNavFooter ? "40px 0" : "120px 0 60px 0")};
  background: ${(props) =>
    props.hideNavFooter
      ? "#fff"
      : "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"};
  min-height: ${(props) => (props.hideNavFooter ? "auto" : "100vh")};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  font-family: "Playfair Display", serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const AddButton = styled(Button)`
  background: linear-gradient(135deg, #da1701, #b81501);
  border: none;
  height: 44px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(218, 23, 1, 0.3);

  &:hover {
    background: linear-gradient(135deg, #b81501, #da1701);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(218, 23, 1, 0.4);
  }
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: linear-gradient(135deg, #da1701, #b81501);
    color: #fff;
    font-weight: 600;
    border: none;
  }

  .ant-table-tbody > tr:hover > td {
    background: rgba(218, 23, 1, 0.05);
  }

  .ant-table {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ActionButton = styled(Button)`
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PriceTag = styled.span`
  font-weight: 600;
  color: #da1701;
  font-size: 1.1rem;
`;

const SpecsList = styled.div`
  .spec-item {
    background: #f5f5f5;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    margin: 2px;
    display: inline-block;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 16px;
    overflow: hidden;
  }

  .ant-modal-header {
    background: linear-gradient(135deg, #da1701, #b81501);

    .ant-modal-title {
      color: #fff;
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

const RentalAdmin = ({ hideNavFooter = false }) => {
  const [form] = Form.useForm();
  const [rentals, setRentals] = useState([
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
      ],
      includes: ["Camera Body", "Battery", "Charger", "Memory Card"],
      category: "camera",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Sony FX3 Cinema Camera",
      description: "Full-frame cinema camera for professional video production",
      price: "₹4,000",
      period: "per day",
      image:
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      available: false,
      rating: 4.9,
      specs: [
        "Full Frame 4K 120p",
        "S-Cinetone Color Science",
        "Dual Base ISO",
      ],
      includes: ["Camera Body", "2x Batteries", "Charger", "Handle"],
      category: "camera",
      createdAt: "2024-01-10",
    },
  ]);

  const [editingRental, setEditingRental] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const categories = [
    "camera",
    "lens",
    "lighting",
    "audio",
    "accessories",
    "tripods",
  ];
  const periods = ["per hour", "per day", "per week", "per month"];

  const handleSubmit = (values) => {
    const newRental = {
      id: editingRental ? editingRental.id : Date.now(),
      ...values,
      image:
        fileList[0]?.url || fileList[0]?.response?.url || editingRental?.image,
      specs: values.specs
        ? values.specs.split(",").map((spec) => spec.trim())
        : [],
      includes: values.includes
        ? values.includes.split(",").map((item) => item.trim())
        : [],
      createdAt: editingRental
        ? editingRental.createdAt
        : new Date().toISOString().split("T")[0],
    };

    if (editingRental) {
      setRentals(
        rentals.map((rental) =>
          rental.id === editingRental.id ? newRental : rental
        )
      );
      message.success("Rental item updated successfully!");
    } else {
      setRentals([...rentals, newRental]);
      message.success("Rental item added successfully!");
    }

    form.resetFields();
    setFileList([]);
    setEditingRental(null);
    setModalVisible(false);
  };

  const handleEdit = (rental) => {
    setEditingRental(rental);
    form.setFieldsValue({
      ...rental,
      specs: rental.specs.join(", "),
      includes: rental.includes.join(", "),
    });
    setFileList([
      {
        uid: "-1",
        name: "image.jpg",
        status: "done",
        url: rental.image,
      },
    ]);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    setRentals(rentals.filter((rental) => rental.id !== id));
    message.success("Rental item deleted successfully!");
  };

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  const handleAddNew = () => {
    form.resetFields();
    setFileList([]);
    setEditingRental(null);
    setModalVisible(true);
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <ProductImage
          src={image}
          alt="Product"
          onClick={() => handlePreview(image)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div>
          <div style={{ fontWeight: 600, color: "#1a1a1a" }}>{name}</div>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>
            Rating: {record.rating}/5
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price, record) => (
        <div>
          <PriceTag>{price}</PriceTag>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>
            {record.period}
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "available",
      key: "available",
      render: (available) => (
        <Tag color={available ? "green" : "red"}>
          {available ? "Available" : "Rented"}
        </Tag>
      ),
    },
    {
      title: "Specs",
      dataIndex: "specs",
      key: "specs",
      render: (specs) => (
        <SpecsList>
          {specs.slice(0, 2).map((spec, index) => (
            <div key={index} className="spec-item">
              {spec}
            </div>
          ))}
          {specs.length > 2 && (
            <div className="spec-item">+{specs.length - 2} more</div>
          )}
        </SpecsList>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <ActionButton
            type="primary"
            size="small"
            onClick={() => handlePreview(record.image)}
            icon={<EyeOutlined />}
          >
            View
          </ActionButton>
          <ActionButton
            type="default"
            size="small"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          >
            Edit
          </ActionButton>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <ActionButton danger size="small" icon={<DeleteOutlined />}>
              Delete
            </ActionButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {!hideNavFooter && <FloatingNav />}
      <AdminContainer hideNavFooter={hideNavFooter}>
        <Container>
          <PageHeader>
            <PageTitle>Rental Management</PageTitle>
            <AddButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddNew}
            >
              Add New Item
            </AddButton>
          </PageHeader>

          <Card>
            <StyledTable
              columns={columns}
              dataSource={rentals}
              rowKey="id"
              pagination={{
                pageSize: 8,
                showTotal: (total) => `Total ${total} items`,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              scroll={{ x: 1200 }}
            />
          </Card>

          {/* Add/Edit Modal */}
          <StyledModal
            title={
              <span>
                <ShoppingOutlined style={{ marginRight: 8 }} />
                {editingRental ? "Edit Rental Item" : "Add New Rental Item"}
              </span>
            }
            open={modalVisible}
            onCancel={() => {
              setModalVisible(false);
              setEditingRental(null);
              form.resetFields();
              setFileList([]);
            }}
            footer={null}
            width={700}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ marginTop: 20 }}
            >
              <Form.Item
                name="name"
                label="Item Name"
                rules={[{ required: true, message: "Please enter item name" }]}
              >
                <Input placeholder="Enter item name" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter description" },
                ]}
              >
                <TextArea rows={3} placeholder="Enter item description" />
              </Form.Item>

              <div style={{ display: "flex", gap: "16px" }}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: "Please enter price" }]}
                  style={{ flex: 2 }}
                >
                  <Input placeholder="₹2,500" />
                </Form.Item>
                <Form.Item
                  name="period"
                  label="Period"
                  rules={[{ required: true, message: "Please select period" }]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="Select period">
                    {periods.map((period) => (
                      <Option key={period} value={period}>
                        {period}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    { required: true, message: "Please select category" },
                  ]}
                  style={{ flex: 2 }}
                >
                  <Select placeholder="Select category">
                    {categories.map((category) => (
                      <Option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="rating"
                  label="Rating"
                  rules={[{ required: true, message: "Please enter rating" }]}
                  style={{ flex: 1 }}
                >
                  <InputNumber
                    min={1}
                    max={5}
                    step={0.1}
                    placeholder="4.8"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="available"
                label="Availability"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch
                  checkedChildren="Available"
                  unCheckedChildren="Rented"
                />
              </Form.Item>

              <Form.Item name="specs" label="Specifications (comma separated)">
                <TextArea
                  rows={2}
                  placeholder="45MP Full Frame Sensor, 8K Video Recording, Image Stabilization"
                />
              </Form.Item>

              <Form.Item
                name="includes"
                label="What's Included (comma separated)"
              >
                <TextArea
                  rows={2}
                  placeholder="Camera Body, Battery, Charger, Memory Card"
                />
              </Form.Item>

              <Form.Item
                name="image"
                label="Product Image"
                rules={[
                  {
                    required: !editingRental,
                    message: "Please upload an image",
                  },
                ]}
              >
                <Upload {...uploadProps} listType="picture" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {editingRental ? "Update Item" : "Add Item"}
                  </Button>
                  <Button
                    onClick={() => {
                      setModalVisible(false);
                      setEditingRental(null);
                      form.resetFields();
                      setFileList([]);
                    }}
                  >
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </StyledModal>

          {/* Preview Modal */}
          <Modal
            open={previewVisible}
            title="Product Image Preview"
            footer={null}
            onCancel={() => setPreviewVisible(false)}
            width={600}
          >
            <img
              alt="Preview"
              style={{ width: "100%", borderRadius: 8 }}
              src={previewImage}
            />
          </Modal>
        </Container>
      </AdminContainer>
      {!hideNavFooter && <Footer />}
    </>
  );
};

export default RentalAdmin;
