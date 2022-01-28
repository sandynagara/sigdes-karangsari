import React,{useRef, useState} from "react";
import "./NavPeta.css";
import * as Ai from "react-icons/ai";
import * as Bs from "react-icons/bs";
import {FaRegMap} from "react-icons/fa"
import { Link } from "react-router-dom";

function Icon({ icon ,judul ,open, setOpen}) {
    const [hover ,setHover] = useState(false)

    const changeOpenSidebar = () => {
        var style
        if (open === judul) {
            style = {borderRadius : "5px 0px 0px 5px" ,padding:"8px 18px 12px 10px" ,backgroundColor:"white",color:"black"}
        }
        return style
    }

  return (
    <div style={{display:"flex" ,alignItems:"center"}}>
      <div className="menu-logo" style={changeOpenSidebar()} onMouseEnter={() => {setHover(true)}} onMouseLeave={()=>{setHover(false)}} onClick={(e)=> {open === judul ?  setOpen(false) : setOpen(judul)}}>{icon}</div>
      {hover && <div className="menu-name">{judul}</div>}
    </div>
  );
}

function NavPeta({open,setOpen }) {

  return (
    <div className="navbar-peta">
      <Link to={"/"}>
        <Icon
          icon={<Ai.AiOutlineHome style={{ width: "20px", height: "20px" }} />}
          judul="Home"
          open={open}
          setOpen={setOpen}
        />
      </Link>
      
      <Icon
        icon={<Ai.AiOutlineSearch style={{ width: "20px", height: "20px" }} />}
        judul="Search"
        open={open}
        setOpen={setOpen}
      />
      <Icon
        icon={<Bs.BsBuilding style={{ width: "20px", height: "20px" }} /> }
        judul="Bangunan"
        open={open}
        setOpen={setOpen}
      />
      <Icon
        icon={<Bs.BsLayers style={{ width: "20px", height: "20px" }} /> }
        judul="Layer"
        open={open}
        setOpen={setOpen}
      />
       <Icon
        icon={<FaRegMap style={{ width: "20px", height: "20px" }} /> }
        judul="Legenda"
        open={open}
        setOpen={setOpen}
      />
      <Icon
        icon={<Bs.BsGlobe2 style={{ width: "20px", height: "20px" }} /> }
        judul="Basemap"
        open={open}
        setOpen={setOpen}
      />  
      <Icon
        icon={<Ai.AiOutlineUser style={{ width: "20px", height: "20px" }} /> }
        judul="Admin"
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default NavPeta;
