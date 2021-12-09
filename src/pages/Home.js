import React from 'react'
import NavbarHome from '../components/Navigasi/Navbar'
import Backgroud from '../components/Backgroud'
import PetaStatistik from '../components/PetaStatistik'
import * as Scroll from 'react-scroll'
import './Home.css'

function Home() {
    return (
        <div>
            <NavbarHome/>
            <Backgroud />
            <PetaStatistik />
        </div>
    )
}

export default Home
