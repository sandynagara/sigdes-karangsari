import React, { useEffect, useState,useRef } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import Fade from "react-reveal/Fade";
import "./PetaStatistik.css";
import PetaStatistikFasum from "./PetaStatistikFasum";
import InputDusunRt from "./InputDusunRt";
import {AiOutlineBorderInner,AiOutlineBorderHorizontal} from 'react-icons/ai'
import logoKesehatan from "../icon/kesehatan.png";
import logoPemakaman from "../icon/pemakaman.png";
import logoPemerintahan from "../icon/pemerintahan.png";
import logoBangunan from "../icon/bangunan.png";
import logoPerairan from "../icon/perairan.png";
import logoPeribadatan from "../icon/peribadatan.png";
import logoPendidikan from "../icon/pendidikan.png";
import logoPeople from "../icon/people.png";
import logoPria from "../icon/pria.png";
import logoWanita from "../icon/wanita.png";
import logoTempatUmum from "../icon/tempatumum.png";
import Skeleton ,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import configData from "./config.json";

function ItemStatistikPeta({ wait ,data,open, jenis, delay,setActive ,setKategori }) {
  
  const statistik = useRef()

  var logoStatistik = (keterangan) => {
    var logo;
    switch (keterangan) {
      case "People":
        logo = logoPeople;
        break;
      case "Laki Laki":
        logo = logoPria;
        break;
      case "Perempuan":
        logo = logoWanita;
        break;
      case "Pendidikan":
        logo = logoPendidikan;
        break;
      case "Peribadatan":
        logo = logoPeribadatan;
        break;
      case "Perairan":
        logo = logoPerairan;
        break;
      case "Pemakaman":
        logo = logoPemakaman;
        break;
      case "Kesehatan":
        logo = logoKesehatan;
        break;
      case "Bangunan":
        logo = logoBangunan;
        break;
      case "Pemerintahan":
        logo = logoPemerintahan;
        break;
      case "Tempat Umum":
        logo = logoTempatUmum;
        break;
      default:
        logo = logoBangunan;
    }
    return logo;
  };
  
  var logo = logoStatistik(jenis);

  return (
    <Fade right delay={delay}>
      <div style={{marginTop:"10px"}}>
        {wait ? <SkeletonTheme baseColor="#ffffff" highlightColor="#c9c9c9" borderRadius="20px">
            <p style={{width:"110px"}}>
              <Skeleton height={140} />
          </p>
        </SkeletonTheme>
        :
        <div>
            {open ? 
          <div >
            <div ref={statistik} className="data-logo"  style={{cursor:"pointer"}} onClick={()=>{setActive(true); setKategori(jenis)}}>
              {jenis === "Rt" ? <AiOutlineBorderHorizontal style={{color:"black" ,width:"30px" ,height:"30px"}}/> : jenis === "Dusun" ? <AiOutlineBorderInner style={{color:"black" ,width:"30px" ,height:"30px"}}/> : <img src={logo} />}
              {data && (<h6  style={{ fontSize: "30px", marginTop: "10px" }}> {data}</h6>)}
              <p >{jenis}</p>
            </div>
          </div> 
          : 
          <div className="data-logo" style={{marginTop:"10px"}} >
              {jenis === "Rt" ? <AiOutlineBorderHorizontal style={{color:"black" ,width:"30px" ,height:"30px"}}/> : jenis === "Dusun" ? <AiOutlineBorderInner style={{color:"black" ,width:"30px" ,height:"30px"}}/> : <img src={logo} />}
              {data && (<h6 style={{ fontSize: "30px", marginTop: "10px" }}> {data}</h6>)}
              <p>{jenis}</p>
          </div>}
        </div>
        }
      </div>
      
    </Fade>
  );
}

function ListStatistikPeta({wait, dataStatitik,setActive,active,tipeFilter }) {
  const data = dataStatitik.data
  const [kategori, setKategori] = useState(false)

  return (
    <div className="data-statistik-peta">
      <h5 className="judul-fasum" style={{ textAlign: "left", color: "white"}}>
        <b>Fasilitas Umum</b>
      </h5>
      <div className="list-item-statistik">
        {data.fasum != null ? (
          data.fasum.map((e, index) => {
            var stat = e.jsonb_build_object;
            switch (stat.kategori) {
              case "Peribadatan":
                return  <ItemStatistikPeta wait={wait} data={stat.jumlah} delay={index * 200} jenis={stat.kategori} setActive = {setActive} setKategori = {setKategori} open={true}/>
              case "Kesehatan":
                return  <ItemStatistikPeta wait={wait} data={stat.jumlah} delay={index * 200} jenis={stat.kategori} setActive = {setActive} setKategori = {setKategori} open={true}/>
              case "Pendidikan":
                return  <ItemStatistikPeta wait={wait} data={stat.jumlah} delay={index * 200} jenis={stat.kategori} setActive = {setActive} setKategori = {setKategori} open={true}/>
              case "Pemakaman":
                return  <ItemStatistikPeta wait={wait} data={stat.jumlah} delay={index * 200} jenis={stat.kategori} setActive = {setActive} setKategori = {setKategori} open={true}/>
              default:
                break;
            }
          })
        ) : (
          <ItemStatistikPeta open={false} wait={wait} data="0" jenis="Fasilitas Umum" />
        )}
      </div>
      {tipeFilter !== "rt" && <div>
        <h5 style={{ textAlign: "left",color:"white", marginTop: "20px" }}>
          <b>Administrasi</b>
        </h5>
        <div className="list-item-statistik">
            {tipeFilter === "desa" && <ItemStatistikPeta wait={wait} data={data.rw} jenis="Dusun" /> }
            <ItemStatistikPeta wait={wait}  data={data.rt} jenis="Rt" />
        </div>
      </div>}
      
      {active && <PetaStatistikFasum setActive={setActive} daerah={dataStatitik.daerah} kategori={kategori} tipeFilter={tipeFilter}/>}
    </div>
  );
}

