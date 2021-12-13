import React, { useState, useEffect } from "react";
import "./Navbar.css";
import {Link} from "react-scroll";

const dataNav = ["Statistik"];

function Navbar2() {
  const [scrollPosition, setScrollPosition] = useState(0);
 
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }, [scrollPosition]);

  return (
    <div
      className="nav"
      style={
        scrollPosition < 100
          ? { backgroundColor: "rgba(255,0,0,0.0)" }
          : { backgroundColor: "rgba(0, 0, 0, 1)" }
      }
    >
      <Link
        to="background"
        duration={1000}
        offset={-70}
      >
      <div className="nav-logo">
        <h5 style={{ color: "white", padding: "20px 10px" }}>Karangsari</h5>
      </div>
      </Link>

      <div className="item-center">
        {dataNav.map((e, index) => {
          return (
            <Link
              activeClass="active"
              to={e}
              duration={1000}
              offset={-70}
            >
              <h6 className="menu"  key={index} >
                {e}
              </h6>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar2;
