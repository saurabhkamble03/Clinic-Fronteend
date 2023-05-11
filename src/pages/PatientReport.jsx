import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import PatientNavbar from '../components/PatientNavbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import DoctorNavbar from '../components/DoctorNavbar';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'

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

const PatientReport = () => {

    const navigate = useNavigate();

    const [data,setData] = useState({})

    const getReport = async(id) => {
        const response = await axios.get(`http://localhost:8080/getReport/${id}`)
        console.log(response.data)
        setData(response.data)
    }

    useEffect(() => {
        if(!sessionStorage.getItem('patientId'))
        {
          navigate('/patientLogin')
        }
        else{
          const reportId = sessionStorage.getItem('reportId');
          getReport(reportId)
        }
      },[])

  return (
    <div>
        <PatientNavbar/>
        <Link to="/myreports"><Button><ArrowBackIcon/>BACK</Button></Link>
        <Container>
            <Title>MY REPORT</Title>
            <Details>
                <Image src='https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png'/>
                <Data>
                    Temperature : {data.temperature} °F
                    <br/>
                    Pulse  : {data.pulse} bpm
                    <br/>
                    Blood Pressure : {data.blood_pressure} mmHg
                    <br/>
                    Oxygen Level : {data.oxygen_level} %
                    <br/>
                    Diagnosis : {data.diagnosis}
                    <br/>
                    Symptoms : {data.symptoms}
                    <br/>
                    Prescription : {data.prescripton}
                    <br/>
                    Remark : {data.remark}
                    <br/>
                </Data>
            </Details>
        </Container>
    </div>
  )
}

export default PatientReport