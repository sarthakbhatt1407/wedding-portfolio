import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Upload,
  Modal,
  message,
  Popconfirm,
  Spin,
  Select,
  Form,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import FloatingNav from "../components/FloatingNav";
import Footer from "../components/Footer";

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

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
`;

const PhotoCard = styled.div`
  position: relative;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

    .delete-overlay {
      opacity: 1;
    }
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${PhotoCard}:hover & {
    transform: scale(1.05);
  }
`;

const DeleteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
`;

const DeleteButton = styled(Button)`
  background: rgba(218, 23, 1, 0.9);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #da1701;
    transform: scale(1.1);
  }

  .anticon {
    color: #fff;
    font-size: 18px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  .empty-icon {
    font-size: 64px;
    color: #ddd;
    margin-bottom: 16px;
  }

  h3 {
    color: #999;
    margin-bottom: 8px;
  }

  p {
    color: #bbb;
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

const PhotoAdmin = ({ hideNavFooter = false }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [form] = Form.useForm();

  const categories = [
    "Wedding",
    "Pre-Wedding",
    "Engagement",
    "Reception",
    "Bridal Portraits",
    "Event Photography",
  ];

  // Fetch photos from API
  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/gallery/image`
      );
      const data = await response.json();

      // Transform API data to match component structure
      const transformedPhotos = data.map((item) => ({
        id: item._id,
        image: `${process.env.REACT_APP_BASE_URL}/` + item.link,
        createdAt: item.createdAt
          ? new Date(item.createdAt).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0], // fallback to current date
      }));
      console.log(transformedPhotos);

      setPhotos(transformedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
      message.error("Failed to load photos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // ...existing code...
  const handleUploadComplete = async () => {
    if (fileList.length === 0) {
      message.warning("Please select at least one photo");
      return;
    }

    if (!selectedCategory) {
      message.warning("Please select a category");
      return;
    }

    setUploading(true);

    let successCount = 0;
    let failedCount = 0;

    for (let file of fileList) {
      try {
        // Compress image before uploading
        const options = {
          maxSizeMB: 0.2, // Target 200KB
          maxWidthOrHeight: 1920, // Max dimension
          useWebWorker: true,
          fileType: "image/jpeg", // Convert to JPEG for better compression
        };

        const compressedFile = await imageCompression(
          file.originFileObj,
          options
        );

        // Create FormData and upload
        const formData = new FormData();
        formData.append("type", "image");
        formData.append("category", selectedCategory);
        formData.append("image", compressedFile, file.name);

        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/wedding/add-gallery`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          successCount++;
        } else {
          failedCount++;
        }
      } catch (err) {
        console.error("Upload failed for photo:", file.name, err);
        failedCount++;
      }
    }

    setUploading(false);
    setUploadModalVisible(false);
    setFileList([]);
    setSelectedCategory("");
    form.resetFields();

    if (successCount > 0) {
      message.success(
        `${successCount} photo(s) uploaded successfully!${
          failedCount > 0 ? ` ${failedCount} failed.` : ""
        }`
      );
      fetchPhotos();
    } else {
      message.error("All uploads failed. Please try again.");
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreviewUpload = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/delete-gallery/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPhotos(photos.filter((photo) => photo.id !== id));
        message.success("Photo deleted successfully!");
      } else {
        message.error("Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      message.error("Failed to delete photo");
    }
  };

  const handlePreview = (imageUrl) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  return (
    <>
      {!hideNavFooter && <FloatingNav />}
      <AdminContainer hideNavFooter={hideNavFooter}>
        <Container>
          <PageHeader>
            <PageTitle>Photo Management</PageTitle>
            <AddButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setUploadModalVisible(true)}
              disabled={uploading}
            >
              Upload Photos
            </AddButton>
          </PageHeader>

          <Card>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <Spin size="large" />
                <p style={{ marginTop: 16, color: "#666" }}>
                  Loading photos...
                </p>
              </div>
            ) : photos.length === 0 ? (
              <EmptyState>
                <div className="empty-icon">
                  <CameraOutlined />
                </div>
                <h3>No Photos Yet</h3>
                <p>Upload your first photo to get started</p>
              </EmptyState>
            ) : (
              <GalleryContainer>
                {photos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    onClick={() => handlePreview(photo.image)}
                  >
                    <PhotoImage src={photo.image} alt="Photo" />
                    <DeleteOverlay className="delete-overlay">
                      <Popconfirm
                        title="Are you sure you want to delete this photo?"
                        onConfirm={(e) => {
                          e.stopPropagation();
                          handleDelete(photo.id);
                        }}
                        okText="Yes"
                        cancelText="No"
                        onCancel={(e) => e.stopPropagation()}
                      >
                        <DeleteButton
                          icon={<DeleteOutlined />}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Popconfirm>
                    </DeleteOverlay>
                  </PhotoCard>
                ))}
              </GalleryContainer>
            )}
          </Card>

          {/* Upload Modal */}
          <StyledModal
            title={
              <span>
                <CameraOutlined style={{ marginRight: 8 }} />
                Upload Photos
              </span>
            }
            open={uploadModalVisible}
            onCancel={() => {
              setUploadModalVisible(false);
              setFileList([]);
              setSelectedCategory("");
              form.resetFields();
            }}
            footer={[
              <Button
                key="cancel"
                onClick={() => {
                  setUploadModalVisible(false);
                  setFileList([]);
                  setSelectedCategory("");
                  form.resetFields();
                }}
              >
                Cancel
              </Button>,
              <Button
                key="upload"
                type="primary"
                loading={uploading}
                onClick={handleUploadComplete}
                disabled={!selectedCategory || fileList.length === 0}
                style={{
                  background: "linear-gradient(135deg, #DA1701, #B81501)",
                  border: "none",
                }}
              >
                {uploading
                  ? "Uploading..."
                  : `Upload ${fileList.length} Photo(s)`}
              </Button>,
            ]}
            width={700}
          >
            <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select
                  placeholder="Select photo category"
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  size="large"
                  style={{ width: "100%" }}
                >
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>

            <div style={{ marginTop: 20 }}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                onPreview={handlePreviewUpload}
                beforeUpload={() => false}
                multiple
                accept="image/*"
                style={{
                  width: "100%",
                }}
              >
                {fileList.length < 20 && (
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                        color: "#DA1701",
                        fontWeight: 600,
                      }}
                    >
                      Select Photos
                    </div>
                  </div>
                )}
              </Upload>
              {fileList.length > 0 && (
                <div
                  style={{
                    marginTop: 16,
                    padding: 12,
                    background: "#f8f9fa",
                    borderRadius: 8,
                    color: "#666",
                  }}
                >
                  <strong>Selected:</strong> {fileList.length} photo(s) ready to
                  upload
                  {selectedCategory && (
                    <span style={{ marginLeft: 8 }}>
                      | Category: <strong>{selectedCategory}</strong>
                    </span>
                  )}
                </div>
              )}
            </div>
          </StyledModal>

          {/* Preview Modal */}
          <Modal
            open={previewVisible}
            title="Photo Preview"
            footer={null}
            onCancel={() => setPreviewVisible(false)}
            width={800}
            style={{ top: 20 }}
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

export default PhotoAdmin;
