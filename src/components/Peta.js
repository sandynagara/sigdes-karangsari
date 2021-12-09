import { MapContainer, TileLayer, GeoJSON,useMap, useMapEvents } from "react-leaflet";
import React, { useEffect, useState ,memo } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as WMS from "leaflet.wms";

function Peta({ queryNama,queryBangunan,setOpen }) {
  const [position, setPosition] = useState(false);
  const [selectedGeojson, setSelectedGeojson] = useState(false);
  const [first, setFirst] = useState(true)

  var panggil = (cb, url) => {
    fetch(url)
      .then((respond) => respond.json())
      .then((json) => cb(json));
  };

  var Changedview = center => {
    const map = useMap();
    map.setView(center.center);
    return null;
  }

  var getFeatureInfoUrl = (url, map, e) => {
    // Construct a GetFeatureInfo request URL given a point
    var size = map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: "",
        transparent: true,
        version: "1.1.1",
        format: "application/json",
        bbox: map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: "karangsari",
        query_layers: "karangsari",
        info_format: "application/json",
        X: Math.round(e.containerPoint.x),
        Y: Math.round(e.containerPoint.y),
      };

    return url + L.Util.getParamString(params, url, true);
  };

  var CustomWMSLayer =  (props) => {
    var map = useMap();
 
    if(first){
      console.log("hitung")
      const { url, options, layers } = props;

      // Add WMS source/layers
      const source = WMS.source(url, options);

      // var Basemap = source.getLayer(layers[2]),
      var batasDusun = source.getLayer(layers[1]),
        layerBangunan = source.getLayer(layers[0]),
        layerLanduse = source.getLayer(layers[2])

      // Basemap.addTo(map);
      layerLanduse.addTo(map)
      batasDusun.addTo(map);
      layerBangunan.addTo(map);
      setFirst(false)
    }
      

    return null;
  }

  var GetFeatureInfoUrlHandle = () =>{
    setPosition(false)
    var map = useMap();
    map = useMapEvents({
      click(e) {
        console.log(e.latlng, map);
        var url = getFeatureInfoUrl(
          "http://localhost:8080/geoserver/data/wms?",
          map,
          e
        );
        panggil((result) => {
          console.log(result);
          if (result.crs != null) {
            var numb = result.features[0].id.match(/\d/g);
            numb = numb.join("");
            var url =  "http://localhost:5000/api/bangunan/"+numb
            panggil((result)=>{
              console.log(result.feature)
              queryBangunan(result)
              setSelectedGeojson(result.feature)
              setOpen("Bangunan")
            },url)

            var latLng = e.latlng
            map.setView(latLng);
          }
        }, url);
      },
    });
    return null
  }

  useEffect(() => {
    if(queryNama){
      console.log(queryNama)
      var koordinat = queryNama.center.coordinates;
      setPosition([koordinat[1], koordinat[0]]);
      setSelectedGeojson(queryNama.feature)
    }

  }, [queryNama]);

  var SelectedLayerHandler = () =>{
    return <GeoJSON data={selectedGeojson} style={{color:"yellow"}} />
  }

  return (
    <MapContainer
      center={[-7.864220975, 110.138661812]}
      zoom={17}
      maxZoom={22}
      style={{ width: "100vw", height: "100vh" }}
      zoomControl={false}
    >
      {position ? <Changedview center={position}/> : ""}
      {selectedGeojson ? <SelectedLayerHandler/> :""}
      <TileLayer
        maxZoom={22}
        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      />
      <CustomWMSLayer
        url="http://localhost:8080/geoserver/data/wms"
        layers={["data:bangunan", "data:batasdusun","data:landuse"]}
        options={{
          format: "image/png",
          transparent: "true",
          tiled: "true",
          info_format: "application/json",
          identify: false,
          maxZoom: 22,
        }}
      />
      <GetFeatureInfoUrlHandle/>
    </MapContainer>
  );
}

export default Peta;
