import Peta from "../components/Peta";
import React, { useState, useCallback} from "react";
import Search from "../components/Search";
import NavPeta from "../components/Navigasi/NavPeta";
import SidebarBangunan from "../components/SidebarBangunan";
import Login from "../components/Login";
import Basemap from "../components/Basemap"
import Layer from "../components/Layer";

function Home() {

  const [Nama, setNama] = useState(false);
  const [detail, setDetail] = useState(false);
  const [bangunan, setBangunan] = useState(false);
  const [basemap,setBasemap] = useState("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}")
  const [opacityBasemap, setOpacityBasemap] = useState(100)
  const [opacityBangunan, setOpacityBangunan] = useState(100)
  const [open, setOpen] = useState("");

  var queryNama = useCallback(
    (e) => {
      setNama(e);
    },
    [Nama]
  );

  return (
      <div>
        <NavPeta open={open} setOpen={(e)=>{setOpen(e)}}/>
        <div style={{ position: "absolute", zIndex: 10000, top: 0,marginLeft:"55px" }}>
          <Search queryNama={queryNama} open={open} setOpen={(e)=>{setOpen(e)}}/>
        </div>
        <SidebarBangunan queryNama={Nama} bangunan={bangunan} open={open} />
        <Peta
          queryNama={Nama}
          queryBangunan={(e) => {
            setBangunan(e);
          }}
          setOpen={(e)=>{setOpen(e)}}
          inputBasemap={basemap}
          opacityBasemap={opacityBasemap}
        />
        <Layer open={open} setOpacityBasemap={(e)=>setOpacityBasemap(e)}/>
        <Basemap open={open} setInputBasemap={(e) => setBasemap(e)} inputBasemap={basemap} />
        <Login setOpen={(e)=>{setOpen(e)}}  open={open} />
      </div>
  );
}

export default Home;
