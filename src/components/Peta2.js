import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import './Peta2.css'
import L from "leaflet";
import * as WMS from "leaflet.wms";

function Peta2() {

  var panggil = (cb,url) => {
    fetch(url)
    .then(respond => respond.json())
    .then(json=>cb(json))
  }

  var getFeatureInfoUrl = (url,map,e) => {
    // Construct a GetFeatureInfo request URL given a point
    var size = map.getSize(),
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: "",
          transparent: true,
          version: "1.1.1",      
          format: "application/json",
          bbox: map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: "karangsari",
          query_layers: "karangsari",
          info_format: 'application/json',
          X:Math.round(e.containerPoint.x),
          Y:Math.round(e.containerPoint.y)
        };
    
    return url + L.Util.getParamString(params, url, true);
  }

  function CustomWMSLayer(props) {
    const { url, options, layers } = props;
    var map = useMap();
    // Add WMS source/layers
    const source = WMS.source(url, options);

    var layerGroupDesa = source.getLayer(layers);
    layerGroupDesa.addTo(map)
    
    map = useMapEvents({
      click(e){
        var url = getFeatureInfoUrl("http://localhost:8080/geoserver/data/wms?",map,e)
        panggil((result)=>{
          console.log(result)
        },url)
      }
    })

    return null;
  }

  return (
    <MapContainer
      center={[-7.864220975, 110.138661812]}
      zoom={17}
      maxZoom={30}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        maxZoom={25}
        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      />
      <CustomWMSLayer
        url="http://localhost:8080/geoserver/data/wms"
        layers={"karangsari"}
        options={{
          format: "image/png",
          transparent: "true",
          tiled: "true",
        }}
      />
    </MapContainer>
  );
}

export default Peta2;
