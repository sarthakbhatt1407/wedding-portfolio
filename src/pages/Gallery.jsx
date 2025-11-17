import React, { useState } from "react";
import { Row, Col, Typography, Tabs, Modal } from "antd";
import {
  CameraOutlined,
  VideoCameraOutlined,
  PlayCircleOutlined,
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
    min-height: 70vh;
  }

  .ant-modal-footer {
    display: none !important;
  }
`;

const FullscreenMedia = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("photos");

  const photoGallery = [
    {
      id: 1,
      title: "Romantic Wedding Ceremony",
      description:
        "A beautiful outdoor wedding ceremony captured in golden hour light",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Wedding", "Outdoor", "Golden Hour"],
      likes: 124,
      views: 2340,
      category: "wedding",
    },
    {
      id: 2,
      title: "Elegant Bridal Portrait",
      description:
        "Stunning bridal portrait with natural lighting and classic elegance",
      image:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Bridal", "Portrait", "Studio"],
      likes: 98,
      views: 1890,
      category: "portrait",
    },
    {
      id: 3,
      title: "Pre-Wedding Adventure",
      description: "Adventurous couple session in the mountains during sunset",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Pre-Wedding", "Adventure", "Sunset"],
      likes: 156,
      views: 2890,
      category: "engagement",
    },
    {
      id: 4,
      title: "Reception Celebration",
      description:
        "Joyful moments from a wedding reception filled with dancing and laughter",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Reception", "Dancing", "Celebration"],
      likes: 189,
      views: 3210,
      category: "wedding",
    },
    {
      id: 5,
      title: "Intimate Engagement",
      description:
        "Sweet and intimate engagement session in a cozy coffee shop",
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Engagement", "Intimate", "Indoor"],
      likes: 87,
      views: 1560,
      category: "engagement",
    },
    {
      id: 6,
      title: "Family Celebration",
      description:
        "Multi-generational family celebrating together during wedding festivities",
      image:
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Family", "Celebration", "Group"],
      likes: 145,
      views: 2100,
      category: "family",
    },
  ];

  const videoGallery = [
    {
      id: 1,
      title: "Wedding Highlights Reel",
      description:
        "A cinematic highlight reel capturing the best moments of a beautiful wedding day",
      thumbnail:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456789",
      tags: ["Wedding", "Cinematic", "Highlights"],
      likes: 234,
      views: 5670,
      duration: "3:45",
      category: "wedding",
    },
    {
      id: 2,
      title: "Love Story Documentary",
      description:
        "A heartfelt documentary showcasing the couple's journey to their wedding day",
      thumbnail:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456790",
      tags: ["Documentary", "Love Story", "Emotional"],
      likes: 187,
      views: 4230,
      duration: "8:20",
      category: "story",
    },
    {
      id: 2,
      title: "Love Story Documentary",
      description:
        "A heartfelt documentary showcasing the couple's journey to their wedding day",
      thumbnail:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456790",
      tags: ["Documentary", "Love Story", "Emotional"],
      likes: 187,
      views: 4230,
      duration: "8:20",
      category: "story",
    },
    {
      id: 2,
      title: "Love Story Documentary",
      description:
        "A heartfelt documentary showcasing the couple's journey to their wedding day",
      thumbnail:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456790",
      tags: ["Documentary", "Love Story", "Emotional"],
      likes: 187,
      views: 4230,
      duration: "8:20",
      category: "story",
    },
    {
      id: 2,
      title: "Love Story Documentary",
      description:
        "A heartfelt documentary showcasing the couple's journey to their wedding day",
      thumbnail:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456790",
      tags: ["Documentary", "Love Story", "Emotional"],
      likes: 187,
      views: 4230,
      duration: "8:20",
      category: "story",
    },
    {
      id: 2,
      title: "Love Story Documentary",
      description:
        "A heartfelt documentary showcasing the couple's journey to their wedding day",
      thumbnail:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456790",
      tags: ["Documentary", "Love Story", "Emotional"],
      likes: 187,
      views: 4230,
      duration: "8:20",
      category: "story",
    },
    {
      id: 2,
      title: "Love Story Documentary",
      description:
        "A heartfelt documentary showcasing the couple's journey to their wedding day",
      thumbnail:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456790",
      tags: ["Documentary", "Love Story", "Emotional"],
      likes: 187,
      views: 4230,
      duration: "8:20",
      category: "story",
    },
    {
      id: 2,
      title: "Love Story Documentary",
      description:
        "A heartfelt documentary showcasing the couple's journey to their wedding day",
      thumbnail:
        "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456790",
      tags: ["Documentary", "Love Story", "Emotional"],
      likes: 187,
      views: 4230,
      duration: "8:20",
      category: "story",
    },
    {
      id: 3,
      title: "Pre-Wedding Adventure Film",
      description:
        "An adventurous pre-wedding film shot in stunning mountain landscapes",
      thumbnail:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456791",
      tags: ["Pre-Wedding", "Adventure", "Nature"],
      likes: 156,
      views: 3890,
      duration: "5:12",
      category: "engagement",
    },
    {
      id: 4,
      title: "Ceremony Moments",
      description:
        "Sacred and emotional moments from a traditional wedding ceremony",
      thumbnail:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456792",
      tags: ["Ceremony", "Traditional", "Sacred"],
      likes: 198,
      views: 4560,
      duration: "6:30",
      category: "wedding",
    },
    {
      id: 5,
      title: "Reception Dancing",
      description:
        "High-energy reception footage with amazing dance performances and celebrations",
      thumbnail:
        "https://images.unsplash.com/photo-1546525848-3ce03ca516f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456793",
      tags: ["Reception", "Dancing", "Energy"],
      likes: 267,
      views: 6120,
      duration: "4:18",
      category: "reception",
    },
    {
      id: 6,
      title: "Couple's First Look",
      description:
        "Intimate and emotional first look moment between bride and groom",
      thumbnail:
        "https://images.unsplash.com/photo-1525772764200-be829a350797?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://player.vimeo.com/video/123456794",
      tags: ["First Look", "Intimate", "Emotional"],
      likes: 143,
      views: 3450,
      duration: "2:55",
      category: "intimate",
    },
  ];

  const showFullscreen = (item, type) => {
    setSelectedMedia({ ...item, type });
    setModalVisible(true);
  };

  const renderPhotoGrid = () => (
    <Row gutter={[15, 15]}>
      {photoGallery.map((photo) => (
        <Col xs={12} sm={8} md={6} lg={4} key={photo.id}>
          <GalleryItem onClick={() => showFullscreen(photo, "photo")}>
            <img alt={photo.title} src={photo.image} />
          </GalleryItem>
        </Col>
      ))}
    </Row>
  );

  const renderVideoGrid = () => (
    <Row gutter={[15, 15]}>
      {videoGallery.map((video) => (
        <Col xs={12} sm={8} md={6} lg={4} key={video.id}>
          <GalleryItem onClick={() => showFullscreen(video, "video")}>
            <img alt={video.title} src={video.thumbnail} />
            <VideoOverlay>
              <PlayCircleOutlined className="play-button" />
            </VideoOverlay>
            <VideoDuration>{video.duration}</VideoDuration>
          </GalleryItem>
        </Col>
      ))}
    </Row>
  );

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
          <FullscreenMedia>
            {selectedMedia.type === "photo" ? (
              <img src={selectedMedia.image} alt={selectedMedia.title} />
            ) : (
              <video
                controls
                poster={selectedMedia.thumbnail}
                style={{ width: "100%", height: "100%" }}
              >
                <source src={selectedMedia.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </FullscreenMedia>
        )}
      </StyledModal>

      <Footer />
    </>
  );
};

export default Gallery;
