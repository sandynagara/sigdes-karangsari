import React,{useState,useRef} from 'react'
import {Form} from 'react-bootstrap'
import "./Search.css"

function ItemSearch({data,urutan,queryNama,setOpen}){
    var koordinat = data.center.coordinates
    return (
        <div className="item-search" onClick={()=>{queryNama(data) 
            setOpen("Bangunan")}} >
            <div style={{fontWeight:"bold"}}>Bangunan {urutan + 1}</div>
            {/* <div style={{fontSize:"11px",fontWeight:"100" ,marginTop:"3px"}}>{koordinat[0]}  {koordinat[1]}</div> */}
            <div style={{fontSize:"13px",marginTop:"3px"}}>{data.nama_dusun}</div>
            <div style={{fontSize:"13px",marginTop:"3px"}}>{data.rt}</div>
        </div>
    )
}

function Search({open,queryNama,setOpen}) {

    const [Daftarinput,setDaftarinput] = useState()
    const [listInput,setListInput] = useState(false)
    const formInput = useRef()

    console.log("search")

    var clickHandle = (e)=> {
        formInput.current.value = e
        setDaftarinput(false)
        console.log(e)
        var url = "http://localhost:5000/api/penduduk/"+e
        panggil((result)=>{
            setListInput(result)
        },url)
    }

    var panggil =(cb,url) => {
        fetch(url, {credentials: 'include'})
        .then((res)=>res.json())
        .then(json=>cb(json))
     }

    var inputHandle = (e) =>{
        if(e){
            var url = "http://localhost:5000/api/caripenduduk/"+e
            console.log()
            panggil((result)=>{
                setDaftarinput(result)
                
            },url)
            setListInput(false)
        }else{
            setDaftarinput(false)
            
        }
        
    }

    return (
        <div className="sidebar-search" style={open == "Search" ? { marginLeft:"0px"} : {marginLeft:"-330px"}}>
            <Form style={{display:"flex"}}>
                <Form.Control type="text" style={{marginRight:"10px"}} placeholder="Cari nama" ref={formInput} onChange={(e)=>{inputHandle(e.target.value)}} />
                <button variant="primary" className="search-button" >
                    Cari
                </button>
            </Form>
            <div style={{width:"80%" ,backgroundColor:"white"}}>
                {Daftarinput ? Daftarinput.map((e)=>{
                    return <div style={{padding:"10px" ,textAlign:"left",cursor:"pointer"}} onClick={(result) => clickHandle(e.nama)}>
                        {e.nama}
                    </div>
                }) : ""}
            </div>
            {listInput ? listInput.map((e,index)=>{
                return <ItemSearch data={e} urutan={index} queryNama={queryNama} setOpen={setOpen}/>
            }) : <div style={{margin:"10px"}}>
                Data tidak ditemukan
            </div>}
        </div>
    )
}

export default React.memo(Search) 
