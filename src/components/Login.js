import React from 'react'
import './Login.css'

function Login({open}) {

    var Panggil = (hasil,url) => {
        
    }

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
        .then(json2=>console.log(json2))
        .catch(err => console.log(err))
    }

    return (
        <div className="login-container" style={open == "Admin" ? { marginLeft: "55px" } : { marginLeft: "-350px" }}>
             <h4>Log in</h4>
            <form onSubmit={submitHandler}>
                <input className="input-admin" name="username" type="text" placeholder="Username" ></input>
                <input className="input-admin" name="password" type="password" placeholder="Password" ></input>
                <button >Sign In</button>
            </form>
           
        </div>
    )
}

export default Login
