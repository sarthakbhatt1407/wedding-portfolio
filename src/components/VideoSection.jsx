import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const VideoContainer = styled.section`
  padding: 120px 0;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #fff;
  text-align: center;
  position: relative;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const VideoTitle = styled(Title)`
  &.ant-typography {
    color: #fff !important;
    font-size: 2.5rem !important;
    font-weight: 300 !important;
    margin-bottom: 30px !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-family: "Playfair Display", serif !important;

    @media (max-width: 768px) {
      font-size: 2rem !important;
      margin-bottom: 20px !important;
    }
  }
`;

const VideoSubtitle = styled(Paragraph)`
  &.ant-typography {
    color: #f0f0f0 !important;
    font-size: 1.2rem !important;
    margin-bottom: 50px !important;
    line-height: 1.8;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);

    @media (max-width: 768px) {
      font-size: 1rem !important;
      margin-bottom: 30px !important;
    }
  }
`;

const PlayButton = styled(Button)`
  &.ant-btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    .anticon {
      font-size: 2rem;
    }

    &:hover {
      transform: scale(1.1);
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;

      .anticon {
        font-size: 1.5rem;
      }
    }
  }
`;

const VideoSection = () => {
  return (
    <VideoContainer>
      <Container>
        <VideoTitle level={2}>
          Live Your Magic and Save Your Precious Love Memories!
        </VideoTitle>
        <VideoSubtitle>
          Our team of professional photographers is here to help you capture
          every beautiful moment of your special day with passion and
          creativity.
        </VideoSubtitle>
        <PlayButton icon={<PlayCircleOutlined />} />
      </Container>
    </VideoContainer>
  );
};

export default VideoSection;
