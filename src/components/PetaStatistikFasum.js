import React,{useEffect,useState} from 'react'
import { MapContainer , useMap ,Popup,CircleMarker} from 'react-leaflet'
import * as WMS from "leaflet.wms";
import './PetaStatistikFasum.css'

function PetaStatistikFasum({daerah,setActive,kategori,tipeFilter}) {

    const [data, setData] = useState()
    const [selectedFasum, setSelectedFasum] = useState(false)
    const [dataFilter, setDataFilter] = useState()
    const [first, setFirst] = useState(true)

    var Panggil = (cb,url) =>  {
        fetch(url)
        .then(result => result.json())
        .then(result => cb(result))
        .catch(err=>console.log(err))
    }

    useEffect(() => {
        if(tipeFilter === "desa"){
            const url = "http://localhost:5000/api/desa/fasum/" + kategori
            Panggil((result)=>{
                console.log(result,"hasil")
                setData(result)
                setDataFilter(result)
            },url)
        }else {
            const url = `http://localhost:5000/api/${tipeFilter}/fasum/${kategori}&${daerah}`
            Panggil((result)=>{
                console.log(result,"hasil")
                setData(result)
                setDataFilter(result)
            },url)
        }
    }, [kategori])

    var Changedview = center => {
        const map = useMap();
        map.setView(center.center);
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

    return (
        <div id='PetaStatistikFasum-container'>
            
            <div className='statistik-fasum'>
                <div className='peta'>
                    <MapContainer
                        center={[-7.83920975, 110.138661812]}
                        zoom={16}
                        zoomControl={false}
                        touchZoom={false}
                        className="peta-statistik-fasum"
                    >
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
                        {data && data.features && data.features.map((e)=>{
                            var koordinat = e.geometry.coordinates[0]
                            return(  <CircleMarker center={[koordinat[1], koordinat[0]]} pathOptions={{ color: 'red' }} radius={10} >
                                 <Popup>{e.properties.nama}</Popup>
                            </CircleMarker>
                            )
                        })}
                        {selectedFasum && <Changedview center={[selectedFasum.geometry.coordinates[0][1],selectedFasum.geometry.coordinates[0][0]]}/>}
                        {selectedFasum && <CircleMarker center={[selectedFasum.geometry.coordinates[0][1],selectedFasum.geometry.coordinates[0][0]]} pathOptions={{ color: 'yellow' }} radius={10} >
                            <Popup>{selectedFasum.properties.nama}</Popup>
                        </CircleMarker> }
                    </MapContainer>
                </div>
                <div className='daftar-fasum'>
                   
                    {dataFilter && dataFilter.features && dataFilter.features.map((e)=>{
                        return(
                        <div className='item-fasum' onClick={()=>setSelectedFasum(e)}>
                            <p>{e.properties.nama}</p>
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className='black-layer-fasum' onClick={()=>setActive(false)}/>
        </div>
    )
}

export default PetaStatistikFasum
