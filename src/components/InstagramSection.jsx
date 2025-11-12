import React from "react";
import { Row, Col, Typography, Image, Button, Space } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const InstagramContainer = styled.section`
  padding: 120px 0;
  background: #f8f9fa;
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

const InstagramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const InstagramPost = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

    .instagram-overlay {
      opacity: 1;
    }
  }
`;

const PostImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.1);
  transition: all 0.3s ease;

  ${InstagramPost}:hover & {
    filter: saturate(1.3) brightness(1.1);
  }
`;

const PostOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(131, 58, 180, 0.8),
    rgba(253, 29, 29, 0.8),
    rgba(252, 176, 64, 0.8)
  );
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2rem;

  .anticon {
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const SocialSection = styled.div`
  text-align: center;
  background: #fff;
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const SocialTitle = styled(Title)`
  &.ant-typography {
    font-size: 1.8rem !important;
    margin-bottom: 30px !important;
    color: #333 !important;
    font-weight: 500 !important;
  }
`;

const SocialButtons = styled(Space)`
  margin-bottom: 30px;

  @media (max-width: 768px) {
    .ant-space-item {
      margin-bottom: 10px;
    }
  }
`;

const SocialButton = styled(Button)`
  &.ant-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #e8e8e8;
    background: #fff;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    .anticon {
      font-size: 1.2rem;
    }

    &.facebook:hover {
      border-color: #1877f2;
      background: #1877f2;
      color: #fff;
    }

    &.instagram:hover {
      border-color: #e4405f;
      background: linear-gradient(
        45deg,
        #f09433 0%,
        #e6683c 25%,
        #dc2743 50%,
        #cc2366 75%,
        #bc1888 100%
      );
      color: #fff;
    }

    &.twitter:hover {
      border-color: #1da1f2;
      background: #1da1f2;
      color: #fff;
    }

    &.youtube:hover {
      border-color: #ff0000;
      background: #ff0000;
      color: #fff;
    }
  }
`;

const ContactInfo = styled(Paragraph)`
  &.ant-typography {
    color: #666;
    margin: 0 !important;
    font-size: 1.1rem;
  }
`;

const InstagramSection = () => {
  const instagramPosts = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1594736797933-d0701ba50168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  ];

  return (
    <InstagramContainer>
      <Container>
        <SectionTitle level={2} data-aos="fade-up">
          Follow Me on Instagram
        </SectionTitle>
        <SectionSubtitle data-aos="fade-up" data-aos-delay="200">
          @ My_wedding_day
        </SectionSubtitle>

        <InstagramGrid>
          {instagramPosts.map((image, index) => (
            <InstagramPost
              key={index}
              data-aos="zoom-in"
              data-aos-delay={100 * (index + 1)}
              data-aos-duration="600"
            >
              <PostImage
                src={image}
                alt={`Instagram post ${index + 1}`}
                preview={false}
              />
              <PostOverlay className="instagram-overlay">
                <InstagramOutlined />
              </PostOverlay>
            </InstagramPost>
          ))}
        </InstagramGrid>

        <SocialSection data-aos="fade-up" data-aos-delay="800">
          <SocialTitle level={3}>Follow Us</SocialTitle>

          <SocialButtons wrap>
            <SocialButton
              className="facebook"
              icon={<FacebookOutlined />}
              data-aos="fade-up"
              data-aos-delay="900"
            />
            <SocialButton
              className="instagram"
              icon={<InstagramOutlined />}
              data-aos="fade-up"
              data-aos-delay="950"
            />
            <SocialButton
              className="twitter"
              icon={<TwitterOutlined />}
              data-aos="fade-up"
              data-aos-delay="1000"
            />
            <SocialButton
              className="youtube"
              icon={<YoutubeOutlined />}
              data-aos="fade-up"
              data-aos-delay="1050"
            />
          </SocialButtons>

          <ContactInfo data-aos="fade-up" data-aos-delay="1100">
            Solene@photographystudio.com
          </ContactInfo>
        </SocialSection>
      </Container>
    </InstagramContainer>
  );
};

export default InstagramSection;
