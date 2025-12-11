import React, { useState, useEffect } from "react";
import { Row, Col, Typography, message, Spin, Modal } from "antd";
import styled from "styled-components";
import { CameraOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const PortfolioContainer = styled.section`
  padding: 120px 0;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(Title)`
  &.ant-typography {
    text-align: center;
    font-size: 2.5rem !important;
    font-weight: 300 !important;
    margin-bottom: 20px !important;
    color: #333 !important;
    font-family: "Playfair Display", serif !important;

    @media (max-width: 768px) {
      font-size: 2rem !important;
    }
  }
`;

const SectionSubtitle = styled(Paragraph)`
  &.ant-typography {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 60px !important;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CategoryTabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 24px 20px;
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    gap: 8px;
    padding: 16px 12px;
  }
`;

const CategoryTab = styled.button`
  padding: 10px 24px;
  border-radius: 25px;
  border: 2px solid transparent;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #da1701, #b81501)"
      : "rgba(255, 255, 255, 0.8)"};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  font-size: 14px;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: ${(props) =>
    props.active
      ? "0 6px 20px rgba(218, 23, 1, 0.3)"
      : "0 2px 8px rgba(0, 0, 0, 0.05)"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(218, 23, 1, 0.2);
    border-color: #da1701;
    color: ${(props) => (props.active ? "#fff" : "#da1701")};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  aspect-ratio: 1;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  img {
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: rgba(0, 0, 0, 0.95);
    padding: 0;
    border-radius: 0;
  }

  .ant-modal-close {
    color: #fff;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }

    .ant-modal-close-x {
      font-size: 24px;
      line-height: 50px;
    }
  }

  @media (max-width: 768px) {
    .ant-modal-close {
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;

      .ant-modal-close-x {
        font-size: 20px;
        line-height: 40px;
      }
    }
  }
`;

const FullscreenMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;

  img {
    max-width: 100%;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    min-height: 60vh;
    padding: 10px;

    img {
      max-height: 70vh;
    }
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

const PortfolioSection = () => {
  const [photos, setPhotos] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const categories = [
    "All",
    "Wedding",
    "Pre-Wedding",
    "Engagement",
    "Reception",
    "Bridal Portraits",
    "Event Photography",
  ];

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
        title: "Wedding Photo",
        category: item.category,
        image: `${process.env.REACT_APP_BASE_URL}/` + item.link,
        createdAt: item.createdAt,
      }));

      setAllPhotos(transformedPhotos);
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

  // Filter photos based on selected category
  useEffect(() => {
    if (activeCategory === "All") {
      setPhotos(allPhotos);
    } else {
      const filtered = allPhotos.filter(
        (photo) => photo.category?.trim() === activeCategory.trim()
      );
      setPhotos(filtered);
    }
  }, [activeCategory, allPhotos]);

  const showFullscreen = (index) => {
    setCurrentPhotoIndex(index);
    setModalVisible(true);
  };

  const goToPrevious = () => {
    const newIndex =
      currentPhotoIndex > 0 ? currentPhotoIndex - 1 : photos.length - 1;
    setCurrentPhotoIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex =
      currentPhotoIndex < photos.length - 1 ? currentPhotoIndex + 1 : 0;
    setCurrentPhotoIndex(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (modalVisible) {
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
  }, [modalVisible, currentPhotoIndex, photos]);

  return (
    <PortfolioContainer>
      <Container>
        <SectionTitle level={2} data-aos="fade-up">
          Our Portfolio
        </SectionTitle>
        <SectionSubtitle data-aos="fade-up" data-aos-delay="200">
          Capturing beautiful moments from our wedding photography sessions
        </SectionSubtitle>

        <CategoryTabsContainer data-aos="fade-up" data-aos-delay="300">
          {categories.map((category) => (
            <CategoryTab
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </CategoryTab>
          ))}
        </CategoryTabsContainer>

        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <Spin size="large" />
            <div style={{ marginTop: 16, color: "#666" }}>
              Loading portfolio photos...
            </div>
          </div>
        ) : photos.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}
          >
            <CameraOutlined
              style={{ fontSize: "64px", color: "#ddd", marginBottom: "16px" }}
            />
            <h3 style={{ color: "#999" }}>No Photos Available</h3>
            <p style={{ color: "#bbb" }}>
              Photos will appear here once uploaded
            </p>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {photos.map((photo, index) => (
              <Col xs={24} sm={12} md={12} lg={8} key={photo.id}>
                <GalleryItem
                  onClick={() => showFullscreen(index)}
                  data-aos="fade-up"
                  data-aos-delay={50 * (index % 6)}
                >
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
        )}
      </Container>

      <StyledModal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        closable={true}
        width="95%"
        style={{ top: 20 }}
        centered
      >
        {photos[currentPhotoIndex] && (
          <>
            <FullscreenMedia>
              <img
                src={photos[currentPhotoIndex].image}
                alt={photos[currentPhotoIndex].title}
              />
            </FullscreenMedia>

            {photos.length > 1 && (
              <>
                <NavigationButton className="prev" onClick={goToPrevious}>
                  <LeftOutlined />
                </NavigationButton>
                <NavigationButton className="next" onClick={goToNext}>
                  <RightOutlined />
                </NavigationButton>
                <PhotoCounter>
                  {currentPhotoIndex + 1} of {photos.length}
                </PhotoCounter>
              </>
            )}
          </>
        )}
      </StyledModal>
    </PortfolioContainer>
  );
};

export default PortfolioSection;
