import React from 'react'
import {AiOutlineLogout,AiOutlineUser} from 'react-icons/ai'
import './Profile.css'

function Profile({setLogin,setActivePermohonan}) {

    function signOut(){
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setLogin(false)
    }
 
    return (
        <div className='profile-container'>
            <AiOutlineUser style={{width:"80px" ,height:"80px",color:"black"}}/>
            <p>Anda berhasil Login</p>
            <div style={{display:"flex"}}>
                <button className='permohonan' onClick={()=>setActivePermohonan(true)}>
                    Check Permohonan    
                </button>
                <button className='sign-out' onClick={signOut}>
                    <AiOutlineLogout style={{width:"20px",height:"20px"}}/>
                </button>
            </div>
            
        </div>
    )
}

export default Profile
