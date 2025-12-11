import { Row, Col, Typography, Card, Button } from "antd";
import {
  CameraOutlined,
  HeartOutlined,
  VideoCameraOutlined,
  StarOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

const { Title, Paragraph } = Typography;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 20px rgba(212, 175, 55, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
  }
`;

const ServicesContainer = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="%23d4af37" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(212, 175, 55, 0.05) 0%,
      transparent 50%
    );
    animation: ${float} 20s ease-in-out infinite;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled(Title)`
  &.ant-typography {
    text-align: center;
    font-size: 3.5rem !important;
    font-weight: 700 !important;
    margin-bottom: 20px !important;
    color: #2c3e50 !important;
    font-family: "Playfair Display", serif !important;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(135deg, #da1701, #b81501);
      border-radius: 2px;
    }

    @media (max-width: 768px) {
      font-size: 2.5rem !important;
    }
  }
`;

const SectionSubtitle = styled(Paragraph)`
  &.ant-typography {
    text-align: center;
    color: #7f8c8d;
    font-size: 1.3rem;
    line-height: 1.8;
    margin-bottom: 80px !important;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 300;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-bottom: 60px !important;
    }
  }
`;

const ServiceCard = styled(Card)`
  &.ant-card {
    border: none;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    text-align: center;
    height: 100%;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.3);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(212, 175, 55, 0.1),
        transparent
      );
      transition: left 0.6s ease;
    }

    &:hover {
      transform: translateY(-20px) scale(1.02);
      box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 1);

      &::before {
        left: 100%;
      }
    }

    .ant-card-body {
      padding: 40px 25px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      @media (max-width: 768px) {
        padding: 30px 20px;
      }
    }
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #da1701, #b81501);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 2rem;
  color: #fff;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  box-shadow: 0 15px 35px rgba(212, 175, 55, 0.3);

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid rgba(212, 175, 55, 0.3);
    border-radius: 50%;
    animation: ${pulse} 3s infinite;
  }

  ${ServiceCard}:hover & {
    transform: scale(1.2) rotateY(360deg);
    background: linear-gradient(135deg, #b81501, #da1701);
    box-shadow: 0 25px 50px rgba(212, 175, 55, 0.5);

    &::before {
      animation: none;
      border-color: rgba(212, 175, 55, 0.6);
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const ServiceContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ServiceTitle = styled(Title)`
  &.ant-typography {
    font-size: 1.5rem !important;
    margin-bottom: 15px !important;
    color: #2c3e50 !important;
    font-weight: 600 !important;
    font-family: "Playfair Display", serif !important;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 1.3rem !important;
    }
  }

  ${ServiceCard}:hover & {
    color: #da1701 !important;
  }
`;

const ServiceDescription = styled(Paragraph)`
  &.ant-typography {
    color: #7f8c8d;
    line-height: 1.7;
    margin-bottom: 20px !important;
    font-size: 0.95rem;
    flex: 1;
    transition: color 0.3s ease;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 15px !important;
    }
  }

  ${ServiceCard}:hover & {
    color: #5a6c7d;
  }
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0 25px;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    color: #666;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    .anticon {
      color: #da1701;
      margin-right: 8px;
      font-size: 0.95rem;
    }

    &:hover {
      color: #333;
      transform: translateX(5px);
    }

    @media (max-width: 768px) {
      font-size: 0.85rem;
      margin-bottom: 6px;
    }
  }
`;

const ServiceButton = styled(Button)`
  &.ant-btn {
    background: transparent;
    border: 2px solid #da1701;
    color: #da1701;
    height: 45px;
    padding: 0 30px;
    border-radius: 25px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #da1701, #b81501);
      transition: left 0.4s ease;
      z-index: -1;
    }

    &:hover {
      color: #fff;
      border-color: #da1701;
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);

      &::before {
        left: 0;
      }
    }

    &:active {
      transform: translateY(0);
    }

    .anticon {
      margin-left: 8px;
      transition: transform 0.3s ease;
    }

    &:hover .anticon {
      transform: translateX(3px);
    }
  }
`;

const ServicesSection = () => {
  const services = {
    weddingPhotography: {
      icon: <CameraOutlined />,
      title: "Wedding Photography",
      description:
        "Capture every precious moment of your special day with our expert wedding photography services.",
      offerings: [
        "Pre-wedding shoots",
        "Ceremony coverage",
        "Reception photography",
        "Photo albums",
      ],
    },
    cinematicVideography: {
      icon: <VideoCameraOutlined />,
      title: "Cinematic Videography",
      description:
        "Transform your events into cinematic masterpieces with stunning video production.",
      offerings: [
        "4K/8K video",
        "Drone footage",
        "Highlight reels",
        "Full event coverage",
      ],
    },
    corporateEvents: {
      icon: <StarOutlined />,
      title: "Corporate Events",
      description:
        "Professional coverage for corporate events, conferences, and business occasions.",
      offerings: [
        "Event documentation",
        "Brand storytelling",
        "Promotional videos",
        "Live streaming",
      ],
    },
    preWeddingFilms: {
      icon: <HeartOutlined />,
      title: "Pre-Wedding Films",
      description:
        "Create magical pre-wedding stories that showcase your unique love journey.",
      offerings: [
        "Creative concepts",
        "Location scouting",
        "Cinematic editing",
        "Music integration",
      ],
    },
    musicVideos: {
      icon: <VideoCameraOutlined />,
      title: "Music Videos",
      description:
        "Professional music video production with creative direction and post-production.",
      offerings: [
        "Concept development",
        "Choreography support",
        "Color grading",
        "VFX integration",
      ],
    },
    portraitSessions: {
      icon: <CameraOutlined />,
      title: "Portrait Sessions",
      description:
        "Elegant portrait photography for individuals, families, and professionals.",
      offerings: [
        "Studio sessions",
        "Outdoor shoots",
        "Professional editing",
        "Digital delivery",
      ],
    },
  };

  return (
    <ServicesContainer>
      <Container>
        <SectionTitle level={2} data-aos="fade-up">
          Our Premium Services
        </SectionTitle>
        <SectionSubtitle data-aos="fade-up" data-aos-delay="200">
          We offer comprehensive wedding services designed to capture your love
          story and create unforgettable memories. From intimate ceremonies to
          grand celebrations, we bring your vision to life with exceptional
          artistry and attention to detail.
        </SectionSubtitle>

        <Row gutter={[30, 30]}>
          {Object.values(services).map((service, index) => (
            <Col xs={24} sm={12} md={12} lg={8} key={index}>
              <ServiceCard
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
                data-aos-duration="800"
              >
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceContent>
                  <div>
                    <ServiceTitle level={4}>{service.title}</ServiceTitle>
                    <ServiceDescription>
                      {service.description}
                    </ServiceDescription>
                    <ServiceFeatures>
                      {service.offerings.map((offering, offeringIndex) => (
                        <li key={offeringIndex}>
                          <CheckCircleOutlined />
                          {offering}
                        </li>
                      ))}
                    </ServiceFeatures>
                  </div>
                  <ServiceButton type="primary">
                    Learn More <ArrowRightOutlined />
                  </ServiceButton>
                </ServiceContent>
              </ServiceCard>
            </Col>
          ))}
        </Row>
      </Container>
    </ServicesContainer>
  );
};

export default ServicesSection;
