 import React,{useState,useEffect} from 'react'
 import { MapContainer, useMap, GeoJSON,FeatureGroup,Polygon, Circle } from "react-leaflet";
 import './EditData.css'
 import "leaflet/dist/leaflet.css";
 import "leaflet-draw/dist/leaflet.draw.css";
 import * as WMS from "leaflet.wms";
 import { EditControl } from "react-leaflet-draw";
import { circle } from 'leaflet';

 
 function EditData({setActiveEdit,data}) {

    const [first, setFirst] = useState(true);
    const [dataFeature,setDataFeature] = useState(false)
    const [position, setPosition] = useState([-7.864220975, 110.138661812]);

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
    

      useEffect(() => {
          var koordinat = []
            data.feature.geometry.coordinates[0][0].map((e)=>{
                koordinat.push(e.reverse())
            })
          setDataFeature(koordinat)
          setPosition([data.center.coordinates[1],data.center.coordinates[0]])
      }, [data])

      var GeojsonHandler = () => {
        return (
          <GeoJSON
            data={data.feature}
            style={{ color: "yellow", fillOpacity: 0, weight: 1 }}
          />
        );
      };

      var onEditPath = () =>{

      }

      var onCreate = () =>{

      }

      var onDeleted = () =>{

      }

     return (
         <div className='edit-Data-backgroud'>
            <div className='edit-Data-container'>
                <form>
                    <p>Pemilik</p>
                    <input/>
                </form>
                <div className='peta'>
                    <MapContainer
                        center={position}
                        zoom={21}
                        style={{ width: "100%", height: "240px" }}
                        zoomControl={false}
                    >
                        {/* {data && <GeojsonHandler />} */}
                        <Changedview center={position} />
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
                        <FeatureGroup>
                            <EditControl
                            position='topright'
                            onEdited={onEditPath}
                            onCreated={onCreate}
                            onDeleted={onDeleted}
                            draw={{
                                rectangle: false,
                                polyline:false,
                                circle:false,
                                circlemarker: false,
                                marker:false
                            }}/>
                            <Polygon pathOptions={{ fillColor: 'red' }} positions={dataFeature} />
                        </FeatureGroup>
                    </MapContainer>
                </div>
            </div>
            <div className='black-layer-fasum' onClick={()=>setActiveEdit(false)}/>
         </div>
     )
 }
 
 export default EditData
 