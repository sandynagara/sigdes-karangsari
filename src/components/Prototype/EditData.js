 import React,{useState,useEffect ,useRef} from 'react'
 import { MapContainer, useMap,FeatureGroup,Polygon,} from "react-leaflet";
 import './EditData.css'
 import "leaflet/dist/leaflet.css";
 import "leaflet-draw/dist/leaflet.draw.css";
 import * as WMS from "leaflet.wms";
 import { EditControl } from "react-leaflet-draw";
 import LogoLoading from "../../images/Loading.svg"


 function InputEdit({label,data}){

  const input = useRef()
  const [list, setList] = useState(false)

  var Panggil = (hasil,url) => {
    fetch(url,{
      method:"GET",
      credentials:'include'
    }).
    then(res=>res.json()).
    then(res=>hasil(res)).
    catch(err=>setList(false))
  }

  useEffect(() => {
    input.current.value = data
  }, [data])

  var ClickHandler = (e) => {
    input.current.value = e;
    setList(false)
  }

  var onChangeHandler = (e) => {
    var input = e.target.value
    console.log(input)
    const url = `http://localhost:5000/api/caripenduduk/${input}`
    Panggil(hasil=>{
      setList(hasil)
    },url)
  }

   return(
   <div style={{position:"relative"}}>
    {label === "Pemilik" ? 
      <div className='input'>
      <p style={{marginLeft:"5px"}}>{label}</p>
      <input name={label} ref={input} onChange={onChangeHandler}/>
      </div> : 
      <div className='input'>
      <p style={{marginLeft:"5px"}}>{label}</p>
      <input name={label} ref={input}/>
      </div>
    }
    {list && <div className='list-penduduk'>
      {list.map(e=>{
        return <div className='pilihan' onClick={()=>ClickHandler(e.nama)}>{e.nama}</div>
      })}
    </div> }
   </div>
    
   )
 }

 function EditData({setActiveEdit,data}) {

    const [mapLayer, setMapLayer] = useState()
    const [first, setFirst] = useState(true);
    const [dataFeature,setDataFeature] = useState(false)
    const [position, setPosition] = useState([-7.864220975, 110.138661812]);
    const [loading, setLoading] = useState(false)

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
          setMapLayer(data.feature.geometry);
          var koordinat = [];
          data.feature.geometry.coordinates[0][0].map((e)=>{
                koordinat.push([e[1],e[0]])
          })
          setDataFeature(koordinat);
          setPosition([data.center.coordinates[1],data.center.coordinates[0]]);
      }, [data])

      var onEditPath = (e) =>{
        Object.keys(e.layers._layers).forEach(function(k){
          var koordinat =[]
          e.layers._layers[k]._latlngs[0].map(e=>{
            var posisi = [e.lng,e.lat]
            koordinat.push(posisi)
          })
          koordinat.push([e.layers._layers[k]._latlngs[0][0].lng,e.layers._layers[k]._latlngs[0][0].lat])
          var geojson = {
            type:"MultiPolygon",
            coordinates:[[koordinat]]
          }
          setMapLayer(geojson);
        })
      }

      var submitHandle =(e)=>{

        e.preventDefault()
        const pemilik = e.target.Pemilik.value
        const penggunaan = e.target.Penggunaan.value
        const url = "http://localhost:5000/api/permohonan"
        setLoading(true)
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
      .then(json=> {setLoading(false);
                  setActiveEdit(false)
                  alert("Permohonan berhasil diajukan") })
      .catch(err => alert("Permohona gagal diajukan"))
      }

     return (
         <div className='edit-Data-backgroud'>
            <div className='edit-Data-container'>
              <div style={{fontWeight:"bold",textAlign:"center"}}>
                Edit Data
              </div>
              <form  onSubmit={submitHandle}>
                    <InputEdit label="Pemilik" data={data.nama}/>
                    <InputEdit label="Penggunaan" data={data.penggunaan}/>
                    <div className='peta'>
                    <MapContainer
                        center={position}
                        zoom={21}
                        style={{ width: "100%", height: "300px" }}
                        zoomControl={false}
                    >
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
                        <button id="submit"  disabled={loading}>
                          {!loading && "Ajukan"}
                          <img src={LogoLoading} alt="2" style={loading ? {width:"22px",height:"22px"} : {width:"0px",height:"0px"} }></img>
                        </button>
                  </div>
              </form>
            </div>
            <div className='black-layer-fasum' onClick={()=>setActiveEdit(false)}/>
         </div>
     )
 }
 
 export default EditData
 