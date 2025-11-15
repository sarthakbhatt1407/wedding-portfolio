import React, { useState, useEffect } from "react";
import { Button } from "antd";
import {
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
  UserOutlined,
  CameraOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  InstagramOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${(props) =>
    props.isInHero ? "transparent" : "rgba(255, 255, 255, 0.95)"};
  backdrop-filter: ${(props) => (props.isInHero ? "none" : "blur(20px)")};
  border-bottom: ${(props) =>
    props.isInHero ? "none" : "1px solid rgba(255, 255, 255, 0.2)"};
  transform: translateY(${(props) => (props.isVisible ? "0" : "-100%")});
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: ${(props) =>
    props.isScrolled && !props.isInHero
      ? "0 2px 20px rgba(0, 0, 0, 0.1)"
      : "none"};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  @media (max-width: 1200px) {
    max-width: 960px;
    padding: 1rem 1.5rem;
  }

  @media (max-width: 992px) {
    max-width: 720px;
    padding: 0.8rem 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    max-width: 100%;
  }

  @media (max-width: 576px) {
    padding: 0.6rem 0.8rem;
  }
`;

const Logo = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => (props.isInHero ? "#fff" : "#2c3e50")};
  letter-spacing: -0.02em;
  transition: color 0.3s ease;
  cursor: pointer;
  text-shadow: ${(props) =>
    props.isInHero ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "none"};

  &:hover {
    color: ${(props) =>
      props.isInHero ? "rgba(255, 255, 255, 0.8)" : "#d4af37"};
    transform: scale(1.05);
  }

  @media (max-width: 1200px) {
    font-size: 1.6rem;
  }

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 576px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 1200px) {
    gap: 25px;
  }

  @media (max-width: 992px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.a`
  color: ${(props) => (props.isInHero ? "#fff" : "#2c3e50")};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  transition: all 0.3s ease;
  text-shadow: ${(props) =>
    props.isInHero ? "1px 1px 2px rgba(0, 0, 0, 0.5)" : "none"};

  &:hover {
    color: ${(props) =>
      props.isInHero ? "rgba(255, 255, 255, 0.8)" : "#d4af37"};
    transform: translateY(-2px);
  }

  @media (max-width: 1200px) {
    font-size: 0.85rem;
    letter-spacing: 0.8px;
  }

  @media (max-width: 992px) {
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${(props) => (props.isInHero ? "#fff" : "#d4af37")};
    transition: all 0.3s ease;
    transform: translateX(-50%);
    box-shadow: ${(props) =>
      props.isInHero ? "0 1px 2px rgba(0, 0, 0, 0.3)" : "none"};
  }

  &:hover::after {
    width: 100%;
  }

  &.active::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(Button)`
  &.ant-btn {
    display: none;
    border: 2px solid
      ${(props) =>
        props.isInHero
          ? "rgba(255, 255, 255, 0.3)"
          : "rgba(212, 175, 55, 0.3)"};
    background: ${(props) =>
      props.isInHero ? "rgba(255, 255, 255, 0.1)" : "rgba(212, 175, 55, 0.1)"};
    color: ${(props) => (props.isInHero ? "#fff" : "#2c3e50")};
    padding: 8px 12px;
    height: 44px;
    width: 44px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    &:hover,
    &:focus {
      background: ${(props) =>
        props.isInHero
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(212, 175, 55, 0.2)"};
      color: ${(props) => (props.isInHero ? "#fff" : "#DA1701")};
      border-color: ${(props) =>
        props.isInHero ? "rgba(255, 255, 255, 0.5)" : "#DA1701"};
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: scale(0.95);
    }

    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

// Minimal Sliding Mobile Menu
const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
`;

const MobileMenuSlider = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  z-index: 9999;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.3s ease;
  padding: 80px 0 40px 0;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(212, 175, 55, 0.3);
`;

const MobileMenuTitle = styled.h3`
  color: #da1701;
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 2px solid rgba(212, 175, 55, 0.3);
  color: #da1701;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: #da1701;
    transform: rotate(90deg);
  }
