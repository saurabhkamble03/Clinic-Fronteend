import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DoctorNavbar from '../components/DoctorNavbar'

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

const DoctorProfile = () => {

    const navigate = useNavigate()
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        mobile_no: "",
        user_name: "",
        qualification: "",
        experience: ""
    }

    const [details,setDetails] = useState(initialValues)

    const getDoctorDetails = async() =>{
        const response = await axios.get(`http://localhost:8080/getDoctor`)
        console.log(response.data)
        setDetails(response.data)
    }

    useEffect(()=>{
        if (!sessionStorage.getItem('doctorId')) {
            navigate('/doctorLogin')
        }
        else{
            const doctorId = sessionStorage.getItem('doctorId');
            getDoctorDetails()
        }
    },[])

    return (
        <div>
            <DoctorNavbar />
            <Container>
                <Title>MY PROFILE</Title>
                <Details>
                    <Image src='https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Transparent-Image.png' />
                    <Data>
                        Name : {details.first_name + " " + details.last_name}
                        <br />
                        Username : {details.user_name}
                        <br />
                        Email : {details.email}
                        <br />
                        Age  : {details.age}
                        <br />
                        Qualification : {details.qualification}
                        <br />
                        Experience : {details.experience} Yrs
                        <br />
                    </Data>
                </Details>
            </Container>
        </div>
    )
}

export default DoctorProfile