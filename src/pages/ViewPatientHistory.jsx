import React, { useState } from 'react'
import styled from 'styled-components'
import PatientNavbar from '../components/PatientNavbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoctorNavbar from '../components/DoctorNavbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

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

const ViewPatientHistory = () => {

    const navigate = useNavigate();

    const [data,setData] = useState({})
    const id = sessionStorage.getItem('patientId')
    
    const getHistory = async(id) => {
        const response = await axios.get(`http://localhost:8080/getHistory/${id}`)
        setData(response.data)
    }

    useEffect(()=>{
        getHistory(id)
    },[])

  return (
    <div>
        <DoctorNavbar/>
        <Button onClick={e => navigate('/examinePage')}><ArrowBackIcon/>BACK</Button>
        <Container>
            <Title>PATIENT HISTORY</Title>
            <Details>
                <Image src='https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png'/>
                <Data>
                    Illness : {data.illness}
                    <br/>
                    Allergy  : {data.allergy}
                    <br/>
                    On Diet : {data.dieting}
                    <br/>
                    Had Surgery : {data.surgery}
                    <br/>
                    Trouble Sleeping : {data.sleep}
                    <br/>
                    Drinking Habbit : {data.drink}
                    <br/>
                    Feel Stressed : {data.stress}
                    <br/>
                    Had Blood Transfusion : {data.blood}
                    <br/>
                    Other Problems : {data.other_doctor_problems}
                    <br/>
                </Data>
            </Details>
        </Container>
    </div>
  )
}

export default ViewPatientHistory