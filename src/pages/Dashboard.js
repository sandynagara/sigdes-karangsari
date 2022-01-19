import Peta from "../components/Peta";
import React, { useState, useCallback } from "react";
import Search from "../components/Search";
import NavPeta from "../components/Navigasi/NavPeta";
import SidebarBangunan from "../components/SidebarBangunan";
import Login from "../components/Login";
import Basemap from "../components/Basemap";
import Layer from "../components/Layer";
import Legenda from "../components/Legenda";

function Home() {
  const [Nama, setNama] = useState(false);
  const [bangunan, setBangunan] = useState(false);
  const [basemap, setBasemap] = useState("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}");
  const [opacityBasemap, setOpacityBasemap] = useState(100);
  const [opacityBangunan, setOpacityBangunan] = useState(100);
  const [opacityJalan, setOpacityJalan] = useState(100);
  const [opacitySungai, setOpacitySungai] = useState(100);
  const [opacityBatasRt, setOpacityBatasRt] = useState(100)
  const [opacityBatasDusun, setOpacityBatasDusun] = useState(100)
  const [opacityIrigasi, setOpacityIrigasi] = useState(100)
  const [opacityLanduse, setOpacityLanduse] = useState(50);
  const [wait, setWait] = useState(false);
  const [open, setOpen] = useState(false);

  var queryNama = useCallback(
    (e) => {
      setNama(e);
    },
    [Nama]
  );

  return (
    <div>
      <NavPeta
        open={open}
        setOpen={(e) => {
          setOpen(e);
        }}
      />
      <Search
        queryNama={queryNama}
        open={open}
        setOpen={(e) => {
          setOpen(e);
        }}
      />
      <SidebarBangunan
        wait={wait}
        queryNama={Nama}
        bangunan={bangunan}
        open={open}
        setOpen={(e) => {
          setOpen(e);
        }}
      />
      <Peta
        queryNama={Nama}
        queryBangunan={(e) => {
          setBangunan(e);
        }}
        setOpen={(e) => {
          setOpen(e);
        }}
        inputBasemap={basemap}
        opacityBasemap={opacityBasemap}
        opacityBangunan={opacityBangunan}
        opacityLanduse={opacityLanduse}
        opacityJalan={opacityJalan}
        opacitySungai={opacitySungai}
        opacityBatasRt={opacityBatasRt}
        opacityBatasDusun={opacityBatasDusun}
        opacityIrigasi={opacityIrigasi}
        wait={wait}
        setWait={setWait}
      />
      <Legenda open={open} />
      <Layer
        open={open}
        setOpacityBasemap={(e) => setOpacityBasemap(e)}
        setOpacityBangunan={(e) => setOpacityBangunan(e)}
        setOpacityLanduse={(e) => setOpacityLanduse(e)}
        setOpacityJalan={(e) => setOpacityJalan(e)}
        setOpacityBatasRt={(e) => setOpacityBatasRt(e)}
        setOpacitySungai={(e) => setOpacitySungai(e)}
        setOpacityBatasDusun={(e) => setOpacityBatasDusun(e)}
        setOpacityIrigasi={(e) => setOpacityIrigasi(e)}
      />
      <Basemap
        open={open}
        setInputBasemap={(e) => setBasemap(e)}
        inputBasemap={basemap}
      />
      <Login
        setOpen={(e) => {
          setOpen(e);
        }}
        open={open}
      />
    </div>
  );
}

export default Home;
