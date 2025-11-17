import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/global.css";
import FloatingNav from "../components/FloatingNav";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import PortfolioSection from "../components/PortfolioSection";
import VideoSection from "../components/VideoSection";

import TeamSection from "../components/TeamSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import BlogSection from "../components/BlogSection";
import PricingSection from "../components/PricingSection";
import ContactSection from "../components/ContactSection";
import InstagramSection from "../components/InstagramSection";
import Footer from "../components/Footer";
import styled from "styled-components";

const ResponsiveContainer = styled.div`
  width: 100%;
  overflow-x: hidden;

  /* Ensure sections stack properly on mobile */
  section,
  div[data-aos] {
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
  }

  /* Global responsive text scaling */
  @media (max-width: 576px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50, // Reduced offset for mobile
      easing: "ease-out-cubic",
      // Disable animations on very small screens for performance
      disable: window.innerWidth < 350 ? true : false,
    });

    // Refresh AOS on window resize to handle orientation changes
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle navigation with target section from other pages
  useEffect(() => {
    if (location.state?.targetSection) {
      const targetSection = location.state.targetSection;
      const element = document.querySelector(targetSection);
      if (element) {
        // Delay to ensure the page is fully rendered and AOS animations are complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
      // Clear the state to prevent repeated scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <ResponsiveContainer className="home-page">
      <FloatingNav />
      <section id="home">
        <HeroSection />
      </section>
      <section id="about" data-aos="fade-up">
        <AboutSection />
      </section>
      <section id="portfolio" data-aos="fade-up" data-aos-delay="100">
        <PortfolioSection />
      </section>
      <div data-aos="fade-up" data-aos-delay="200">
        <VideoSection />
      </div>

      <section id="team" data-aos="fade-up" data-aos-delay="200">
        <TeamSection />
      </section>
      <section id="services" data-aos="fade-up" data-aos-delay="100">
        <ServicesSection />
      </section>
      <section id="testimonials" data-aos="fade-up" data-aos-delay="200">
        <TestimonialsSection />
      </section>
      <div data-aos="fade-up" data-aos-delay="100">
        <BlogSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <PricingSection />
      </div>
      <section id="contact" data-aos="fade-up" data-aos-delay="100">
        <ContactSection />
      </section>
      <section id="instagram" data-aos="fade-up" data-aos-delay="200">
        <InstagramSection />
      </section>
      <Footer />
    </ResponsiveContainer>
  );
};

export default Home;
