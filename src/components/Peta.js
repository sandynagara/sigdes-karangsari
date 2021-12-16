import { MapContainer, TileLayer, GeoJSON,useMap, useMapEvents } from "react-leaflet";
import React, { useEffect, useState ,useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as WMS from "leaflet.wms";

function Peta({ queryNama,queryBangunan,setOpen,inputBasemap,opacityBasemap,opacityBangunan,opacityLanduse }) {
  const [position, setPosition] = useState(false);
  const [changeBasemap, setChangeBasemap] = useState(true);
  const [selectedGeojson, setSelectedGeojson] = useState(false);
  const [first, setFirst] = useState(true)
  const [map, setMap] = useState(false)

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
      .catch((err)=>console.log(err,"err"));
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

        // Add WMS source/layers
        const source = WMS.source(url, options);

        var layer= source.getLayer(layers)

        layer.addTo(map);

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
          "http://localhost:8080/geoserver/data/wms?",map,e
        );
          
        panggil((result) => {
          console.log(result,"url")
          var numb = result.features[0].id.match(/\d/g);
          numb = numb.join("");
          console.log(numb,"numb")
            var url =  "http://localhost:5000/api/bangunanAdmin/"+numb
            panggil((result)=>{
              console.log(result)
              if(result==="unauthorized"){
                var url =  "http://localhost:5000/api/bangunanUmum/"+numb
                panggil((result)=>{
                  queryBangunan(result)
                  setSelectedGeojson(result.feature)
                  setOpen("Bangunan")
                },url
                )
              }else{
                
                if(result.nama === null){
                  result.nama = "Tidak Diketahui"
                }
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
        if(layer._name==="data:bangunan"){
          layer.setOpacity(opacityBangunan*0.01)
        }
      });
    }
  }, [opacityBangunan])

  useEffect(() => {
    if(map){
      console.log(map)
      map.target.eachLayer(function(layer) {
        if(layer._name==="data:landuse"){
          layer.setOpacity(opacityLanduse*0.01)
        }
      });
    }
  }, [opacityLanduse])

  useEffect(() => {
    if(map){
      tileRef.current
      .getContainer()
      .style.setProperty("filter", `opacity(${opacityBasemap}%)`);
    }
  }, [opacityBasemap])

  return (
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
        url="http://localhost:8080/geoserver/data/wms"
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
        url="http://localhost:8080/geoserver/data/wms"
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
        url="http://localhost:8080/geoserver/data/wms"
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
      
      
      <GetFeatureInfoUrlHandle/>
    </MapContainer>
  );
}

export default Peta;
