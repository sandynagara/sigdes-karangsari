import React,{useState,useRef,useEffect} from 'react'
import {Form} from 'react-bootstrap'
import {AiOutlineWarning} from 'react-icons/ai'
import "./Search.css"
import LogoLoading from "../images/Loading.svg"
import configData from "./config.json";

function ItemSearch({data,urutan,queryNama,setOpen}){
    return (
        <div className="item-search" onClick={()=>{
            queryNama(data) 
            setOpen("Bangunan")}} 
        >
            <div style={{fontWeight:"bold"}}>Bangunan {urutan + 1}</div>
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
    const [loading, setLoading] = useState(false)
    
    const formInput = useRef()

    var clickHandle = (e)=> {
        setLoading(true)
        formInput.current.value = e
        setDaftarinput(false)
        var url = configData.SERVER_URL+`penduduk/${e}`
        panggil((result)=>{
            setLoading(false)
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
            var url = configData.SERVER_URL+`caripenduduk/${e}`
            panggil((result)=>{
                setDaftarinput(result)
            },url)
            setListInput(false)
        }else{
            setDaftarinput(false)
        }
    }

    var submitHandle =(e)=>{
        e.preventDefault()
        setLoading(true)
        var nama = e.target[0].value
        setDaftarinput(false)
        var url = configData.SERVER_URL+`penduduk/${nama}`
        panggil((result)=>{
            console.log(result)
            setLoading(false)
            setListInput(result)
        },url)
    }

    useEffect(() => {
        var url = configData.SERVER_URL+"admin"
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
                <Form style={{display:"flex"}} onSubmit={submitHandle}>
                <Form.Control type="text" style={{marginRight:"10px"}} placeholder="Cari nama" ref={formInput} onChange={(e)=>{inputHandle(e.target.value)}} />
                <button variant="primary" className="search-button" >
                    {!loading && "Cari"}
                    <img src={LogoLoading} alt="2" style={loading ? {width:"22px",height:"22px"} : {width:"0px",height:"0px"} }></img>
                </button>
            </Form>

            <div style={{width:"80%" ,backgroundColor:"white"}}>
                {Daftarinput && Daftarinput.map((e)=>{
                    return <div style={{padding:"10px" ,textAlign:"left",cursor:"pointer"}} onClick={() => clickHandle(e.nama)}>
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
