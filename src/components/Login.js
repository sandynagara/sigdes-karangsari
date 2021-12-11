import React,{useEffect,useState} from 'react'
import './Login.css'
import Profile from './Profile'

function LoginPage({setLogin}){

    var submitHandler = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        const url = "http://localhost:5000/api/login"
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
            if(json === "Login success"){
                setLogin(true)
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h4>Login</h4>
            <form onSubmit={submitHandler}>
                <input className="input-admin" name="username" type="text" placeholder="Username" ></input>
                <input className="input-admin" name="password" type="password" placeholder="Password" ></input>
                <button >Sign In</button>
            </form>
        </div>
    )
}

function Login({open}) {

    const [login, setLogin] = useState(false)

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
    var url = "http://localhost:5000/api/admin"
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
        <div className="login-container" style={open == "Admin" ? { marginLeft: "55px" } : { marginLeft: "-350px" }}>
            {login ?  <Profile setLogin={setLogin}/> :  <LoginPage setLogin={setLogin}/>}
        </div>
    )
}

export default Login
