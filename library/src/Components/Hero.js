import React from "react";
import ParticlesBg from "particles-bg";
import "./hero.css";

const Header = (props) => {
  return (
    <header id="header">
      <ParticlesBg type="circle" num={150} bg={true} />
      <div className="intro">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 intro-text">
              <h1>{props.data ? props.data.title : "Loading"}</h1>
              <p>{props.data ? props.data.paragraph : "Loading"}</p>
              <a
                style={{ textDecoration: "none" }}
                 href="#features"
                className="btn btn-custom btn-lg page-scroll"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
