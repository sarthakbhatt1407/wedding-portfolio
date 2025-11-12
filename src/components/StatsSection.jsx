import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Statistic } from "antd";
import {
  CoffeeOutlined,
  TeamOutlined,
  GiftOutlined,
  HeartOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;

const StatsContainer = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="rgba(255,255,255,0.05)" fill-rule="evenodd"><circle cx="20" cy="20" r="2"/></g></svg>')
      repeat;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const StatCard = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }
`;

const StatIcon = styled.div`
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
  transition: all 0.3s ease;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  ${StatCard}:hover & {
    color: #fff;
    transform: scale(1.2);
    animation: none;
  }
`;

const StyledStatistic = styled(Statistic)`
  .ant-statistic-content {
    font-size: 2.5rem !important;
    font-weight: 700 !important;
    color: #fff !important;
    margin-bottom: 10px;
  }
`;

const StatLabel = styled(Title)`
  &.ant-typography {
    font-size: 0.9rem !important;
    color: rgba(255, 255, 255, 0.8) !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    margin: 0 !important;
    font-weight: 500 !important;
  }
`;

// Counter animation component
const AnimatedCounter = ({ endValue, duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCurrentValue(Math.floor(endValue * easeOutQuart));

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return currentValue;
};

const StatsSection = () => {
  const stats = [
    {
      icon: <CoffeeOutlined />,
      value: 123,
      label: "Cups of Coffee",
    },
    {
      icon: <HeartOutlined />,
      value: 743,
      label: "Happy Couples",
    },
    {
      icon: <GiftOutlined />,
      value: 573,
      label: "Best Bouquets",
    },
    {
      icon: <TeamOutlined />,
      value: 283,
      label: "Team Members",
    },
    {
      icon: <TrophyOutlined />,
      value: 954,
      label: "Ceremonies",
    },
  ];

  return (
    <StatsContainer>
      <Container>
        <Row gutter={[40, 40]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} md={8} lg={4.8} key={index}>
              <StatCard
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
                data-aos-duration="800"
              >
                <StatIcon>{stat.icon}</StatIcon>
                <StyledStatistic
                  value={<AnimatedCounter endValue={stat.value} />}
                  formatter={(value) => (
                    <span style={{ fontFamily: "Playfair Display, serif" }}>
                      {value}
                    </span>
                  )}
                />
                <StatLabel level={5}>{stat.label}</StatLabel>
              </StatCard>
            </Col>
          ))}
        </Row>
      </Container>
    </StatsContainer>
  );
};

export default StatsSection;
