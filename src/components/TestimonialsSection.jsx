import React from "react";
import { Typography, Carousel, Avatar, Rate } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const TestimonialsContainer = styled.section`
  padding: 120px 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #fff;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const SectionTitle = styled(Title)`
  &.ant-typography {
    text-align: center;
    font-size: 2.5rem !important;
    font-weight: 300 !important;
    margin-bottom: 20px !important;
    color: #fff !important;
    font-family: "Playfair Display", serif !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    @media (max-width: 768px) {
      font-size: 2rem !important;
    }
  }
`;

const SectionSubtitle = styled(Paragraph)`
  &.ant-typography {
    text-align: center;
    color: #f0f0f0 !important;
    font-size: 1.1rem;
    margin-bottom: 60px !important;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }
`;

const TestimonialCard = styled.div`
  padding: 40px 20px;
  text-align: center;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const TestimonialContent = styled(Paragraph)`
  &.ant-typography {
    color: #f0f0f0 !important;
    font-size: 1.2rem !important;
    line-height: 1.8 !important;
    margin-bottom: 30px !important;
    font-style: italic;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    position: relative;

    &::before {
      content: '"';
      font-size: 4rem;
      color: rgba(255, 255, 255, 0.2);
      position: absolute;
      top: -20px;
      left: -20px;
      font-family: serif;
    }

    &::after {
      content: '"';
      font-size: 4rem;
      color: rgba(255, 255, 255, 0.2);
      position: absolute;
      bottom: -20px;
      right: -20px;
      font-family: serif;
    }

    @media (max-width: 768px) {
      font-size: 1.1rem !important;

      &::before,
      &::after {
        font-size: 3rem;
      }
    }
  }
`;

const TestimonialAvatar = styled(Avatar)`
  &.ant-avatar {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    animation: float 3s ease-in-out infinite;

    @keyframes float {
      0%,
      100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    &:hover {
      transform: scale(1.1);
      border-color: rgba(255, 255, 255, 0.6);
    }

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
    }
  }
`;

const TestimonialName = styled(Title)`
  &.ant-typography {
    color: #fff !important;
    font-size: 1.3rem !important;
    margin-bottom: 5px !important;
    font-weight: 500 !important;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  }
`;

const TestimonialDate = styled(Paragraph)`
  &.ant-typography {
    color: rgba(255, 255, 255, 0.7) !important;
    font-size: 0.9rem !important;
    margin: 0 !important;
  }
`;

const StyledCarousel = styled(Carousel)`
  .slick-dots {
    bottom: -60px;

    li button {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      width: 12px;
      height: 12px;
      transition: all 0.3s ease;
    }

    li.slick-active button {
      background: #fff;
      transform: scale(1.2);
    }

    li:hover button {
      background: rgba(255, 255, 255, 0.6);
    }
  }

  .slick-slide {
    transition: all 0.3s ease;
  }
`;

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      content:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis vitae feugiat magna, ut mattis ligula praesentium voluptatum deleniti atque corrupti quos et quas molestias excepturi. The photos turned out absolutely stunning!",
      name: "Gloria & Nate",
      date: "December 01, 2019",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    },
    {
      id: 2,
      content:
        "Accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi at vero eos et vitae feugiat magna. Professional and friendly service throughout our special day.",
      name: "Emma & Mike",
      date: "November 19, 2019",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 3,
      content:
        "Accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi at vero eos et vitae feugiat magna, ut ligula. Couldn't be happier with the results!",
      name: "Diana & Georg",
      date: "October 12, 2019",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    },
  ];

  return (
    <TestimonialsContainer>
      <Container>
        <SectionTitle level={2} data-aos="fade-up">
          Testimonials
        </SectionTitle>
        <SectionSubtitle data-aos="fade-up" data-aos-delay="200">
          Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil
          expetendis in mei.
        </SectionSubtitle>

        <div data-aos="fade-up" data-aos-delay="400">
          <StyledCarousel autoplay dots>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id}>
                <TestimonialCard>
                  <Rate
                    disabled
                    defaultValue={5}
                    style={{ color: "#ffd700", marginBottom: "20px" }}
                  />
                  <TestimonialContent>{testimonial.content}</TestimonialContent>
                  <TestimonialAvatar src={testimonial.avatar} />
                  <TestimonialName level={4}>
                    {testimonial.name}
                  </TestimonialName>
                  <TestimonialDate>{testimonial.date}</TestimonialDate>
                </TestimonialCard>
              </div>
            ))}
          </StyledCarousel>
        </div>
      </Container>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;
