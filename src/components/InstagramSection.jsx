import { Typography, Button, Space } from "antd";
import {
  InstagramOutlined,
  FacebookOutlined,
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
  return (
    <InstagramContainer>
      <Container>
        <SocialSection data-aos="fade-up" data-aos-delay="800">
          <SocialTitle level={3}>Follow Us</SocialTitle>

          <SocialButtons wrap>
            <SocialButton
              className="facebook"
              icon={<FacebookOutlined />}
              href="https://www.facebook.com/rivaazfilms/"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay="900"
            />
            <SocialButton
              className="instagram"
              icon={<InstagramOutlined />}
              href="https://www.instagram.com/rivaazfilms/"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay="950"
            />
            <SocialButton
              className="youtube"
              icon={<YoutubeOutlined />}
              href="https://www.youtube.com/@rivaazfilms837"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay="1000"
            />
          </SocialButtons>

          <ContactInfo data-aos="fade-up" data-aos-delay="1100">
            rivaazfilm@gmail.com
          </ContactInfo>
        </SocialSection>
      </Container>
    </InstagramContainer>
  );
};

export default InstagramSection;
