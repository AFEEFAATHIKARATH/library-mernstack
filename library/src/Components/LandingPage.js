import React from "react";
import { Menu, Dropdown } from "antd";
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

  const profileMenu = (
    <Menu>
      <Menu.Item key="login">
        <Link
          to="#login"
          onClick={() => scrollToSection("login")}
          style={{ textDecoration: "none" }}
        >
          Login
        </Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Link
          to="#register"
          onClick={() => scrollToSection("register")}
          style={{ textDecoration: "none" }}
        >
          Signup
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Menu mode="horizontal" theme="light" className="navigation-menu">
      <Menu.Item key="logo" className="logo">
        <Link
          style={{
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "24px",
          }}
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

      <Dropdown overlay={profileMenu} trigger={["click"]}>
        <Menu.Item key="profile" className="profile-menu">
          <Link to="#" style={{ textDecoration: "none" }}>
            Profile
          </Link>
        </Menu.Item>
      </Dropdown>
    </Menu>
  );
};

export default Navigation;
