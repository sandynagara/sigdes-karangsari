import React from "react";
import video from "./vidio/karangsari.mp4";
import { Link } from "react-router-dom";

function Backgroud() {
  return (
    <div className="background" id="background">
      <div className="judul">
        <h1 >SIGDES KARANGSARI</h1>
        <h6 className="snipset">Sistem Informasi Geospasial Desa Karangsari</h6>
        <div class="button-background">
        {/* <button className="about"><h6><b>ABOUT</b></h6></button> */}
          <a href="http://karangsari-kulonprogo.desa.id/index.php/first">
            <button className="masuk webdesa" type="button"><h6><b>MASUK WEB DESA</b></h6></button>
          </a>
          <Link to={"/dashboard"}>
            <button className="masuk sigdes" type="button"><h6><b>MASUK SIGDES</b></h6></button>
          </Link>
        </div>
       
      </div>
      <div className="black-layer">
      </div>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          zIndex: "-1",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={video} types="video/mp4" />
      </video>
    </div>
  );
}

export default Backgroud;
