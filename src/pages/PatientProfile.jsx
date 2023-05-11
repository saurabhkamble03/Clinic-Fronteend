import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PatientNavbar from '../components/PatientNavbar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Container = styled.div`
    background-color: #b7fcb7;
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
    margin-bottom: 30px;
    cursor: pointer;
    background-color: #d4b1f5;

    &:hover{
        background-color: aliceblue;
    }
`

const PatientProfile = () => {

    const navigate = useNavigate();

    const initialValues = {
        name: "",
        username: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        occupation: "",
        email: "",
        state: "",
        city: ""
    }

    const [details, setDetails] = useState(initialValues)


    const getPatientDetails = async (patientId) => {
        await axios.get(`http://localhost:8080/getPatient/${patientId}`)
            .then(res => {
                console.log(res.data)
                setDetails(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (!sessionStorage.getItem('patientId')) {
            navigate('/patientLogin')
        }
        else {
            const patientId = sessionStorage.getItem('patientId');
            getPatientDetails(patientId);
        }
    }, [])

    return (
        <div>
            <PatientNavbar />
            <Container>
                <Title>MY PROFILE</Title>
                <Details>
                    <Image src='https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png' />
                    <Data>
                        Name : {details.first_name + " " + details.last_name}
                        <br />
                        Username : {details.username}
                        <br />
                        Age  : {details.age}
                        <br />
                        Gender : {details.gender}
                        <br />
                        Height : {details.height}
                        <br />
                        Weight : {details.weight}
                        <br />
                        Occupation : {details.occupation}
                        <br />
                        Mobile No : {details.mobile_no}
                        <br />
                        Email : {details.email}
                        <br />
                        State : {details.state}
                        <br />
                        City : {details.city}
                        <br />
                    </Data>
                </Details>
                <Link to="/updateProfile"><Button>UPDATE PROFILE</Button></Link>
            </Container>
        </div>
    )
}

export default PatientProfile