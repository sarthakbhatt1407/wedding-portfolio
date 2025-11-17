import React, { useState } from "react";
import { Card, Button, Upload, Modal, message, Popconfirm } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import FloatingNav from "../components/FloatingNav";
import Footer from "../components/Footer";

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

const VideoCard = styled.div`
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

const VideoThumbnail = styled.div`
  width: 100%;
  height: 200px;
  background: #000;
  position: relative;
  overflow: hidden;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s ease;
  }

  ${VideoCard}:hover &::after {
    opacity: 0.1;
  }
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(218, 23, 1, 0.9);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.3s ease;

  .anticon {
    color: #fff;
    font-size: 24px;
  }

  ${VideoCard}:hover & {
    transform: translate(-50%, -50%) scale(1.1);
    background: #da1701;
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

const VideoAdmin = ({ hideNavFooter = false }) => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      createdAt: "2024-01-08",
    },
  ]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewVideo, setPreviewVideo] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleUploadComplete = () => {
    if (fileList.length === 0) {
      message.warning("Please select at least one video");
      return;
    }

    setUploading(true);

    // Process all selected files
    const newVideos = fileList.map((file) => ({
      id: Date.now() + Math.random(),
      videoUrl: file.url || URL.createObjectURL(file.originFileObj),
      createdAt: new Date().toISOString().split("T")[0],
    }));

    setTimeout(() => {
      setVideos([...newVideos, ...videos]);
      setUploading(false);
      setUploadModalVisible(false);
      setFileList([]);
      message.success(`${newVideos.length} video(s) uploaded successfully!`);
    }, 1500);
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreviewUpload = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = URL.createObjectURL(file.originFileObj);
    }
    setPreviewVideo(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
    message.success("Video deleted successfully!");
  };

  const handlePreview = (videoUrl) => {
    setPreviewVideo(videoUrl);
    setPreviewVisible(true);
  };

  return (
    <>
      {!hideNavFooter && <FloatingNav />}
      <AdminContainer hideNavFooter={hideNavFooter}>
        <Container>
          <PageHeader>
            <PageTitle>Video Management</PageTitle>
            <AddButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setUploadModalVisible(true)}
              disabled={uploading}
            >
              Upload Videos
            </AddButton>
          </PageHeader>

          <Card>
            {videos.length === 0 ? (
              <EmptyState>
                <div className="empty-icon">
                  <VideoCameraOutlined />
                </div>
                <h3>No Videos Yet</h3>
                <p>Upload your first video to get started</p>
              </EmptyState>
            ) : (
              <GalleryContainer>
                {videos.map((video) => (
                  <VideoCard
                    key={video.id}
                    onClick={() => handlePreview(video.videoUrl)}
                  >
                    <VideoThumbnail>
                      <video
                        src={video.videoUrl}
                        muted
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                      <PlayOverlay>
                        <PlayCircleOutlined />
                      </PlayOverlay>
                    </VideoThumbnail>
                    <DeleteOverlay className="delete-overlay">
                      <Popconfirm
                        title="Are you sure you want to delete this video?"
                        onConfirm={(e) => {
                          e.stopPropagation();
                          handleDelete(video.id);
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
                  </VideoCard>
                ))}
              </GalleryContainer>
            )}
          </Card>

          {/* Upload Modal */}
          <StyledModal
            title={
              <span>
                <VideoCameraOutlined style={{ marginRight: 8 }} />
                Upload Videos
              </span>
            }
            open={uploadModalVisible}
            onCancel={() => {
              setUploadModalVisible(false);
              setFileList([]);
            }}
            footer={[
              <Button
                key="cancel"
                onClick={() => {
                  setUploadModalVisible(false);
                  setFileList([]);
                }}
              >
                Cancel
              </Button>,
              <Button
                key="upload"
                type="primary"
                loading={uploading}
                onClick={handleUploadComplete}
                style={{
                  background: "linear-gradient(135deg, #DA1701, #B81501)",
                  border: "none",
                }}
              >
                {uploading
                  ? "Uploading..."
                  : `Upload ${fileList.length} Video(s)`}
              </Button>,
            ]}
            width={700}
          >
            <div style={{ marginTop: 20 }}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                onPreview={handlePreviewUpload}
                beforeUpload={() => false}
                multiple
                accept="video/*"
                style={{
                  width: "100%",
                }}
              >
                {fileList.length < 10 && (
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                        color: "#DA1701",
                        fontWeight: 600,
                      }}
                    >
                      Select Videos
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
                  <strong>Selected:</strong> {fileList.length} video(s) ready to
                  upload
                </div>
              )}
            </div>
          </StyledModal>

          {/* Preview Modal */}
          <Modal
            open={previewVisible}
            title="Video Preview"
            footer={null}
            onCancel={() => setPreviewVisible(false)}
            width={900}
            style={{ top: 20 }}
          >
            <video
              controls
              style={{ width: "100%", borderRadius: 8 }}
              src={previewVideo}
              autoPlay
            />
          </Modal>
        </Container>
      </AdminContainer>
      {!hideNavFooter && <Footer />}
    </>
  );
};

export default VideoAdmin;
