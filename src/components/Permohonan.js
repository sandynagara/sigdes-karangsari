import React,{useState,useEffect} from 'react'
import {BsFillLayersFill} from 'react-icons/bs'
import {IoArrowBackSharp} from 'react-icons/io5'
import {AiOutlineClose,AiOutlineCheck} from 'react-icons/ai'
import { MapContainer,useMap,GeoJSON } from 'react-leaflet'
import * as WMS from "leaflet.wms";
import loadingBlue from "../images/Loading.svg"
import './Permohonan.css'
import configData from "./config.json";

function ItemPermohonan({data,setActiveGeometry,setGeometry,setUpdate,update}){

    var acceptHandler = () => {
        const url =  configData.SERVER_URL+'permohonan/persetujuan/'+data.id
        fetch(url,{
            method:"PUT", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                kondisi:"accept",
                id_bangunan:data.id_bangunan,
                pemilik:data.pemilik,
                penggunaan:data.penggunaan,
                geom:data.feature
            }),
            credentials: 'include'
        }).
        then(res=>res.json()).
        then(res=>{setUpdate(!update)}).
        catch(err=>console.log(err))
    }

    var declinenHandler = () => {
        const url =  configData.SERVER_URL+'permohonan/persetujuan/'+data.id
        fetch(url,{
            method:"PUT", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                kondisi:"decline",
            }),
            credentials: 'include'
        }).
        then(res=>res.json()).
        then(res=>{setUpdate(!update)}).
        catch(err=>console.log(err))
    }

    return(
    <tr>
        <td style={{width:"100px"}} >{data.id_bangunan}</td>
        {data.hak && <td>{data.username}</td>}
        <td>{data.pemilik}</td>
        <td>{data.penggunaan}</td>
        <td className='geometry' onClick={()=>{setActiveGeometry(true) ; setGeometry(data.feature)}}><BsFillLayersFill style={{width:"20px",height:"20px"}} /></td>
        {data.hak ? 
        <td style={{display:"flex",justifyContent:"center"}}>
            <button className='decline' onClick={declinenHandler}>
                <AiOutlineClose/>
            </button>
            <button className='accept' onClick={acceptHandler}>
                <AiOutlineCheck/>
            </button>
        </td> :
        <td>{data.status}</td>
        }
        
    </tr>

    )
}

function PetaPermohonan({feature,setActiveGeometry}){
    const [position, setPosition] = useState([-7.864220975, 110.138661812]);
    const [first, setFirst] = useState(true);
 

    useEffect(() => {
        const koordinat = feature.coordinates[0][0][3]
        setPosition([koordinat[1],koordinat[0]])
    }, [feature])

    var GeojsonHandler = () => {
        return (
          <GeoJSON
            data={feature}
            style={{ color: "yellow", fillOpacity: 0, weight: 1 }}
          />
        );
      };

    function Changedview({ center }) {
        const map = useMap();
        map.setView(center);
        return null;
    }

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

    return(
    <div>
        <div className='header-peta-permohonan'>
            <IoArrowBackSharp style={{width:"20px",height:"20px",cursor: "pointer"}}  onClick={()=>setActiveGeometry(false)}/>
            <p>Lokasi</p>
        </div>
        <MapContainer
            center={position}
            zoom={21}
            style={{ width: "100%", height: "400px" }}
            zoomControl={false}>
            {feature && <GeojsonHandler />}
            <Changedview center={position} />
            <CustomWMSLayer
              url={configData.SERVER_GEOSERVER+"geoserver/karangsari/wms?"}
              layers={"karangsari:bismillah"}
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
    )
}

function Permohonan({setActivePermohonan}) {
    const [loading,setLoading] = useState(true)
    const [data, setData] = useState([{hak:false}])
    const [update,setUpdate] = useState(false)
    const [activeGeometry, setActiveGeometry] = useState(false)
    const [geometry,setGeometry] =  useState(false)

    var Panggil = (hasil,url) =>{
        fetch(url,{
            method: 'GET',
            credentials: 'include'
          }).
        then((result)=>result.json()).
        then(json=>hasil(json)).
        catch(err=>console.log(err))
    }

    useEffect(() => {
        const url =  configData.SERVER_URL+"permohonan"
        setLoading(true)
        Panggil((hasil)=>{
            setLoading(false)
            setData(hasil)
        },url)
    }, [update])

    return (
        <div className='edit-Data-backgroud'>
              
            <div className='permohonan-container'>
                <p>List Permohonan</p>
                {activeGeometry ? <PetaPermohonan feature={geometry} setActiveGeometry={setActiveGeometry}/> : 
                    <table id="list-permohonan">
                    <tr>
                        <th>Id Bangunan</th>
                        {data[0] && data[0].hak && <th>Username</th>}
                        <th>Pemilik</th>
                        <th>Penggunaan</th>
                        <th>Geometry</th>
                        {data[0] && data[0].hak ? <th>Status</th> : <th>Aksi</th>}
                    </tr>
                    {data[0] ? data.map(data=>{
                        return <ItemPermohonan data={data} setGeometry={setGeometry} update={update} setUpdate={setUpdate} setActiveGeometry={setActiveGeometry}/>
                    }) : <p>Tidak ada Permohonan</p>}
                    </table>
                }
                
            </div>
            <div className='loading'>
                <img src={loadingBlue} alt="2" style={loading ? {width:"100px",height:"100px"} : {width:"0px",height:"0px"} }></img>
            </div>
            <div className='black-layer-fasum' onClick={()=>setActivePermohonan(false)}/>
        </div>
    )
}

export default Permohonan
