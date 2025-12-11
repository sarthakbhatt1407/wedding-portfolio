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
  Popconfirm,
  InputNumber,
  Switch,
  Select,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingOutlined,
  SearchOutlined,
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

    > div {
      flex-direction: column;
      width: 100%;
      gap: 12px;

      .ant-input-search {
        width: 100% !important;
      }
    }
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
    font-size: 0.9rem;

    @media (max-width: 768px) {
      padding: 8px 4px;
      font-size: 0.8rem;
    }
  }

  .ant-table-tbody > tr:hover > td {
    background: rgba(218, 23, 1, 0.05);
  }

  .ant-table-tbody > tr > td {
    @media (max-width: 768px) {
      padding: 8px 4px;
      font-size: 0.8rem;
    }
  }

  .ant-table {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

    @media (max-width: 768px) {
      .ant-table-content {
        overflow-x: auto;
      }
    }
  }

  .ant-table-wrapper {
    @media (max-width: 768px) {
      overflow-x: auto;
    }
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const ActionButton = styled(Button)`
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 0.8rem;

    .anticon {
      font-size: 0.8rem;
    }
  }
`;

const PriceTag = styled.span`
  font-weight: 600;
  color: #da1701;
  font-size: 1.1rem;
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
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRental, setEditingRental] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredRentals, setFilteredRentals] = useState([]);

  // Fetch rental items from API
  const fetchRentals = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/get-rental`
      );
      const data = await response.json();
      console.log(data);

      // Transform API data to match component structure
      const transformedItems = data.map((item) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        price: item.price,
        period: item.period,
        image: `${process.env.REACT_APP_BASE_URL}/${item.link}`,
        available: item.available,
        specification: item.specification,
        included: item.included,
        type: item.type,
        category: item.type,
      }));

      setRentals(transformedItems);
      setFilteredRentals(transformedItems);
    } catch (error) {
      console.error("Error fetching rental items:", error);
      message.error("Failed to load rental items");
    } finally {
      setLoading(false);
    }
  };

  // Search function
  const handleSearch = (value) => {
    setSearchText(value);
    if (!value) {
      setFilteredRentals(rentals);
    } else {
      const filtered = rentals.filter(
        (item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.type.toLowerCase().includes(value.toLowerCase()) ||
          (item.category &&
            item.category.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredRentals(filtered);
    }
  };

  // Update filtered results when rentals change
  React.useEffect(() => {
    handleSearch(searchText);
  }, [rentals]);

  // Load data on component mount
  React.useEffect(() => {
    fetchRentals();
  }, []);

  // Toggle rental item availability
  const toggleAvailability = async (id, currentStatus) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/toggle-rental-availability/${id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle availability");
      }

      const data = await response.json();
      message.success(data.message);

      // Refresh the rental list to reflect changes
      await fetchRentals();
    } catch (error) {
      console.error("Error toggling availability:", error);
      message.error("Failed to update availability status");
    }
  };

  const categories = [
    "camera",
    "lens",
    "lighting",
    "audio",
    "accessories",
    "tripods",
  ];
  const periods = ["per hour", "per day", "per week", "per month"];

  // Handle adding new rental
  const handleAddRental = async (values) => {
    if (fileList.length === 0) {
      message.error("Please select an image");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("type", values.category);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("period", values.period);
      formData.append("category", values.category || "");
      formData.append("description", values.description || "");
      formData.append("specification", values.specification || "");
      formData.append("included", values.included || "");

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj || fileList[0]);
      }

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/add-rental`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add rental item");
      }

      const data = await response.json();
      console.log(data);

      message.success("Rental item added successfully!");

      // Refresh the rental list
      await fetchRentals();

      form.resetFields();
      setFileList([]);
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding rental:", error);
      message.error("Failed to add rental item");
    } finally {
      setUploading(false);
    }
  };

  // Handle editing existing rental
  const handleEditRental = async (values) => {
    console.log(
      `${process.env.REACT_APP_BASE_URL}/wedding/edit-rental/${editingRental.id}`
    );
    setUploading(true);
    try {
      const updateData = {
        name: values.name,
        price: values.price,
        period: values.period,
        type: values.category,
        description: values.description || "",
        specification: values.specification || "",
        included: values.included || "",
      };

      let response;

      // Check if new image is uploaded
      if (fileList.length > 0 && fileList[0].originFileObj) {
        console.log(1);
        const imageFormData = new FormData();
        Object.keys(updateData).forEach((key) => {
          imageFormData.append(key, updateData[key]);
        });
        imageFormData.append("image", fileList[0].originFileObj);

        response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/wedding/edit-rental/${editingRental.id}`,
          {
            method: "POST",
            body: imageFormData,
          }
        );
      } else {
        console.log(2);
        console.log(updateData);

        // No new image, send JSON
        response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/wedding/edit-rental/${editingRental.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          }
        );
      }
      console.log(response.status);

      if (!response.ok) {
        throw new Error("Failed to update rental item");
      }

      const data = await response.json();
      console.log(data);

      message.success("Rental item updated successfully!");

      // Refresh the rental list
      await fetchRentals();

      form.resetFields();
      setFileList([]);
      setEditingRental(null);
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating rental:", error);
      message.error("Failed to update rental item");
    } finally {
      setUploading(false);
    }
  };

  // Combined submit handler that routes to appropriate function
  const handleSubmit = async (values) => {
    if (editingRental) {
      await handleEditRental(values);
    } else {
      await handleAddRental(values);
    }
  };

  const handleEdit = (rental) => {
    setEditingRental(rental);
    form.setFieldsValue({
      name: rental.name,
      description: rental.description,
      price: rental.price,
      period: rental.period,
      category: rental.type,
      specification: rental.specification,
      included: rental.included,
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
  const d = {
    type: "camera",
    name: "Sony Alpha A7 IV",
    price: "3500",
    period: "per day",
    description:
      "Professional full-frame mirrorless camera with 33MP sensor, perfect for photography and videography. Features advanced autofocus, 4K video recording, and excellent low-light performance.",
    specification:
      "33MP Full-Frame Exmor R CMOS Sensor, BIONZ XR Image Processor, 4K 60p Video Recording, 5-Axis In-Body Image Stabilization, 693-Point Phase-Detection AF, ISO 100-51200 (Expandable to 204800), 3.0-inch Vari-Angle LCD Touchscreen",
    included:
      "Camera Body, NP-FZ100 Battery, BC-QZ1 Battery Charger, Shoulder Strap, Body Cap, Eyepiece Cup, USB Cable, Instruction Manual, 64GB SD Card",
    available: true,
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/delete-rental/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Failed to delete rental item");
      }

      await fetchRentals();
      message.success("Rental item deleted successfully!");
    } catch (error) {
      console.error("Error deleting rental:", error);
      message.error("Failed to delete rental item");
    }
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
      width: 80,
      fixed: "left",
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
      width: 150,
      ellipsis: true,
      render: (name) => (
        <div>
          <div
            style={{
              fontWeight: 600,
              color: "#1a1a1a",
              fontSize: window.innerWidth <= 768 ? "0.8rem" : "1rem",
            }}
          >
            {name}
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      render: (category) => (
        <Tag
          color="blue"
          style={{
            fontSize: window.innerWidth <= 768 ? "0.7rem" : "0.8rem",
            padding: "2px 8px",
          }}
        >
          {category || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (price, record) => (
        <div>
          <PriceTag>₹{price}</PriceTag>
          <div style={{ fontSize: "0.7rem", color: "#666" }}>
            {record.period}
          </div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type) => (
        <Tag color="blue" style={{ fontSize: "0.7rem" }}>
          {type}
        </Tag>
      ),
      responsive: ["md"],
    },
    {
      title: "Status",
      dataIndex: "available",
      key: "available",
      width: 120,
      render: (available, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Tag
            color={available ? "green" : "red"}
            style={{ fontSize: "0.7rem" }}
          >
            {available ? "Available" : "Unavailable"}
          </Tag>
          <Switch
            checked={available}
            onChange={() => toggleAvailability(record.id, available)}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            size="small"
            style={{
              backgroundColor: available ? "#52c41a" : "#ff4d4f",
            }}
          />
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 150,
      responsive: ["lg"],
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      fixed: "right",
      render: (_, record) => (
        <Space size="small" wrap>
          <ActionButton
            type="default"
            size="small"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          >
            {window.innerWidth <= 768 ? "" : "Edit"}
          </ActionButton>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <ActionButton danger size="small" icon={<DeleteOutlined />}>
              {window.innerWidth <= 768 ? "" : "Delete"}
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
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <Input.Search
                placeholder="Search by name or type..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                style={{ width: 300 }}
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                value={searchText}
              />
              <AddButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddNew}
              >
                Add New Item
              </AddButton>
            </div>
          </PageHeader>

          <Card>
            {searchText && (
              <div
                style={{ marginBottom: 16, color: "#666", fontSize: "0.9rem" }}
              >
                <SearchOutlined style={{ marginRight: 8 }} />
                Found {filteredRentals.length} of {rentals.length} items
                matching "{searchText}"
              </div>
            )}
            <StyledTable
              columns={columns}
              dataSource={filteredRentals}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: window.innerWidth <= 768 ? 5 : 8,
                showTotal: (total) => `Total ${total} items`,
                showSizeChanger: window.innerWidth > 768,
                showQuickJumper: window.innerWidth > 768,
                simple: window.innerWidth <= 768,
              }}
              scroll={{ x: 800, y: window.innerWidth <= 768 ? 400 : undefined }}
              size={window.innerWidth <= 768 ? "small" : "middle"}
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
                label="Name"
                rules={[{ required: true, message: "Please enter item name" }]}
              >
                <Input placeholder="Enter item name" />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select placeholder="Select equipment category">
                  <Option value="Camera">Camera</Option>
                  <Option value="Lens">Lens</Option>
                  <Option value="Lighting">Lighting Equipment</Option>
                  <Option value="Audio">Audio Equipment</Option>
                  <Option value="Tripod">Tripods & Supports</Option>
                  <Option value="Drone">Drones</Option>
                  <Option value="Gimbal">Gimbals & Stabilizers</Option>
                  <Option value="Accessories">Accessories</Option>
                  <Option value="Background">Backdrops & Props</Option>
                  <Option value="Memory">Memory & Storage</Option>
                </Select>
              </Form.Item>

              <div style={{ display: "flex", gap: "16px" }}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: "Please enter price" }]}
                  style={{ flex: 1 }}
                >
                  <InputNumber
                    placeholder="2500"
                    style={{ width: "100%" }}
                    min={0}
                  />
                </Form.Item>
                <Form.Item
                  name="period"
                  label="Period"
                  rules={[{ required: true, message: "Please enter period" }]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder="per day" />
                </Form.Item>
              </div>

              <Form.Item name="description" label="Description (optional)">
                <TextArea rows={3} placeholder="Enter item description" />
              </Form.Item>

              <Form.Item name="specification" label="Specifications (optional)">
                <TextArea rows={2} placeholder="Spec 1, Spec 2, Spec 3" />
              </Form.Item>

              <Form.Item name="included" label="What's Included (optional)">
                <TextArea rows={2} placeholder="Item 1, Item 2, Item 3" />
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
                  <Button type="primary" htmlType="submit" loading={uploading}>
                    {uploading
                      ? "Saving..."
                      : editingRental
                      ? "Update Item"
                      : "Add Item"}
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
