import React from 'react'
import styled from 'styled-components'
import PatientNavbar from '../components/PatientNavbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoctorNavbar from '../components/DoctorNavbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h1`
    margin-top: 20px;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 40px;
`

const Image = styled.img`
    width: 80px;
    height: 80px;
`

const Data = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    font-size: 20px;
    font-weight: 800;
`

const Button = styled.button`
    margin-top: 10px;
    margin-left: 50px;
    cursor: pointer;
`

const ViewPatientDetail = () => {

    const navigate = useNavigate()
    const id = sessionStorage.getItem('patientId')

    const [data,setData] = useState({})

    const getPatientDetails = async(id) => {
        const response = await axios.get(`http://localhost:8080/getPatient/${id}`)
        setData(response.data)
    }

    useEffect(()=>{
        getPatientDetails(id)
    },[])

  return (
    <div>
        <DoctorNavbar/>
        <Button onClick={e => navigate('/examinePage')}><ArrowBackIcon/>BACK</Button>
        <Container>
            <Title>PATIENT PROFILE</Title>
            <Details>
                <Image src='https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png'/>
                <Data>
                    Name : {data.first_name+" "+data.last_name}
                    <br/>
                    Age  : {data.age}
                    <br/>
                    Gender : {data.gender}
                    <br/>
                    Height : {data.height} (cm)
                    <br/>
                    Weight : {data.weight} (kg)
                    <br/>
                    Mobile No : {data.mobile_no}
                    <br/>
                    Email : {data.email}
                    <br/>
                </Data>
            </Details>
        </Container>
    </div>
  )
}

export default ViewPatientDetail