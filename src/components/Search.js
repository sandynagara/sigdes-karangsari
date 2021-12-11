import React,{useState,useRef,useEffect} from 'react'
import {Form} from 'react-bootstrap'
import {AiOutlineWarning} from 'react-icons/ai'
import "./Search.css"

function ItemSearch({data,urutan,queryNama,setOpen}){
    return (
        <div className="item-search" onClick={()=>{
            queryNama(data) 
            setOpen("Bangunan")}} >
            <div style={{fontWeight:"bold"}}>Bangunan {urutan + 1}</div>
            {/* <div style={{fontSize:"11px",fontWeight:"100" ,marginTop:"3px"}}>{koordinat[0]}  {koordinat[1]}</div> */}
            <div style={{fontSize:"13px",marginTop:"3px"}}>{data.nama_dusun}</div>
            <div style={{fontSize:"13px",marginTop:"3px"}}>{data.rt}</div>
        </div>
    )
}

function AdminAccess(){
    return(
        <div>
            <AiOutlineWarning style={{color:"red",width:"80px",height:"80px"}}/>
            <p><b>Maaf</b> <br/>Anda perlu login terlebih dahulu<br/>Untuk mengakses fitur ini</p>
        </div>
    )
}

function Search({open,queryNama,setOpen}) {

    const [login, setLogin] = useState(false)
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

    useEffect(() => {
        var url = "http://localhost:5000/api/admin"
        if(open === "Search"){
            panggil((e)=>
            {if(e === "unauthorized"){
                setLogin(false)
            }else{
                setLogin(true)
            }},url)
        }
    }, [open])

    return (
        <div className="sidebar-search" style={open == "Search" ? { marginLeft:"55px"} : {marginLeft:"-330px"}}>
            {login ? <div>
                <Form style={{display:"flex"}}>
                <Form.Control type="text" style={{marginRight:"10px"}} placeholder="Cari nama" ref={formInput} onChange={(e)=>{inputHandle(e.target.value)}} />
                <button variant="primary" className="search-button" >
                    Cari
                </button>
            </Form>

            <div style={{width:"80%" ,backgroundColor:"white"}}>
                {Daftarinput && Daftarinput.map((e)=>{
                    return <div style={{padding:"10px" ,textAlign:"left",cursor:"pointer"}} onClick={(result) => clickHandle(e.nama)}>
                        {e.nama}
                    </div>
                })}
            </div>

            {listInput ? listInput.map((e,index)=>{
                return <ItemSearch data={e} urutan={index} queryNama={queryNama} setOpen={setOpen}/>
            }) : <div style={{margin:"10px"}}>
                Data tidak ditemukan
            </div>}
            </div> : <AdminAccess/> }
            
 
            
            

        </div>
    )
}

export default React.memo(Search) 
