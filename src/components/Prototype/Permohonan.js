import React,{useState,useEffect} from 'react'
import {BsFillLayersFill} from 'react-icons/bs'
import { MapContainer } from 'react-leaflet'
import './Permohonan.css'

function ItemPermohonan({data}){
    return(
    <tr>
        <td style={{width:"100px"}} >{data.id_bangunan}</td>
        <td>{data.username}</td>
        <td>{data.pemilik}</td>
        <td>{data.penggunaan}</td>
        <td><BsFillLayersFill style={{width:"20px",height:"20px"}}/></td>
        <td>{data.status}</td>
    </tr>

    )
}

function PetaPermohonan({data}){
    const [position, setPosition] = useState([-7.864220975, 110.138661812]);

    function Changedview({ center }) {
        const map = useMap();
        map.setView(center);
        return null;
    }

    return(
    <div>
        <MapContainer
            center={position}
            zoom={21}
            style={{ width: "100%", height: "300px" }}
            zoomControl={false}>
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
         </MapContainer>
    </div>
    )
}

function Permohonan({setActivePermohonan}) {

    const [data, setData] = useState(false)

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
        const url = "http://localhost:5000/api/permohonan"
        Panggil((hasil)=>{
            console.log(hasil)
            setData(hasil)
        },url)
    }, [])

    return (
        <div className='edit-Data-backgroud'>
            <div className='permohonan-container'>
                <table id="list-permohonan">
                    <tr>
                        <th>Id Bangunan</th>
                        <th>Username</th>
                        <th>Pemilik</th>
                        <th>Penggunaan</th>
                        <th>Geometry</th>
                        <th>Status</th>
                    </tr>
                    {data && data.map(data=>{
                        return <ItemPermohonan data={data}/>
                    })}
                </table>
            </div>
           
            <div className='black-layer-fasum' onClick={()=>setActivePermohonan(false)}/>
        </div>
    )
}

export default Permohonan
