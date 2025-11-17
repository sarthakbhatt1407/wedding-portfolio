import { Row, Col, Typography, Button } from "antd";
import {
  PlayCircleOutlined,
  HeartOutlined,
  CameraOutlined,
  StarOutlined,
} from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

const { Title, Paragraph } = Typography;

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const AboutContainer = styled.section`
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="80" cy="40" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="40" cy="80" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.5;
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    max-width: 960px;
    padding: 0 30px;
  }

  @media (max-width: 992px) {
    max-width: 720px;
    padding: 0 25px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 576px) {
    padding: 0 15px;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 100px;

  @media (max-width: 1200px) {
    gap: 60px;
    margin-bottom: 80px;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 50px;
    margin-bottom: 70px;
  }

  @media (max-width: 768px) {
    gap: 40px;
    margin-bottom: 60px;
  }

  @media (max-width: 576px) {
    gap: 30px;
    margin-bottom: 50px;
  }
`;

const ImageSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;

  @media (max-width: 1200px) {
    height: 550px;
  }

  @media (max-width: 992px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 576px) {
    height: 350px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const FloatingImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  background: url("https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")
    center/cover;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
  animation: ${floatAnimation} 6s ease-in-out infinite;
  transition: all 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(212, 175, 55, 0.3),
      rgba(0, 0, 0, 0.2)
    );
    z-index: 1;
    transition: all 0.4s ease;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.25);

    &::before {
      background: linear-gradient(
        135deg,
        rgba(212, 175, 55, 0.2),
        rgba(0, 0, 0, 0.1)
      );
    }
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #da1701;
  cursor: pointer;
  z-index: 2;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid rgba(212, 175, 55, 0.3);
    border-radius: 50%;
    animation: ${fadeInScale} 2s ease-in-out infinite;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: #da1701;
    color: #fff;
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
  }

  padding-left: 5px; // Adjust for play icon visual centering
`;

const ContentSection = styled.div`
  padding: 20px 0;

  @media (max-width: 968px) {
    text-align: center;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 700;
  position: relative;
  font-family: "Playfair Display", serif;
  line-height: 1.2;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #da1701, #b81501);
    border-radius: 2px;
  }

  @media (max-width: 968px) {
    font-size: 2.8rem;

    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 500px;

  @media (max-width: 968px) {
    max-width: none;
    margin: 0 auto 40px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin: 50px 0;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #da1701;
  margin-bottom: 10px;
  font-family: "Playfair Display", serif;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #7f8c8d;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CTAButton = styled(Button)`
  &.ant-btn {
    background: linear-gradient(135deg, #da1701, #b81501);
    border: none;
    height: 60px;
    padding: 0 40px;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 30px;
    color: #fff;
    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.3);
    transition: all 0.4s ease;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 20px 40px rgba(212, 175, 55, 0.4);
      background: linear-gradient(135deg, #b81501, #da1701);
      color: #fff;
    }

    &:active {
      transform: translateY(-1px);
    }

    @media (max-width: 968px) {
      width: auto;
      margin-top: 20px;
    }
  }
`;

const FeatureBox = styled.div`
  text-align: center;
  padding: 50px 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

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
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
    background: rgba(255, 255, 255, 1);

    &::before {
      left: 100%;
    }
  }
`;

const FeatureIcon = styled.div`
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #da1701, #b81501);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  font-size: 2.2rem;
  color: #fff;
  transition: all 0.4s ease;
  position: relative;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);

  &::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid rgba(212, 175, 55, 0.3);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.1);
      opacity: 0;
    }
  }

  ${FeatureBox}:hover & {
    transform: scale(1.1) rotateY(360deg);
    background: linear-gradient(135deg, #b81501, #da1701);
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);

    &::after {
      animation: none;
    }
  }
`;

const FeatureTitle = styled(Title)`
  &.ant-typography {
    font-size: 1.3rem !important;
    margin-bottom: 15px !important;
    color: #333 !important;
    font-weight: 500 !important;
  }
`;

const FeatureDescription = styled(Paragraph)`
  &.ant-typography {
    color: #666;
    line-height: 1.6;
    margin: 0 !important;
  }
`;

const AboutSection = () => {
  const features = [
    {
      icon: <CameraOutlined />,
      title: "Professional Photography",
      description:
        "Capturing your precious moments with artistic vision and technical excellence that you'll treasure forever",
    },
    {
      icon: <HeartOutlined />,
      title: "Wedding Planning",
      description:
        "Complete wedding planning services to make your special day perfect and stress-free from start to finish",
    },
    {
      icon: <PlayCircleOutlined />,
      title: "Video Production",
      description:
        "Cinematic wedding films that tell your unique love story with emotion and professional quality",
    },
    {
      icon: <StarOutlined />,
      title: "Event Styling",
      description:
        "Creating beautiful and memorable wedding atmospheres with personalized styling and decoration",
    },
  ];

  return (
    <AboutContainer>
      <Container>
        <MainContent>
          <ImageSection>
            <FloatingImage>
              <PlayButton>
                <PlayCircleOutlined />
              </PlayButton>
            </FloatingImage>
          </ImageSection>

          <ContentSection>
            <SectionTitle>
              Creating Beautiful{" "}
              <span style={{ color: "#DA1701", fontStyle: "italic" }}>
                Wedding Stories
              </span>
            </SectionTitle>

            <SectionDescription>
              We believe every love story is unique and deserves to be told
              beautifully. With years of experience in wedding photography and
              videography, we capture the emotions, details, and precious
              moments that make your special day unforgettable.
            </SectionDescription>

            <StatsContainer>
              <StatItem>
                <StatNumber>500+</StatNumber>
                <StatLabel>Happy Couples</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>15+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>50+</StatNumber>
                <StatLabel>Awards Won</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>100%</StatNumber>
                <StatLabel>Satisfaction</StatLabel>
              </StatItem>
            </StatsContainer>

            <CTAButton type="primary" size="large">
              Book Your Session
            </CTAButton>
          </ContentSection>
        </MainContent>

        <Row gutter={[40, 40]} style={{ marginTop: "80px" }}>
          <Col span={24}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <h2
                style={{
                  fontSize: "2.5rem",
                  color: "#2c3e50",
                  marginBottom: "20px",
                  fontWeight: "600",
                }}
                data-aos="fade-up"
              >
                Our Wedding Services
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#7f8c8d",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                From intimate ceremonies to grand celebrations, we offer
                comprehensive wedding services to make your dream wedding come
                true
              </p>
            </div>
          </Col>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <FeatureBox
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
                data-aos-duration="800"
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle level={4}>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureBox>
            </Col>
          ))}
        </Row>
      </Container>
    </AboutContainer>
  );
};

export default AboutSection;
