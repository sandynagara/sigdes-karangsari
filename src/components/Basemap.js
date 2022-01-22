import React from "react";
import './Basemap.css'
import OpenStreetMap from '../images/Basemap/OpenStreetMap.jpg'
import EsriWorldImagery from '../images/Basemap/EsriWorldImagenery.jpg'
import EsriToPo from '../images/Basemap/EsriToPo.jpg'
import OpenToPo from '../images/Basemap/OpenToPo.jpg'
import StadiaDark from '../images/Basemap/StadiaDark.jpg'
import GoogleMaps from '../images/Basemap/GoogleMaps.jpg'
import GoogleStreet from '../images/Basemap/GoogleStreet.jpg'

const jenisBasemap = [
  {
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    nama: "Google Satelite",
    gambar: GoogleMaps,
  },
  {
    url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    nama: "Google Streets",
    gambar: GoogleStreet,
  },
  {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    nama: "OpenStreetMap",
    gambar: OpenStreetMap,
  },
  {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    nama: "OpenTopoMap",
    gambar: OpenToPo,
  },
  {
    url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
    nama: "Stadia.AlidadeSmoothDark",
    gambar: StadiaDark,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    nama: "Esri.WorldImagery",
    gambar: EsriWorldImagery,
  },
  {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    nama: "Esri.WorldTopoMap",
    gambar: EsriToPo,
  },
];

function ItemBasemap({item,setInputBasemap,inputBasemap}){

  return(
    <div className="item-basemap" onClick={()=>setInputBasemap(item.url)}>
      <div className="judul">
        <div className="radio" style={inputBasemap===item.url ? {backgroundColor:"#000000"} : {}}></div>
        <p>{item.nama}</p>
      </div>
      <img src={item.gambar} alt=""/>
      
    </div>
  )
}

function Basemap({setInputBasemap ,inputBasemap ,open}) {
  return <div className="basemap-container" style={ open === "Basemap" ? {marginLeft:"55px"} :  {marginLeft:"-200px"}}>
    {jenisBasemap.map((e)=>{
      return <ItemBasemap key={e.url} item = {e} setInputBasemap={setInputBasemap} inputBasemap={inputBasemap}/>
    })}
  </div>;
}

export default Basemap;
