import React,{useEffect} from 'react'
import NavbarHome from '../components/Navigasi/Navbar'
import Backgroud from '../components/Backgroud'
import PetaStatistik from '../components/PetaStatistik'
import './Home.css'
import Footer from '../components/Footer'

function Home() {

    return (
        <div>
            <NavbarHome/>
            <Backgroud />
            <PetaStatistik />
            <Footer/>
        </div>
    )
}

export default Home