function TipeStatistik({ tipe, tipeFillter }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="tipeStatistik" style={tipeFillter === "desa"? { borderColor: "yellow", color: "yellow" }: {} } onClick={() => tipe("desa")}>
        Desa
      </div>
      <div className="tipeStatistik" style={ tipeFillter === "dusun"? { borderColor: "yellow", color: "yellow" }: {}} onClick={() => tipe("dusun")}>
        Dusun
      </div>
      <div className="tipeStatistik" style={tipeFillter === "rt" ? { borderColor: "yellow", color: "yellow" } : {}} onClick={() => tipe("rt")}>
        RT
      </div>
    </div>
  );
}

function PetaStatistik() {
  const [dataGeojson, setDataGeojson] = useState(false);
  const [dataStatitik, setDataStatitik] = useState();
  const [tipeFilter, setTipeFilter] = useState("desa");
  const [scrollPosition, setScrollPosition] = useState(true);
  const [active, setActive] = useState(false);
  const [dataInput, setDataInput] = useState(false)
  const [wait, setWait] = useState(false)

  const handleScroll = () => {
      const position = document.documentElement.clientWidth;
      if(position<790){
        setScrollPosition(false);
      }else{
        setScrollPosition(true);
      }
  };

  
  window.addEventListener('resize', handleScroll, { passive: true });

  useEffect(() => {
    const position = document.documentElement.clientWidth;
    if(position<790){
      setScrollPosition(false);
    }else{
      setScrollPosition(true);
    }
  }, [])

  useEffect(() => {
    var urlDesa = configData.SERVER_URL+ tipeFilter;
    Panggil((result) => {
      setDataGeojson(result);
    }, urlDesa);

    if (tipeFilter === "desa") {
      var urlData = configData.SERVER_URL+"desa/data";
      Panggil((result) => {
        var json = {
          data: result[0],
        };
        setDataStatitik(json);
      }, urlData);
    }
  }, [tipeFilter]);

  useEffect(() => {
    if(dataInput){
      setWait(true)
      var url =configData.SERVER_URL +tipeFilter +"/"+dataInput;
          Panggil((result) => {
            setWait(false)
            var json = {
              daerah: dataInput,
              data: result[0],
            };
            setDataStatitik(json);
          }, url);
    }
  }, [dataInput])

 

  var Panggil = (cb, url) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => cb(json))
      .catch(err=>console.log(err))
  };

  var eventHandle = (feature, layer) => {
      function labelPosition(){
        if (tipeFilter === "dusun") {
          layer.bindTooltip(feature.properties.nama, {
            permanent: true,
            className: "label-dusun",
          });
        } else if (tipeFilter === "rt"){
          layer.bindTooltip(feature.properties.nama, {
            direction: 'left',
            permanent: true,
            className: "label-rt",
            sticky: true,
            opacity: 0.75,
          });
          layer.bindTooltip(feature.properties.nama, {
            direction: 'right',
            permanent: true,
            className: "label-rt",
          });
        }
      }
      labelPosition()
      layer.on({
        mouseover: () => (
          layer.setStyle({ 
            weight: 5,
            color: "blue",
            fillOpacity: 0.5,
          }),
          layer.bringToFront()
        ),
        mouseout: () => layer.setStyle(style),
        click: () => {
          var url =configData.SERVER_URL +tipeFilter +"/"+feature.properties.nama;
          setWait(true)
          Panggil((result) => {
            setWait(false)
            var json = {
              daerah: feature.properties.nama,
              data: result[0],
              feature: feature,
            };
            setDataStatitik(json);
          }, url);
        },
      });
  };

  const style = {
    weight: 2,
    color: "white",
    fillOpacity: 0,
  };

  var SelectedLayer = () => {
    return (
      <GeoJSON data={dataStatitik.feature} style={{ color: "yellow" }} bringToFront={true}/>
    );
  };

  var tipe = (e) => {
    setTipeFilter(e);
  };

  var GeojsonHandler = () => {
    var geojson;
    if (tipeFilter === "desa") {
      geojson = <GeoJSON data={dataGeojson} style={style} />;
    } else {
      geojson = (
        <GeoJSON data={dataGeojson} onEachFeature={eventHandle} style={style} />
      );
    }
    return geojson;
  };

  return (
    <div id="Statistik">
      <div className="container-peta">
        <p style={{ color: "white", fontSize: "20px" }}>_____</p>
        <h5 className="judul">
          Statistik Desa Karangsari
        </h5>
        <TipeStatistik tipe={tipe} tipeFillter={tipeFilter} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {scrollPosition &&  <MapContainer
            center={[-7.83920975, 110.138661812]}
            zoom={14}
            maxZoom={14}
            minZoom={14}
            dragging={false}
            zoomControl={false}
            touchZoom={false}
            className="peta-statistik"
          >
            {dataGeojson && <GeojsonHandler />}
            {dataStatitik && tipeFilter === "dusun" || tipeFilter === "rt" ? <SelectedLayer /> : ""}
          </MapContainer>}
         
          <div className="data-peta-statistik">
            {!scrollPosition && tipeFilter !== "desa" && <InputDusunRt setWait={setWait} tipeFilter={tipeFilter} setDataInput={(e)=>setDataInput(e)}/>}
            {dataStatitik && <ListStatistikPeta wait={wait} tipeFilter = {tipeFilter} dataStatitik={dataStatitik} setActive = {setActive} active={active}/>}
          </div>
        </div>
      </div>

    </div>
  );
}

export default PetaStatistik;

