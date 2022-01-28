import React,{useEffect, useRef,useState} from 'react';
import "./TambahAnggota.css"
import LogoLoading from "../images/Loading.svg"
import configData from "./config.json";

function TambahAnggota({setTambahAnggota}) {

  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(false)

  var submitButton = useRef()
  var usernameForm = useRef()
  var passwordForm = useRef()
  var passwordFormConfirm = useRef()

  var changeInput = () => {
    if(passwordForm.current.value=="" || usernameForm.current.value=="" || passwordFormConfirm.current.value==""){
      submitButton.current.disabled=true
      submitButton.current.style.backgroundColor = "rgb(180, 210, 248)"
  }else{
      submitButton.current.disabled=false
      submitButton.current.style.backgroundColor = "rgb(26, 122, 247)"
    }
  } 

  var submitHandler = (e) => {
    setLoading(true)
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    const status = e.target.status.value
    const confirmPassword = e.target.confirmPassword.value
    var url = configData.SERVER_URL+"register"
    if(password === confirmPassword){
      fetch(url,{method:"POST", headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },body: JSON.stringify({
        username: username,
        password: password,
        status:status
      }),
      credentials: 'include'
      })
      .then(response=> response.json())
      .then(json=>{
          setLoading(false)
          setError(json.nama)
      })
      .catch(err => {
        setLoading(false)
        console.log("error:",err)
      })
    }else{
      setError("Password tidak sama")
      setLoading(false)
    }
   
  } 

  return <div>
    <h4>Sign Up</h4>
    <form onSubmit={submitHandler}>
      <input className="input-admin" ref={usernameForm} onChange={changeInput} name="username" type="text" placeholder="Username" ></input>
      <input className="input-admin" ref={passwordForm} onChange={changeInput} name="password" type="password" placeholder="Password"  ></input>
      <input className="input-admin" ref={passwordFormConfirm} onChange={changeInput} name="confirmPassword" type="password" placeholder="Confirm Passowrd"  ></input>
      <select className='status' name="status">
        <option value="Admin">Admin</option>
        <option value="Super Admin">Super Admin</option>
      </select>
      <button ref={submitButton}> 
        {!loading && "Sign Up"}
        <img src={LogoLoading} alt="2" style={loading ? {width:"22px",height:"22px"} : {width:"0px",height:"0px"} }></img>
      </button>
    </form>
    <button className='kembali' onClick={()=>setTambahAnggota(false)} style={{backgroundColor:"red",width:"87%",marginBottom:"35px"}}>
      Kembali    
    </button>
    {error && <div style={{backgroundColor:"red",padding:"5px",textAlign:"center",borderRadius:"5px"}}><p style={{color:"white",margin:"0px"}}>{error}</p></div>}
  </div>;
}

export default TambahAnggota;
