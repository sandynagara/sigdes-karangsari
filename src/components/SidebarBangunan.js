import React, { useEffect, useState } from "react";
import { MapContainer, useMap, GeoJSON } from "react-leaflet";
import "./SidebarBangunan.css";
import * as WMS from "leaflet.wms";
import "leaflet/dist/leaflet.css";
import EditData from "./Prototype/EditData";

function Sidebar({ queryNama, bangunan, open,setOpen }) {
  const [position, setPosition] = useState([-7.864220975, 110.138661812]);
  const [first, setFirst] = useState(true);
  const [data, setData] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false)

  function CustomWMSLayer(props) {
    const { url, options, layers } = props;
    var map = useMap();
    // Add WMS source/layers
    if (first) {
      const source = WMS.source(url, options);
      var Basemap = source.getLayer(layers);
      Basemap.addTo(map);
      setFirst(false);
    }

    return null;
  }

  function Changedview({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
  }

  var GeojsonHandler = () => {
    return (
      <GeoJSON
        data={data.feature}
        style={{ color: "yellow", fillOpacity: 0, weight: 1 }}
      />
    );
  };

  useEffect(() => {
    if (bangunan) {
      var koordinat = bangunan.center.coordinates;
      console.log(bangunan, "koordinat");
      setPosition([koordinat[1], koordinat[0]]);
      setData(bangunan);
    }
  }, [bangunan]);

  useEffect(() => {
    console.log("check");
    console.log(queryNama);
    if (queryNama) {
      setData(queryNama);
      var koordinat = queryNama.center.coordinates;
      setPosition([koordinat[1], koordinat[0]]);
    }
  }, [queryNama]);

  return (
    <div
      className="Sidebar-containter"
      style={
        open === "Bangunan" ? { marginLeft: "55px" } : { marginLeft: "-350px" }
      }
    >
      {queryNama || bangunan ? <div>
        <div className="Sidebar-gambar">
          <MapContainer
            center={position}
            zoom={20}
            maxZoom={21}
            minZoom={19}
            dragging={false}
            style={{ width: "100%", height: "240px" }}
            zoomControl={false}
          >
            <Changedview center={position} />
            {bangunan || queryNama ? <GeojsonHandler /> : ""}
            <CustomWMSLayer
              url="http://localhost:8080/geoserver/data/wms?"
              layers={"data:bismillah"}
              options={{
                format: "image/png",
                transparent: "true",
                tiled: "true",
                info_format: "application/json",
                identify: false,
                maxZoom: 22,
              }}
            />
          </MapContainer>
        </div>
        <div className="sidebar-info">
          <h5>Info Bangunan</h5>
          {data.nama && <div className="sidebar-pemilik">
            <div className="sidebar-dropdown">Pemilik</div>
            <div style={{ margin: "10px" }}>Nama : {data.nama}</div>
          </div>}
          
          <div className="sidebar-bangunan">
            <div className="sidebar-dropdown">Bangunan</div>
            <div style={{ margin: "10px" }}>Penggunaan : {data.penggunaan}</div>
            <div style={{ margin: "10px" }}>Luas :  {Math.round(data.luas)} m^2</div>
            <div style={{ margin: "10px" }}>Rt : {data.rt}</div>
            <div style={{ margin: "10px" }}>Dusun : {data.nama_dusun}</div>
          </div>
        
          
          <div className="sidebar-posisi"></div>
          <div className="edit-bangunan" onClick={()=>{setActiveEdit(true);setOpen(false)}}>
              Edit Bangunan
          </div>

          {activeEdit && <EditData setActiveEdit={setActiveEdit} data={data}/>}
        </div> 
       
      </div> : 
      <div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>No one feature selected</div> }
    </div>
  );
}

export default Sidebar;