`;

const MobileMenuItem = styled.div`
  padding: 12px 30px;
  color: #2c3e50;
  font-size: 0.95rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;

  ${(props) =>
    props.isActive &&
    `
    color: #DA1701;
    background: rgba(212, 175, 55, 0.1);
    border-left-color: #DA1701;
  `}

  &:hover {
    color: #da1701;
    background: rgba(212, 175, 55, 0.05);
    padding-left: 35px;
  }
`;

const ContactButton = styled(Button)`
  &.ant-btn {
    background: ${(props) =>
      props.isInHero
        ? "rgba(255, 255, 255, 0.15)"
        : "linear-gradient(45deg, #DA1701, #f1c40f)"};
    border: ${(props) =>
      props.isInHero ? "2px solid rgba(255, 255, 255, 0.4)" : "none"};
    color: #fff;
    border-radius: 25px;
    padding: 0 25px;
    height: 40px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    backdrop-filter: ${(props) => (props.isInHero ? "blur(10px)" : "none")};
    text-shadow: ${(props) =>
      props.isInHero ? "1px 1px 2px rgba(0, 0, 0, 0.5)" : "none"};
    box-shadow: ${(props) =>
      props.isInHero
        ? "0 4px 15px rgba(0, 0, 0, 0.2)"
        : "0 4px 15px rgba(212, 175, 55, 0.3)"};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${(props) =>
        props.isInHero
          ? "0 8px 25px rgba(0, 0, 0, 0.3)"
          : "0 8px 25px rgba(212, 175, 55, 0.4)"};
      background: ${(props) =>
        props.isInHero
          ? "rgba(255, 255, 255, 0.25)"
          : "linear-gradient(45deg, #f1c40f, #DA1701)"};
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHero, setIsInHero] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { key: "home", label: "Home", icon: <HomeOutlined />, href: "#home" },
    { key: "about", label: "About", icon: <UserOutlined />, href: "#about" },
    {
      key: "portfolio",
      label: "Portfolio",
      icon: <CameraOutlined />,
      href: "#portfolio",
    },
    {
      key: "services",
      label: "Services",
      icon: <CustomerServiceOutlined />,
      href: "#services",
    },
    { key: "team", label: "Team", icon: <TeamOutlined />, href: "#team" },
    {
      key: "testimonials",
      label: "Testimonials",
      icon: <MessageOutlined />,
      href: "#testimonials",
    },
    {
      key: "contact",
      label: "Contact",
      icon: <PhoneOutlined />,
      href: "#contact",
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: <InstagramOutlined />,
      href: "#instagram",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);

      // Check if we're in the hero section
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        setIsInHero(heroRect.bottom > 100);
      }

      setLastScrollY(currentScrollY);

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "portfolio",
        "services",
        "team",
        "testimonials",
        "contact",
        "instagram",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <>
      <NavContainer
        isVisible={isVisible}
        isScrolled={isScrolled}
        isInHero={isInHero}
      >
        <NavContent>
          <Logo isInHero={isInHero} onClick={() => scrollToSection("#home")}>
            Solène
          </Logo>

          <NavMenu>
            {menuItems.slice(0, 6).map((item) => (
              <NavItem
                key={item.key}
                href={item.href}
                isInHero={isInHero}
                className={activeSection === item.key ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
              >
                {item.label}
              </NavItem>
            ))}
          </NavMenu>

          <ContactButton
            isInHero={isInHero}
            onClick={() => scrollToSection("#contact")}
            data-aos="fade-left"
          >
            Get In Touch
          </ContactButton>

          <MobileMenuButton
            isInHero={isInHero}
            icon={<MenuOutlined style={{ fontSize: "1.5rem" }} />}
            onClick={toggleMobileMenu}
          />
        </NavContent>
      </NavContainer>

      {/* Minimal Sliding Mobile Menu */}
      <MobileMenuOverlay isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
      <MobileMenuSlider isOpen={mobileMenuOpen}>
        {menuItems.map((item) => (
          <MobileMenuItem
            key={item.key}
            onClick={() => scrollToSection(item.href)}
            isActive={activeSection === item.key}
          >
            {item.label}
          </MobileMenuItem>
        ))}
      </MobileMenuSlider>
    </>
  );
};

export default FloatingNav;
