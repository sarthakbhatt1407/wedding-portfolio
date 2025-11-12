import React from "react";
import { Row, Col, Typography, Card, Space, Button } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

const { Title, Paragraph } = Typography;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(212, 175, 55, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
  }
`;

const shine = keyframes`
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
`;

const TeamContainer = styled.section`
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><defs><pattern id="hexagon" width="60" height="60" patternUnits="userSpaceOnUse"><polygon points="30,2 52,17 52,43 30,58 8,43 8,17" fill="none" stroke="%23d4af37" stroke-width="1" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23hexagon)"/></svg>');
    opacity: 0.3;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(212, 175, 55, 0.08) 0%,
      transparent 60%
    );
    animation: ${float} 25s ease-in-out infinite;
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
      background: linear-gradient(135deg, #d4af37, #f1c40f);
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

const TeamCard = styled(Card)`
  &.ant-card {
    border: none;
    border-radius: 25px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.08);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
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
      transition: left 0.8s ease;
      z-index: 1;
    }

    &:hover {
      transform: translateY(-25px) scale(1.02);
      box-shadow: 0 40px 100px rgba(0, 0, 0, 0.15);
      background: rgba(255, 255, 255, 1);

      &::before {
        left: 100%;
      }
    }

    .ant-card-body {
      padding: 0;
      position: relative;
      z-index: 2;
    }
  }
`;

const TeamImage = styled.div`
  width: 100%;
  height: 350px;
  background: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(212, 175, 55, 0.1),
      transparent 50%,
      rgba(0, 0, 0, 0.1)
    );
    transition: all 0.5s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: -100%;
    left: -100%;
    width: 300%;
    height: 300%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    transition: all 0.8s ease;
  }

  ${TeamCard}:hover &::after {
    animation: ${shine} 1s ease-in-out;
  }
`;

const TeamOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.8));
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 25px;
  z-index: 3;

  ${TeamCard}:hover & {
    opacity: 1;
  }
`;

const MemberInfo = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  padding: 30px 25px;
  text-align: center;
  border-radius: 0 0 25px 25px;
  position: relative;
  transition: all 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(135deg, #d4af37, #f1c40f);
    border-radius: 2px;
  }
`;

const SocialLinks = styled(Space)`
  margin-bottom: 15px;

  .anticon {
    font-size: 1.4rem;
    color: #fff;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
    padding: 12px;
    border-radius: 50%;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    &:hover {
      color: #fff;
      background: linear-gradient(135deg, #d4af37, #f1c40f);
      transform: scale(1.2) translateY(-3px);
      box-shadow: 0 10px 20px rgba(212, 175, 55, 0.4);
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;

  .contact-item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    .anticon {
      margin-right: 8px;
      color: #d4af37;
      font-size: 1rem;
    }

    &:hover {
      color: #d4af37;
      transform: translateX(5px);
    }
  }
`;

const ViewProfileBtn = styled(Button)`
  &.ant-btn {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: #fff;
    border-radius: 25px;
    padding: 8px 20px;
    height: auto;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.8rem;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);

    &:hover {
      background: linear-gradient(135deg, #d4af37, #f1c40f);
      border-color: #d4af37;
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
    }
  }
`;

const MemberName = styled(Title)`
  &.ant-typography {
    font-size: 1.6rem !important;
    margin-bottom: 8px !important;
    color: #2c3e50 !important;
    font-weight: 600 !important;
    font-family: "Playfair Display", serif !important;
    transition: color 0.3s ease;
  }

  ${TeamCard}:hover & {
    color: #d4af37 !important;
  }
`;

const MemberRole = styled(Paragraph)`
  &.ant-typography {
    color: #d4af37 !important;
    margin-bottom: 15px !important;
    font-size: 1rem !important;
    text-transform: uppercase !important;
    letter-spacing: 1.5px !important;
    font-weight: 500 !important;
  }
`;

const MemberDescription = styled(Paragraph)`
  &.ant-typography {
    color: #7f8c8d !important;
    margin-bottom: 20px !important;
    font-size: 0.95rem !important;
    line-height: 1.6 !important;
    font-style: italic;
  }
`;

const ExperienceBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #d4af37, #f1c40f);
  color: #fff;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  animation: ${pulse} 3s infinite;
  z-index: 4;
`;

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Maria Smith",
      role: "Lead Photographer",
      experience: "8+ Years",
      description:
        "Specializing in romantic wedding photography with an artistic eye for capturing intimate moments.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      email: "maria@weddingphoto.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      name: "Viola Jensen",
      role: "Cinematic Director",
      experience: "6+ Years",
      description:
        "Creating stunning wedding films that tell your unique love story through emotional cinematography.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      email: "viola@weddingphoto.com",
      phone: "+1 (555) 234-5678",
    },
    {
      id: 3,
      name: "Felicia Davis",
      role: "Event Coordinator",
      experience: "5+ Years",
      description:
        "Expert wedding planner ensuring every detail is perfect for your special day.",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      email: "felicia@weddingphoto.com",
      phone: "+1 (555) 345-6789",
    },
    {
      id: 4,
      name: "Jeff Alvarez",
      role: "Portrait Specialist",
      experience: "7+ Years",
      description:
        "Master of engagement and couple portraits with a passion for natural lighting and genuine emotions.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      email: "jeff@weddingphoto.com",
      phone: "+1 (555) 456-7890",
    },
  ];

  return (
    <TeamContainer>
      <Container>
        <SectionTitle level={2} data-aos="fade-up">
          Meet Our Creative Team
        </SectionTitle>
        <SectionSubtitle data-aos="fade-up" data-aos-delay="200">
          Our passionate team of wedding professionals combines artistic vision
          with technical expertise to capture your love story beautifully. Each
          member brings unique skills and years of experience to make your
          special day unforgettable.
        </SectionSubtitle>

        <Row gutter={[40, 40]}>
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} lg={6} key={member.id}>
              <TeamCard
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
                data-aos-duration="800"
              >
                <TeamImage image={member.image}>
                  <ExperienceBadge>{member.experience}</ExperienceBadge>
                  <TeamOverlay>
                    <ContactInfo>
                      <div className="contact-item">
                        <MailOutlined />
                        {member.email}
                      </div>
                      <div className="contact-item">
                        <PhoneOutlined />
                        {member.phone}
                      </div>
                    </ContactInfo>
                    <SocialLinks size="large">
                      <FacebookOutlined />
                      <InstagramOutlined />
                      <TwitterOutlined />
                    </SocialLinks>
                    <ViewProfileBtn>View Portfolio</ViewProfileBtn>
                  </TeamOverlay>
                </TeamImage>
                <MemberInfo>
                  <MemberName level={4}>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberDescription>{member.description}</MemberDescription>
                </MemberInfo>
              </TeamCard>
            </Col>
          ))}
        </Row>
      </Container>
    </TeamContainer>
  );
};

export default TeamSection;
