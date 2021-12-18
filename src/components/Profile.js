import React from 'react'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import './Profile.css'

function Profile({setLogin,setActivePermohonan}) {

    function signOut(){
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setLogin(false)
    }

    return (
        <div className='profile-container'>
            <AiOutlineCheckCircle style={{width:"80px" ,height:"80px",color:"green"}}/>
            <p>Anda berhasil Login</p>
            <button onClick={()=>setActivePermohonan(true)}>
                Check Permohonan    
            </button>
            <button onClick={signOut}>
                Sign Out
            </button>
        </div>
    )
}

export default Profile
