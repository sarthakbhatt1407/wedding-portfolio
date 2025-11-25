import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Tabs, Modal, Spin, message } from "antd";
import {
  CameraOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import FloatingNav from "../components/FloatingNav";
import Footer from "../components/Footer";

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const GalleryContainer = styled.div`
  padding: 120px 0 60px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }

  @media (max-width: 480px) {
    margin-bottom: 40px;
  }
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

    @media (max-width: 480px) {
      font-size: 2rem !important;
      margin-bottom: 15px !important;
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

    @media (max-width: 768px) {
      font-size: 1.1rem !important;
      max-width: 90% !important;
    }

    @media (max-width: 480px) {
      font-size: 1rem !important;
      line-height: 1.6 !important;
    }
  }
`;

const StyledTabs = styled(Tabs)`
  /* Remove all blue lines and underlines */
  .ant-tabs-ink-bar {
    display: none !important;
  }

  .ant-tabs-nav {
    justify-content: center;
    margin-bottom: 50px;

    &::before {
      border-bottom: none !important;
      display: none;
    }

    &::after {
      border-bottom: none !important;
      display: none;
    }
  }

  .ant-tabs-nav-wrap {
    justify-content: center;

    &::before {
      display: none !important;
    }

    &::after {
      display: none !important;
    }
  }

  .ant-tabs-nav-list {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    &::before {
      display: none !important;
    }

    &::after {
      display: none !important;
    }
  }

  .ant-tabs-tab {
    padding: 0 !important;
    margin: 0 10px;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border: 2px solid transparent;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    min-width: 140px;
    position: relative;

    &::before {
      display: none !important;
    }

    &::after {
      display: none !important;
    }

    &:hover {
      color: #da1701;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(218, 23, 1, 0.2);
    }

    &.ant-tabs-tab-active {
      background: linear-gradient(135deg, #da1701, #b81501);
      color: #fff !important;
      border-color: #da1701;
      box-shadow: 0 8px 25px rgba(218, 23, 1, 0.3);

      &::before {
        display: none !important;
      }

      &::after {
        display: none !important;
      }

      .ant-tabs-tab-btn {
        color: #fff !important;

        &::before {
          display: none !important;
        }

        &::after {
          display: none !important;
        }
      }
    }

    .ant-tabs-tab-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-weight: inherit;
      padding: 16px 40px;
      width: 100%;
      height: 100%;
      border-radius: 30px;
      transition: all 0.3s ease;
      position: relative;

      &::before {
        display: none !important;
      }

      &::after {
        display: none !important;
      }

      .anticon {
        font-size: 1.1rem;
        line-height: 1;
      }

      span {
        line-height: 1;
        white-space: nowrap;
      }
    }
  }

  .ant-tabs-content {
    margin-top: 0;
  }

  @media (max-width: 768px) {
    .ant-tabs-nav {
      margin-bottom: 30px;
    }

    .ant-tabs-tab {
      margin: 0 5px;
      font-size: 0.9rem;
      height: 46px;
      min-width: 120px;

      .ant-tabs-tab-btn {
        padding: 12px 24px;
        gap: 10px;

        .anticon {
          font-size: 1rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .ant-tabs-nav {
      margin-bottom: 25px;
    }

    .ant-tabs-tab {
      margin: 0 3px;
      font-size: 0.85rem;
      border-radius: 20px;
      height: 40px;
      min-width: 100px;

      .ant-tabs-tab-btn {
        padding: 10px 16px;
        gap: 8px;
        border-radius: 20px;

        .anticon {
          font-size: 0.9rem;
        }
      }
    }
  }

  @media (max-width: 360px) {
    .ant-tabs-tab {
      margin: 0 2px;
      font-size: 0.8rem;
      height: 36px;
      min-width: 85px;

      .ant-tabs-tab-btn {
        padding: 8px 12px;
        gap: 6px;

        .anticon {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 1;
  background: #000;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  .play-button {
    color: #fff;
    font-size: 2.5rem;
    cursor: pointer;
    transition: transform 0.3s ease;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

    &:hover {
      transform: scale(1.2);
    }
  }

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const VideoDuration = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 20px;
    overflow: hidden;
    max-width: 95vw;
    max-height: 95vh;
    background: #000;
  }

  .ant-modal-header {
    display: none !important;
  }

  .ant-modal-close {
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 15px;
    right: 15px;
    z-index: 1001;

    &:hover {
      color: #fff;
      background: rgba(0, 0, 0, 0.7);
    }

    .anticon {
      font-size: 18px;
    }
  }

  .ant-modal-body {
    padding: 0;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    max-height: 90vh;
  }

  .ant-modal-footer {
    display: none !important;
  }
`;

const FullscreenMedia = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 10px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${(props) => {
      if (props.isSliding && props.slideDirection === "next") {
        return "translateX(100%)";
      }
      if (props.isSliding && props.slideDirection === "prev") {
        return "translateX(-100%)";
      }
      return "translateX(0)";
    }};
    opacity: ${(props) => (props.isSliding ? "0" : "1")};
  }

  video {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    height: 70vh;
    padding: 15px;
  }

  @media (max-width: 480px) {
    height: 60vh;
    padding: 10px;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1002;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }
