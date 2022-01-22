import React from 'react'
import {AiOutlineLogout,AiOutlineUser} from 'react-icons/ai'
import './Profile.css'

function Profile({setLogin,setActivePermohonan,setTambahAnggota}) {

    function signOut(){
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setLogin(false)
        setTambahAnggota(false)
    }
 
    return (
        <div className='profile-container'>
            <AiOutlineUser style={{width:"80px" ,height:"80px",color:"black"}}/>
            <p>Anda berhasil Login</p>
            <button className='permohonan' onClick={()=>{
                setTambahAnggota(true)
                }}>
                Tambah Anggota  
            </button>
            <button className='permohonan' onClick={()=>setActivePermohonan(true)}>
                Check Permohonan    
            </button>
            <button className='sign-out' onClick={signOut}>
                Log Out    
            </button>
    
            
        </div>
    )
}

export default Profile
