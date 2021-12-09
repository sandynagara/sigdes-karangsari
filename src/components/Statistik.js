import React from "react";
import Fade from "react-reveal/Fade";
import "./Statistik.css";

const layerImage =
  "https://cdn1.iconfinder.com/data/icons/pixel-perfect-at-16px-volume-2/16/5049-512.png";
const peopleImage =
  "https://fashionsista.co/downloadpng/png/20201008/free-people-icons-3-000-icons-in-png-eps-svg-format.jpg";

const data = [
  { judul: "Dusun", data: 12, img: layerImage },
  { judul: "RT", data: 63, img: layerImage },
  { judul: "Penduduk", data: 30000, img: peopleImage },
];

var ItemStatistik = ({ data }) => {
  return (
    <Fade bottom>
      <div className="item-statistik">
        <img src={data.img} className="icon-statistik" />
        <div className="data-statistik">{data.data}</div>
        <div className="judul-data">{data.judul}</div>
      </div>
    </Fade>
  );
};

function Statistik() {
  return (
    <div style={{ padding: "80px 0px", backgroundColor: "#f7f7f7" }}>
      <div className="judul">
        <p>Statistik Desa Karangsari</p>
      </div>
      <div className="statistik">
        {data.map((e,index) => {
          return <ItemStatistik key={index} data={e} />;
        })}
      </div>
    </div>
  );
}

export default Statistik;