`;

const PhotoCounter = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 1002;

  @media (max-width: 768px) {
    bottom: 10px;
    font-size: 12px;
    padding: 6px 12px;
  }
`;

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("photos");
  const [photoGallery, setPhotoGallery] = useState([]);
  const [videoGallery, setVideoGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [isSliding, setIsSliding] = useState(false);

  // Fetch images from API
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/gallery/image`
      );
      const data = await response.json();

      // Transform API data to match component structure
      const transformedImages = data.map((item) => ({
        id: item._id,
        title: "Wedding Photo",
        description: "Beautiful wedding moment captured with love",
        image: `${process.env.REACT_APP_BASE_URL}/` + item.link,
        tags: ["Wedding", "Photography"],
        likes: Math.floor(Math.random() * 200) + 50,
        views: Math.floor(Math.random() * 3000) + 1000,
        category: "wedding",
        createdAt: item.createdAt,
      }));

      setPhotoGallery(transformedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
      message.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  // Fetch videos from API
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/wedding/gallery/video`
      );
      console.log(`${process.env.REACT_APP_BASE_URL}/wedding/gallery/video`);
      const data = await response.json();

      // Transform API data to match component structure
      const transformedVideos = data.map((item) => ({
        id: item._id,
        title: "Wedding Video",
        description: "Cinematic wedding moment captured beautifully",
        thumbnail: `${process.env.REACT_APP_BASE_URL}/` + item.link,
        videoUrl: `${process.env.REACT_APP_BASE_URL}/` + item.link,
        tags: ["Wedding", "Videography"],
        likes: Math.floor(Math.random() * 300) + 100,
        views: Math.floor(Math.random() * 5000) + 2000,
        duration: "3:45",
        category: "wedding",
        createdAt: item.createdAt,
      }));

      setVideoGallery(transformedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      message.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === "photos") {
      fetchImages();
    } else if (activeTab === "videos") {
      fetchVideos();
    }
  }, [activeTab]);

  const showFullscreen = (item, type, index = 0) => {
    if (type === "photo") {
      setCurrentPhotoIndex(index);
      setSelectedMedia({ ...photoGallery[index], type });
    } else {
      setSelectedMedia({ ...item, type });
    }
    setModalVisible(true);
  };

  // Navigation functions for slideshow with animation
  const goToPrevious = () => {
    if (isSliding) return; // Prevent rapid clicking
    setSlideDirection("prev");
    setIsSliding(true);

    const newIndex =
      currentPhotoIndex > 0 ? currentPhotoIndex - 1 : photoGallery.length - 1;

    setTimeout(() => {
      setCurrentPhotoIndex(newIndex);
      setSelectedMedia({ ...photoGallery[newIndex], type: "photo" });
      setIsSliding(false);
    }, 150);
  };

  const goToNext = () => {
    if (isSliding) return; // Prevent rapid clicking
    setSlideDirection("next");
    setIsSliding(true);

    const newIndex =
      currentPhotoIndex < photoGallery.length - 1 ? currentPhotoIndex + 1 : 0;

    setTimeout(() => {
      setCurrentPhotoIndex(newIndex);
      setSelectedMedia({ ...photoGallery[newIndex], type: "photo" });
      setIsSliding(false);
    }, 150);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (modalVisible && selectedMedia?.type === "photo") {
        if (e.key === "ArrowLeft") {
          goToPrevious();
        } else if (e.key === "ArrowRight") {
          goToNext();
        } else if (e.key === "Escape") {
          setModalVisible(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [modalVisible, selectedMedia, currentPhotoIndex, photoGallery]);

  const renderPhotoGrid = () => {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <Spin size="large" />
          <p style={{ marginTop: 16, color: "#666" }}>Loading images...</p>
        </div>
      );
    }

    if (photoGallery.length === 0) {
      return (
        <div
          style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}
        >
          <CameraOutlined
            style={{ fontSize: "64px", color: "#ddd", marginBottom: "16px" }}
          />
          <h3 style={{ color: "#999" }}>No Photos Available</h3>
          <p style={{ color: "#bbb" }}>Photos will appear here once uploaded</p>
        </div>
      );
    }

    return (
      <Row gutter={[15, 15]}>
        {photoGallery.map((photo, index) => (
          <Col xs={12} sm={8} md={6} lg={4} key={photo.id}>
            <GalleryItem onClick={() => showFullscreen(photo, "photo", index)}>
              <img
                alt={photo.title}
                src={photo.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </GalleryItem>
          </Col>
        ))}
      </Row>
    );
  };

  const renderVideoGrid = () => {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <Spin size="large" />
          <p style={{ marginTop: 16, color: "#666" }}>Loading videos...</p>
        </div>
      );
    }

    if (videoGallery.length === 0) {
      return (
        <div
          style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}
        >
          <VideoCameraOutlined
            style={{ fontSize: "64px", color: "#ddd", marginBottom: "16px" }}
          />
          <h3 style={{ color: "#999" }}>No Videos Available</h3>
          <p style={{ color: "#bbb" }}>Videos will appear here once uploaded</p>
        </div>
      );
    }

    return (
      <Row gutter={[15, 15]}>
        {videoGallery.map((video) => (
          <Col xs={12} sm={8} md={6} lg={4} key={video.id}>
            <GalleryItem onClick={() => showFullscreen(video, "video")}>
              {/* <img alt={video.title} src={video.thumbnail} /> */}
              <video
                src={video.videoUrl}
                // muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
              <VideoOverlay>
                <PlayCircleOutlined className="play-button" />
              </VideoOverlay>
            </GalleryItem>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      <FloatingNav />
      <GalleryContainer>
        <Container>
          <PageHeader>
            <PageTitle level={1}>Our Gallery</PageTitle>
            <PageSubtitle>
              Explore our portfolio of beautiful weddings, intimate moments, and
              cinematic storytelling. Each image and video represents a unique
              love story captured with passion and artistry.
            </PageSubtitle>
          </PageHeader>

          <StyledTabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size="large"
            centered
          >
            <TabPane
              tab={
                <span style={{ display: "flex", gap: "8px" }}>
                  <CameraOutlined />
                  Photography
                </span>
              }
              key="photos"
            >
              {renderPhotoGrid()}
            </TabPane>
            <TabPane
              tab={
                <span style={{ display: "flex", gap: "8px" }}>
                  <VideoCameraOutlined />
                  Videography
                </span>
              }
              key="videos"
            >
              {renderVideoGrid()}
            </TabPane>
          </StyledTabs>
        </Container>
      </GalleryContainer>

      <StyledModal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        closable={true}
        width="95%"
        style={{ top: 20 }}
        centered
      >
        {selectedMedia && (
          <>
            <FullscreenMedia
              isSliding={isSliding}
              slideDirection={slideDirection}
            >
              {selectedMedia.type === "photo" ? (
                <img src={selectedMedia.image} alt={selectedMedia.title} />
              ) : (
                <video
                  controls
                  poster={selectedMedia.thumbnail}
                  style={{ width: "100%", height: "100%" }}
                  src={selectedMedia.videoUrl}
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </FullscreenMedia>

            {/* Navigation buttons for photo slideshow */}
            {selectedMedia.type === "photo" && photoGallery.length > 1 && (
              <>
                <NavigationButton className="prev" onClick={goToPrevious}>
                  <LeftOutlined />
                </NavigationButton>
                <NavigationButton className="next" onClick={goToNext}>
                  <RightOutlined />
                </NavigationButton>
                <PhotoCounter>
                  {currentPhotoIndex + 1} of {photoGallery.length}
                </PhotoCounter>
              </>
            )}
          </>
        )}
      </StyledModal>

      <Footer />
    </>
  );
};

export default Gallery;
