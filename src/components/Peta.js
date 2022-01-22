import { MapContainer, TileLayer, GeoJSON,useMap, useMapEvents } from "react-leaflet";
import React, { useEffect, useState ,useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as WMS from "leaflet.wms";
import configData from "./config.json";
import LogoLoading from "../images/LoadingYellow.svg"

function Peta({setWait, queryNama,queryBangunan,setOpen,inputBasemap,opacityBasemap,opacityBangunan,opacityIrigasi,opacityLanduse,opacityJalan,opacitySungai,opacityBatasRt,opacityBatasDusun }) {
  const [position, setPosition] = useState(false);
  const [changeBasemap, setChangeBasemap] = useState(true);
  const [selectedGeojson, setSelectedGeojson] = useState(false);
  const [first, setFirst] = useState(true)
  const [map, setMap] = useState(false)
  const [loading, setLoading] = useState(false);
  const tileRef = useRef();
 
  useEffect(() => {
    setChangeBasemap(true);
  }, [inputBasemap]);

  useEffect(() => {
    if(queryNama){
      console.log(queryNama)
      var koordinat = queryNama.center.coordinates;
      setPosition([koordinat[1], koordinat[0]]);
      setSelectedGeojson(queryNama.feature)
    }
  }, [queryNama]);

  var panggil = (cb, url) => {
    fetch(url,{
        method: 'GET',
        credentials: 'include'
      })
      .then((respond) => respond.json())
      .then((json) => cb(json))
      .catch((err)=>{
        console.log(err,"err")
        setLoading(false)
        setWait(false)
      });
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
        const { url, options, layers } = props;
        const source = WMS.source(url, options);
        var layer= source.getLayer(layers)
        layer.addTo(map);
        setFirst(false);
      }
    return null;
  }

  var GetFeatureInfoUrlHandle = () =>{
    setPosition(false)
    var map = useMap();
    map = useMapEvents({
      click(e) {
        setWait(true)
        setLoading(true)
        var url = getFeatureInfoUrl(
          configData.SERVER_GEOSERVER+"geoserver/data/wms?",map,e
        );
          
        panggil((result) => {
          var numb = result.features[0].id.match(/\d/g);
          numb = numb.join("");
            var url =  configData.SERVER_URL+"bangunanAdmin/"+numb
            panggil((result)=>{
              if(result==="unauthorized"){
                var url =  configData.SERVER_URL+"bangunanUmum/"+numb
                panggil((result)=>{
                  setWait(false)
                  setLoading(false)
                  if(result.penggunaan === null) result.penggunaan = "Tidak Diketahui"
                  queryBangunan(result)
                  setSelectedGeojson(result.feature)
                  setOpen("Bangunan")
                },url
                )
              }else{
                console.log(result,"2")
                setWait(false)
                setLoading(false)
                result.id_bangunan = numb
                if(result.nama === null) result.nama = "Tidak Diketahui"
                if(result.penggunaan === null) result.penggunaan = "Tidak Diketahui"
                queryBangunan(result)
                setSelectedGeojson(result.feature)
                setOpen("Bangunan")
              }
            },url)

            var latLng = e.latlng
            map.setView(latLng);

        }, url);
      },
    });
    return null
  }

  var SelectedLayerHandler = () =>{
    return <GeoJSON data={selectedGeojson} style={{color:"yellow"}} />
  }

  const TileLayerHandler = () => {
    setChangeBasemap(false);
    return <TileLayer ref={tileRef} url={inputBasemap} maxZoom={22} />;
  };

  useEffect(() => {
    if(map){
      console.log(map)
      map.target.eachLayer(function(layer) {
        if(layer._name==="data:jalan"){
          layer.setOpacity(opacityJalan*0.01)
        }else if(layer._name==="data:batasrt"){
          layer.setOpacity(opacityBatasRt*0.01)
        }else if(layer._name==="data:landuse"){
          layer.setOpacity(opacityLanduse*0.01)
        }else if(layer._name==="data:bangunan"){
          layer.setOpacity(opacityBangunan*0.01)
        }else if(layer._name==="data:sungai"){
          layer.setOpacity(opacitySungai*0.01)
        }else if(layer._name==="data:batasdusun"){
          layer.setOpacity(opacityBatasDusun*0.01)
        }else if(layer._name==="data:irigasi"){
          layer.setOpacity(opacityIrigasi*0.01)
        }else if(layer._name==="data:bismillah"){
          layer.setOpacity(opacityBasemap*0.01)
        }
      });
    }
  }, [opacityJalan,opacityBatasRt,opacityBasemap,opacityLanduse,opacityIrigasi,opacityBangunan,opacitySungai,opacityBatasDusun])

  useEffect(() => {
    if(map){
      tileRef.current
      .getContainer()
      .style.setProperty("filter", `opacity(${opacityBasemap}%)`);
    }
  }, [opacityBasemap])

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{zIndex:"999",position:"absolute",margin:"auto"}}>
        <img src={LogoLoading} alt="2" style={ loading ? {width:"100px",height:"100px"}:{width:"0px",height:"0px"}}></img>
      </div>
      <MapContainer
      center={[-7.864220975, 110.138661812]}
      zoom={17}
      maxZoom={22}
      style={{ width: "100vw", height: "100vh" }}
      zoomControl={false}
      whenReady={(e)=>setMap(e)}
    >
      
      {position && <Changedview center={position}/> }
      {selectedGeojson && <SelectedLayerHandler/> }
      {changeBasemap ? <TileLayerHandler /> : <TileLayer ref={tileRef} url={inputBasemap} maxZoom={22} />}

      <CustomWMSLayer
        url={configData.SERVER_GEOSERVER+"geoserver/data/wms"}
        layers={"data:landuse"}
        options={{
          format: "image/png",
          transparent: "true",
          tiled: "true",
          info_format: "application/json",
          identify: false,
          maxZoom: 22,
          opacity:0.4
        }}
      />
      <CustomWMSLayer
        url={configData.SERVER_GEOSERVER+"geoserver/data/wms"}
        layers={"data:bangunan"}
        options={{
          format: "image/png",
          transparent: "true",
          tiled: "true",
          info_format: "application/json",
          identify: false,
          maxZoom: 22,
        }}
      />
      <CustomWMSLayer
        url={configData.SERVER_GEOSERVER+"geoserver/data/wms"}
        layers={"data:batasrt"}
        options={{
          format: "image/png",
          transparent: "true",
          tiled: "true",
          info_format: "application/json",
          identify: false,
          maxZoom: 22,
        }}
      />
      <CustomWMSLayer
        url={configData.SERVER_GEOSERVER+"geoserver/data/wms"}
        layers={"data:batasdusun"}
        options={{
          format: "image/png",
          transparent: "true",
          tiled: "true",
          info_format: "application/json",
          identify: false,
          maxZoom: 22,
        }}
      />
      <CustomWMSLayer
        url={configData.SERVER_GEOSERVER+"geoserver/data/wms"}
        layers={"data:sungai"}
        options={{
          format: "image/png",
          transparent: "true",
          tiled: "true",
          info_format: "application/json",
          identify: false,
          maxZoom: 22,
        }}
      />
      <CustomWMSLayer
        url={configData.SERVER_GEOSERVER+"geoserver/data/wms"}
        layers={"data:irigasi"}
        options={{
          format: "image/png",
          transparent: "true",
          tiled: "true",
          info_format: "application/json",
          identify: false,
          maxZoom: 22,
        }}
      />
      <CustomWMSLayer
        url={configData.SERVER_GEOSERVER+"geoserver/data/wms"}
        layers={"data:jalan"}
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
    </div>
 
  );
}

export default Peta;
