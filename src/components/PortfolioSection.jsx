import React from "react";
import { Row, Col, Typography, Tag } from "antd";
import styled from "styled-components";

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

const PortfolioItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 30px;
  height: 400px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    height: 300px;
    margin-bottom: 20px;
  }
`;

const PortfolioImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.5s ease;
  filter: brightness(0.9);

  ${PortfolioItem}:hover & {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

const PortfolioOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 30px;
  color: #fff;

  ${PortfolioItem}:hover & {
    opacity: 1;
  }
`;

const PortfolioContent = styled.div`
  width: 100%;
  transform: translateY(20px);
  transition: transform 0.3s ease;

  ${PortfolioItem}:hover & {
    transform: translateY(0);
  }
`;

const PortfolioTitle = styled(Title)`
  &.ant-typography {
    color: #fff !important;
    font-size: 1.5rem !important;
    margin-bottom: 10px !important;
    font-weight: 400 !important;
  }
`;

const PortfolioCategory = styled(Tag)`
  &.ant-tag {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    border-radius: 15px;
    padding: 5px 15px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    backdrop-filter: blur(10px);
  }
`;

const PortfolioSection = () => {
  const portfolioItems = [
    {
      id: 1,
      title: "Bridal Bouquet",
      category: "Wedding",
      image:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Blushing Bride",
      category: "Portrait",
      image:
        "https://images.unsplash.com/photo-1460364157752-926555421a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Love Shades",
      category: "Couple",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: "Capture Emotion",
      category: "Wedding",
      image:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 5,
      title: "Capture Moment",
      category: "Memory",
      image:
        "https://images.unsplash.com/photo-1460364157752-926555421a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 6,
      title: "Now & Forever",
      category: "Memory",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <PortfolioContainer>
      <Container>
        <SectionTitle level={2} data-aos="fade-up">
          Our Portfolio
        </SectionTitle>
        <SectionSubtitle data-aos="fade-up" data-aos-delay="200">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium veritatis
        </SectionSubtitle>

        <Row gutter={[30, 30]}>
          {portfolioItems.map((item, index) => {
            // Create different layouts for visual interest
            const colSpan = index === 0 || index === 3 ? 16 : 8;

            return (
              <Col xs={24} md={colSpan} key={item.id}>
                <PortfolioItem
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                  data-aos-duration="800"
                >
                  <PortfolioImage bgImage={item.image} />
                  <PortfolioOverlay>
                    <PortfolioContent>
                      <PortfolioCategory>{item.category}</PortfolioCategory>
                      <PortfolioTitle level={4}>{item.title}</PortfolioTitle>
                    </PortfolioContent>
                  </PortfolioOverlay>
                </PortfolioItem>
              </Col>
            );
          })}
        </Row>
      </Container>
    </PortfolioContainer>
  );
};

export default PortfolioSection;
