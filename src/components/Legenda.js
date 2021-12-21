import React,{useRef} from 'react'
import './Legenda.css'

const daftarLegendaLanduse = 
[{nama:"Arena Olahraga",warna:"red"}
,{nama:"Fasilitas Kesehatan",warna:"red"}
,{nama:"Industri",warna:"red"}
,{nama:"Ladang",warna:"red"}
,{nama:"Makam",warna:"red"}
,{nama:"Pemukiman",warna:"red"}
,{nama:"Pemerintahan",warna:"red"}
,{nama:"Pemukiman",warna:"red"}
,{nama:"Pendidikan",warna:"red"}
,{nama:"Peternakan",warna:"red"}
,{nama:"Sarana Ibadah",warna:"red"}
,{nama:"Sawah",warna:"red"}
,{nama:"Tanaman Campur",warna:"red"}]

function Legenda({open}) {

    const imageLegend = useRef()

    

    return (
        <div className='sidebar-container'
        style={
            open === "Legenda" ? { marginLeft: "55px" } : { marginLeft: "-350px" }
        }>
            <div>
                <p>Judul</p>
            </div>
            <div>
                {daftarLegendaLanduse.map((e)=>{
                    return <div style={{display:"flex",alignItems:"center",margin:"10px 0px"}}>
                        <div style={{backgroundColor:`${e.warna}`,width:"20px",height:"20px"}}></div>
                        <p style={{margin:"0px 10px"}}>{e.nama}</p>
                    </div>
                })}
            </div>
            <img ref={imageLegend}></img>
        </div>
    )
}

export default Legenda
