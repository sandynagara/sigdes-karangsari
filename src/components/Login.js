import React,{useEffect,useState,useRef} from 'react'
import './Login.css'
import Profile from './Profile'
import Permohonan from './Permohonan'
import LogoLoading from "../images/Loading.svg"
import TambahAnggota from './TambahAnggota'
import configData from "./config.json";

function LoginPage({setLogin}){

    const [loading, setLoading] = useState(false)

    var buttonLogin = useRef()
    var usernameForm = useRef()
    var passwordForm = useRef()

    var checkButton = (e) => {
        console.log(e)
        if(passwordForm.current.value=="" || usernameForm.current.value==""){
            buttonLogin.current.disabled=true
            buttonLogin.current.style.backgroundColor = "rgb(180, 210, 248)"
            console.log(buttonLogin.current.disabled)
        }else{
            buttonLogin.current.disabled=false
            buttonLogin.current.style.backgroundColor = "rgb(26, 122, 247)"
        }
    }

    var submitHandler = (e) => {
        setLoading(true)
        e.preventDefault()
        console.log(buttonLogin.current.disabled)
        const username = e.target.username.value
        const password = e.target.password.value
        const url = configData.SERVER_URL+"login"
        fetch(url,{method:"POST", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },body: JSON.stringify({
            username: username,
            password: password
          }),
          credentials: 'include'
        }).then(response=> response.json())
        .then(json=>{
            setLoading(false)
            console.log(json)
            if(json.RTN){
                setLogin(true)
            }else{
                alert(json.MSG)
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h4>Login</h4>
            <form onSubmit={submitHandler}>
                <input className="input-admin" ref={usernameForm} onChange={checkButton} name="username" type="text" placeholder="Username" ></input>
                <input className="input-admin" ref={passwordForm} onChange={checkButton} name="password" type="password" placeholder="Password" ></input>
                <button ref={buttonLogin} disabled>     
                    {!loading && "Sign In"}
                    <img src={LogoLoading} alt="2" style={loading ? {width:"22px",height:"22px"} : {width:"0px",height:"0px"} }></img>
                </button>
            </form>
        </div>
    )
}

function Login({open}) {

    const [login, setLogin] = useState(false)
    const [tambahAnggota, setTambahAnggota] = useState(false)
    const [activePermohonan, setActivePermohonan] = useState(false)

    var Panggil = (cb,url) => {
        fetch(url, {
            method: 'GET',
            credentials: 'include'
          })
        .then(res=>res.json())
        .then(json=>cb(json))
        .catch(err=>console.log(err))
    }

   useEffect(() => {
    var url = configData.SERVER_URL+"admin"
    if(open === "Admin"){
        Panggil((e)=>
        {if(e === "unauthorized"){
            setLogin(false)
        }else{
            setLogin(true)
        }},url)
    }
   }, [open])
 
    return (
        <div className="login-container" style={open === "Admin" ? { marginLeft: "55px" } : { marginLeft: "-350px" }}>
            {tambahAnggota ? <TambahAnggota setTambahAnggota={setTambahAnggota} />  : login ?  <Profile setLogin={setLogin} setActivePermohonan={setActivePermohonan}  setTambahAnggota={setTambahAnggota} />:<LoginPage setLogin={setLogin}/>}
            {activePermohonan &&   <Permohonan setActivePermohonan={setActivePermohonan}/>}
        </div>
    )
}

export default Login
