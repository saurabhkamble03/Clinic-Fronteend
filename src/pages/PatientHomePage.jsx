import React from 'react'
import Footer from '../components/Footer'
import NewsLetter from '../components/NewsLetter'
import PatientBody from '../components/PatientBody'
import PatientNavbar from '../components/PatientNavbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const PatientHomePage = () => {

  const navigate = useNavigate()
  
  useEffect(() => {
    if(!sessionStorage.getItem('patientId'))
    {
      navigate('/patientLogin')
    }
    else{
      const patientId = sessionStorage.getItem('patientId');
    }
  },[])


  return (
    <div>
        <PatientNavbar/>
        <PatientBody/>
        <NewsLetter/>
        <Footer/>
    </div>
  )
}

export default PatientHomePage