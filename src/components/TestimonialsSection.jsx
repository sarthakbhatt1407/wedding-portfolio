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
  const reviews = [
    {
      name: "Radha Kahana Pun official",
      rating: 5,
      reviewsCount: 1,
      time: "1 month ago",
      reviewText:
        "Rivaaz Films ek super creative & professional team hai! 🎬 Music distribution aur brand promotion ki best service dete hain. Trustworthy, supportive & full of new ideas! Highly recommended! ✨",
    },
    {
      name: "Anil Duriyal",
      rating: 5,
      reviewsCount: 1,
      time: "3 months ago",
      reviewText:
        "Rivaaz Films has completely transformed the way I release my music. Their distribution services are fast, efficient, and reach all major platforms seamlessly. The team is supportive, guides you through every step, and ensures your music gets the visibility it deserves. Highly recommended for independent artists looking to grow! ❤️",
    },
    {
      name: "Arjun semliyat",
      rating: 5,
      reviewsCount: 1,
      time: "3 months ago",
      reviewText:
        "Rivaaz Films provided an amazing photography experience. The team was professional, punctual, and creative with their shots. Candid moments were beautifully captured, and editing quality was top-notch. Delivery was on time, though pricing felt slightly premium. Overall, a wonderful choice for weddings and events.",
    },
  ];

  return (
    <TestimonialsContainer>
      <Container>
        <SectionTitle level={2} data-aos="fade-up">
          Client Reviews
        </SectionTitle>
        <SectionSubtitle data-aos="fade-up" data-aos-delay="200">
          What our clients say about us
        </SectionSubtitle>

        <div data-aos="fade-up" data-aos-delay="400">
          <StyledCarousel autoplay dots>
            {reviews.map((review, index) => (
              <div key={index}>
                <TestimonialCard>
                  <Rate
                    disabled
                    defaultValue={review.rating}
                    style={{ color: "#ffd700", marginBottom: "20px" }}
                  />
                  <TestimonialContent>{review.reviewText}</TestimonialContent>
                  <TestimonialName level={4}>{review.name}</TestimonialName>
                  <TestimonialDate>{review.time}</TestimonialDate>
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
