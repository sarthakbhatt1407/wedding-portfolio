import React, { useState, useEffect, useCallback } from "react";
import { Layout, Typography, Button, Space } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const slideInFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const HeroContainer = styled(Content)`
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: 100vh;
    height: auto;
    align-items: center;
    padding-top: 80px;
  }

  @media (max-width: 576px) {
    padding-top: 70px;
  }

  @media (max-height: 600px) and (max-width: 768px) {
    min-height: 600px;
    height: auto;
  }
`;

const SlideBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.bgImage});
  background-size: cover;
  /*  */
  background-position: center center;
  background-repeat: no-repeat;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transform: ${(props) => (props.isActive ? "scale(1)" : "scale(1.02)")};
  transition: all 1.5s ease-in-out;

  /* Ensure images maintain aspect ratio and fill the container properly */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    background-position: center center;
    background-size: cover;
  }

  @media (orientation: portrait) {
    background-size: cover;
    background-position: center top;
  }

  @media (orientation: landscape) and (max-height: 600px) {
    background-size: cover;
    background-position: center center;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  padding: 0 20px;
  z-index: 10;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 800px;
    padding: 0 30px;
  }

  @media (max-width: 992px) {
    max-width: 700px;
    padding: 0 25px;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 0 20px;
    min-height: 50vh;
  }

  @media (max-width: 576px) {
    max-width: 95%;
    padding: 0 15px;
    min-height: 40vh;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const FloatingText = styled.div`
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  z-index: 3;
  animation: ${fadeIn} 1s ease-out ${(props) => props.delay || "0.5s"} both;
  text-align: center;
  font-weight: 400;

  @media (max-width: 1200px) {
    font-size: 11px;
    letter-spacing: 2.5px;
  }

  @media (max-width: 992px) {
    top: 16%;
    font-size: 10px;
    letter-spacing: 2px;
  }

  @media (max-width: 768px) {
    top: 15%;
    font-size: 9px;
    letter-spacing: 1.5px;
  }

  @media (max-width: 576px) {
    top: 12%;
    font-size: 8px;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 7px;
    letter-spacing: 0.5px;
  }

  @media (orientation: landscape) and (max-height: 600px) {
    top: 10%;
    font-size: 8px;
  }
`;

const MainTitle = styled(Title)`
  &.ant-typography {
    color: #fff !important;
    font-size: clamp(2.8rem, 6vw, 5rem) !important;
    font-weight: 300 !important;
    letter-spacing: 3px !important;
    margin-bottom: 20px !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-family: "Playfair Display", serif !important;
    line-height: 1.1;
    animation: ${slideInFromRight} 1s ease-out
      ${(props) => props.delay || "0.8s"} both;
    text-align: center !important;
    max-width: 100%;
    width: 100%;
    margin-left: auto !important;
    margin-right: auto !important;

    @media (max-width: 1200px) {
      font-size: clamp(2.5rem, 5.5vw, 4.5rem) !important;
      letter-spacing: 2.5px !important;
    }

    @media (max-width: 992px) {
      font-size: clamp(2.2rem, 5vw, 4rem) !important;
      letter-spacing: 2px !important;
    }

    @media (max-width: 768px) {
      font-size: clamp(1.8rem, 7vw, 3rem) !important;
      letter-spacing: 1.5px !important;
      margin-bottom: 15px !important;
      line-height: 1.2;
    }

    @media (max-width: 576px) {
      font-size: clamp(1.6rem, 8vw, 2.5rem) !important;
      letter-spacing: 1px !important;
      margin-bottom: 12px !important;
    }

    @media (max-width: 480px) {
      font-size: clamp(1.4rem, 9vw, 2.2rem) !important;
      letter-spacing: 0.5px !important;
      margin-bottom: 10px !important;
    }

    @media (orientation: landscape) and (max-height: 600px) {
      font-size: clamp(1.8rem, 4vw, 3rem) !important;
      margin-bottom: 10px !important;
    }
  }
`;

const SubTitle = styled(Paragraph)`
  &.ant-typography {
    color: #f0f0f0 !important;
    font-size: 1.4rem !important;
    margin: 0 auto 50px auto !important;
    letter-spacing: 1px !important;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    font-weight: 300;
    line-height: 1.6;
    max-width: 700px;
    text-align: center !important;
    width: 100%;
    animation: ${slideInFromBottom} 1s ease-out
      ${(props) => props.delay || "1.2s"} both;

    @media (max-width: 768px) {
      font-size: 1.1rem !important;
      margin: 0 auto 40px auto !important;
      max-width: 90%;
      line-height: 1.5;
    }

    @media (orientation: landscape) and (max-height: 600px) {
      font-size: 1.2rem !important;
      margin: 0 auto 35px auto !important;
      line-height: 1.4;
    }
  }
`;

const ButtonGroup = styled(Space)`
  animation: ${fadeIn} 1s ease-out ${(props) => props.delay || "1.6s"} both;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px !important;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px !important;

    .ant-space-item {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;

const StyledButton = styled(Button)`
  &.ant-btn {
    border: 2px solid #fff;
    background: transparent;
    color: #fff;
    padding: 15px 45px;
    height: auto;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    border-radius: 0;
    font-weight: 500;

    &:hover {
      background: #fff;
      color: #000;
      border-color: #fff;
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(255, 255, 255, 0.3);
    }

    &.primary {
      background: linear-gradient(45deg, #da1701, #b81501);
      border-color: transparent;

      &:hover {
        background: #fff;
        color: #da1701;
        transform: translateY(-3px);
        box-shadow: 0 15px 35px rgba(218, 23, 1, 0.4);
      }
    }

    @media (max-width: 768px) {
      padding: 12px 35px;
      font-size: 12px;
    }
  }
`;

const SliderNavigation = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 30px;
  z-index: 10;

  @media (max-width: 768px) {
    bottom: 25px;
    gap: 20px;
  }
`;

const SliderDots = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Dot = styled.div`
  width: ${(props) => (props.isActive ? "32px" : "12px")};
  height: 6px;
  border-radius: 6px;
  background: ${(props) =>
    props.isActive
      ? "linear-gradient(45deg, #DA1701, #B81501)"
      : "rgba(255, 255, 255, 0.4)"};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  backdrop-filter: blur(10px);

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${(props) => (props.isActive ? "100%" : "0")};
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    transition: width 0.3s ease;
  }

  &:hover {
    background: ${(props) =>
      props.isActive
        ? "linear-gradient(45deg, #DA1701, #B81501)"
        : "rgba(255, 255, 255, 0.7)"};
    transform: scale(1.2);
    box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    width: ${(props) => (props.isActive ? "24px" : "10px")};
    height: 5px;
    gap: 8px;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(45deg, #da1701, #b81501);
  width: ${(props) => ((props.currentSlide + 1) / props.totalSlides) * 100}%;
  transition: width 0.3s ease;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 8px rgba(102, 126, 234, 0.6);
  }
`;

const SlideCounter = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  padding: 8px 16px;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;

  .current {
    color: #fff;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    top: 25px;
    right: 25px;
    font-size: 12px;
    padding: 6px 12px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      background:
        "https://images.unsplash.com/photo-1597157639073-69284dc0fdaf?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      floatingText: "Made with Love",
      title: "Authentic Wedding Photography",
      subtitle:
        "Capture your precious love memories with our professional photography team that specializes in creating timeless, elegant moments",
    },
    {
      id: 2,
      background:
        "https://images.unsplash.com/photo-1587271636175-90d58cdad458?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      floatingText: "Forever Moments",
      title: "Cinematic Love Stories",
      subtitle:
        "Every couple has a unique story to tell. We transform your special day into a beautiful visual narrative that lasts forever",
    },
    {
      id: 3,
      background:
        "https://plus.unsplash.com/premium_photo-1670524465634-93cf255ffa8b?q=80&w=2954&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      floatingText: "Pure Elegance",
      title: "Timeless Wedding Portraits",
      subtitle:
        "From intimate ceremonies to grand celebrations, we capture the essence of your love with artistic vision and professional expertise",
    },
  ];

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [isAnimating, slides.length]);

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <HeroContainer>
      {slides.map((slide, index) => (
        <SlideBackground
          key={slide.id}
          bgImage={slide.background}
          isActive={index === currentSlide}
        />
      ))}

      <Overlay />

      <SlideCounter>
        <span className="current">
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        {" / "}
        <span>{String(slides.length).padStart(2, "0")}</span>
      </SlideCounter>

      {/* <FloatingText key={`floating-${currentSlide}`} delay="0.5s">
        {currentSlideData.floatingText}
      </FloatingText> */}

      <HeroContent>
        {/* <MainTitle level={1} key={`title-${currentSlide}`} delay="0.8s">
          {currentSlideData.title}
        </MainTitle>

        <SubTitle key={`subtitle-${currentSlide}`} delay="1.2s">
          {currentSlideData.subtitle}
        </SubTitle> */}

        {/* <ButtonGroup size="large" key={`buttons-${currentSlide}`} delay="1.6s">
          <StyledButton size="large" className="primary">
            View Portfolio
          </StyledButton>
          <StyledButton size="large" icon={<PlayCircleOutlined />}>
            Play Video
          </StyledButton>
        </ButtonGroup> */}
      </HeroContent>

      <SliderNavigation>
        <SliderDots>
          {slides.map((_, index) => (
            <Dot
              key={index}
              isActive={index === currentSlide}
              onClick={() => goToSlide(index)}
            />
          ))}
        </SliderDots>
      </SliderNavigation>

      <ProgressBar currentSlide={currentSlide} totalSlides={slides.length} />
    </HeroContainer>
  );
};

export default HeroSection;
