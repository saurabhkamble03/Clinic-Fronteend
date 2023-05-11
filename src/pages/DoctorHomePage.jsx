import React from 'react'
import DoctorBody from '../components/DoctorBody'
import DoctorNavbar from '../components/DoctorNavbar'
import Footer from '../components/Footer'

const DoctorHomePage = () => {
    return (
        <div>
            <DoctorNavbar />
            <DoctorBody />
            <Footer/>
        </div>
    )
}

export default DoctorHomePage