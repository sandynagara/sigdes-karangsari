import React,{useRef} from 'react'
import './Legenda.css'

const daftarLegendaLine = [
    {nama:"Batas RT", warna:"orange"},
    {nama:"Batas Dusun", warna:"yellow"}
]

const daftarLegendaArea = 
[{nama:"Arena Olahraga",warna:"#EDCC7D"}
,{nama:"Bangunan",warna:"#BD00FF"}
,{nama:"Fasilitas Kesehatan",warna:"#E8B5BF"}
,{nama:"Industri",warna:"#FFB085"}
,{nama:"Irigasi",warna:"#ABE6F2"}
,{nama:"Ladang",warna:"#FFFF99"}
,{nama:"Jalan",warna:"#FF8766"}
,{nama:"Pemakaman",warna:"#8F8F8F"}
,{nama:"Pemerintahan",warna:"#C7997A"}
,{nama:"Pemukiman",warna:"#D1D1D1"}
,{nama:"Pendidikan",warna:"#DECCA1"}
,{nama:"Peternakan",warna:"#C7B000"}
,{nama:"Sarana Ibadah",warna:"#A6A1BA"}
,{nama:"Sawah",warna:"green"}
,{nama:"Sungai",warna:"#CCFFFF"}
,{nama:"Tanaman Campur",warna:"#8AED96"}]

function Legenda({open}) {

    const imageLegend = useRef()

    return (
        <div className='sidebar-container'
        style={
            open === "Legenda" ? { marginLeft: "55px" } : { marginLeft: "-350px" }
        }>
            <div> 
                <p><b>Legenda</b></p>
            </div>
            <div>
                {daftarLegendaLine.map(e=>{
                    return <div style={{display:"flex",alignItems:"center",margin:"10px 0px"}}>
                        <div style={{backgroundColor:`${e.warna}`,width:"35px",display:"flex",alignItems:"center",height:"5px"}}>
                            <div style={{height:"1px",width:"10px",backgroundColor:"black",marginLeft:"5px"}}/>
                            <div style={{height:"1px",width:"10px",backgroundColor:"black",marginLeft:"5px"}}/>
                        </div>
                        <p style={{margin:"0px 10px"}}>{e.nama}</p>
                    </div>
                })}
                {daftarLegendaArea.map((e)=>{
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
