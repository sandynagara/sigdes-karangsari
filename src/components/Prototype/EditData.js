 import React,{useState,useEffect ,useRef} from 'react'
 import { MapContainer, useMap, GeoJSON,FeatureGroup,Polygon, Circle } from "react-leaflet";
 import './EditData.css'
 import "leaflet/dist/leaflet.css";
 import "leaflet-draw/dist/leaflet.draw.css";
 import * as WMS from "leaflet.wms";
 import { EditControl } from "react-leaflet-draw";


 function InputEdit({label,data}){

  const input = useRef()

  useEffect(() => {
    console.log(data)
    input.current.value = data
  }, [data])

   return(
    <div className='input'>
      <p>{label}</p>
      <input name={label} ref={input}/>
    </div>
   )
 }

 function EditData({setActiveEdit,data}) {

    const [mapLayer, setMapLayer] = useState()
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
          var geojson = {
            type:"MultiPolygon",
            coordinates:[[koordinat]]
          }
          setMapLayer(data.feature.geometry)
          var koordinat = []

          data.feature.geometry.coordinates[0][0].map((e)=>{
                koordinat.push([e[1],e[0]])
          })
          setDataFeature(koordinat)    
          setPosition([data.center.coordinates[1],data.center.coordinates[0]])
      }, [data])

      var onEditPath = (e) =>{
        Object.keys(e.layers._layers).forEach(function(k){
          var koordinat =[]
          e.layers._layers[k]._latlngs[0].map(e=>{
            var posisi = [e.lng,e.lat]
            koordinat.push(posisi)
          })
          var geojson = {
            type:"MultiPolygon",
            coordinates:[[koordinat]]
          }
          console.log(geojson)
          setMapLayer(geojson);
        })
      }

     useEffect(() => {
       
     }, [mapLayer])

      var onCreate = () =>{

      }

      var onDeleted = () =>{

      }

      var submitHandle =(e)=>{
        e.preventDefault()
        console.log(mapLayer)
        const pemilik = e.target.pemilik.value
        const penggunaan = e.target.penggunaan.value
        const url = "http://localhost:5000/api/permohonan"
        console.log(mapLayer)
        fetch(url,{method:"POST", headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },body: JSON.stringify({
          pemilik: pemilik,
          geom: mapLayer,
          penggunaan : penggunaan,
          id_bangunan:data.id_bangunan
        }),
        credentials: 'include'
      }).then(response=> response.json())
      .then(json=>{console.log(json)})
      .catch(err => console.log(err))
      }

     return (
         <div className='edit-Data-backgroud'>
            <div className='edit-Data-container'>
              <div style={{fontWeight:"bold",textAlign:"center"}}>
                Edit Data
              </div>

                <form  onSubmit={submitHandle}>
                    <InputEdit label="pemilik" data={data.nama}/>
                    <InputEdit label="penggunaan" data={data.penggunaan}/>
                    <div className='peta'>
                    <MapContainer
                        center={position}
                        zoom={21}
                        style={{ width: "100%", height: "300px" }}
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
                                marker:false,
                                polygon:false,
                            }}/>
                            <Polygon pathOptions={{ fillColor: 'red' }} positions={dataFeature} />
                        </FeatureGroup>
                    </MapContainer>
                    
                  </div>
                  <div className='button-position'>
                        <button id="cancel" onClick={()=>setActiveEdit(false)}>
                          Batal
                        </button>
                        <button id="submit">
                          Ajukan
                        </button>
                  </div>
                </form>
                
            </div>
            <div className='black-layer-fasum' onClick={()=>setActiveEdit(false)}/>
         </div>
     )
 }
 
 export default EditData
 