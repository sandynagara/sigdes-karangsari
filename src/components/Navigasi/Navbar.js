import React, { useState, useEffect } from "react";
import "./Navbar.css";
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import {Link} from "react-scroll";

const dataNav = ["Statistik"];

function DropdownMenu({setScrollPosition}){

  const [active, setActive] = useState(false)
 
  return(
    <div>
      <div className="dropdown-menu-item" onClick={()=>{setActive(!active); setScrollPosition(false)}}>
        {active ?  
          <AiOutlineClose style={{color:"white",width:"25px",height:"25px"}}/> :
          <AiOutlineMenu style={{color:"white",width:"25px",height:"25px"}}/>
        }
      </div>
      {active && <div className="dropdown-on">
        {dataNav.map((e, index) => {
            return (
              <Link
                activeClass="active"
                to={e}
                duration={1000}
              >
                <h6 className="menu"  key={index} >
                  {e}
                </h6>
              </Link>
            );
          })}
      </div>}
      
    </div>
  )
}

function Navbar2() {
  const [scrollPosition, setScrollPosition] = useState(true);
  const [resize, setResize] = useState(true);
  
  useEffect(() => {
    handleResize()
  }, [])
 
  const handleScroll = () => {
    const positionY = window.pageYOffset;
    if(positionY<100){
      setScrollPosition(true);
    }else{
      setScrollPosition(false);
    }
  };

  const handleResize = () => {
    const positionX = document.documentElement.clientWidth;
    if(positionX<600){
      setResize(false);
    }else{
      setResize(true);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  return (
    <div className="nav"
      style={
        scrollPosition 
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

      {resize ? <div className="item-center">
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
      </div> :  <DropdownMenu setScrollPosition={setScrollPosition}/>}
      
   
    </div>
  );
}

export default Navbar2;
