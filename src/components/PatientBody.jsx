import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    background-color: #e7ffb7;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const Title = styled.h1`
    text-align: center;
    padding-bottom: 100px;
    `

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    `

const PatientBody = () => {
  
  const [name,setName] = useState("")
  const navigate = useNavigate()
  
  const getPatientId = async() =>{
    const patientId = sessionStorage.getItem('patientId')
    await axios.get(`http://localhost:8080/getFirstName/${patientId}`)
    .then(res => {
      console.log(res)
      console.log(res.data)
      setName(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(()=>{
    getPatientId();  
  },[])

  return (
    <Container>
        <Title>Welcome {name}</Title>
        <Link to="/addAppointment"><Button>BOOK APPOINTMENT</Button></Link>
    </Container>
  )
}

export default PatientBody