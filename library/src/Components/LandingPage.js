import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import "./Landing.css";

const Navigation = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <Menu mode="horizontal" theme="light" className="navigation-menu">
      <Menu.Item key="logo" className="logo">
        <Link
          style={{ textDecoration: "none" }}
          to="#page-top"
          onClick={() => scrollToSection("page-top")}
        >
          MY LANDING PAGE
        </Link>
      </Menu.Item>
      <Menu.Item key="features">
        <Link
          style={{ textDecoration: "none" }}
          to="#features"
          onClick={() => scrollToSection("features")}
        >
          Features
        </Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link
          style={{ textDecoration: "none" }}
          to="#about"
          onClick={() => scrollToSection("about")}
        >
          About
        </Link>
      </Menu.Item>
      <Menu.Item key="services">
        <Link
          style={{ textDecoration: "none" }}
          to="#services"
          onClick={() => scrollToSection("services")}
        >
          Services
        </Link>
      </Menu.Item>
      <Menu.Item key="gallery">
        <Link
          style={{ textDecoration: "none" }}
          to="#portfolio"
          onClick={() => scrollToSection("portfolio")}
        >
          Gallery
        </Link>
      </Menu.Item>
   
    </Menu>
  );
};

export default Navigation;
