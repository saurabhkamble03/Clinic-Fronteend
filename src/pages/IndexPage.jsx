import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
    
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 30vh;
`

const Heading = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5vh;
`

const PatientButton = styled.button`
    padding: 10px;
    cursor: pointer;
    &:hover{
        padding: 20px;
    }
`

const DoctorButton = styled.button`
    padding: 10px;
    cursor: pointer;
    background-color: skyblue;
    &:hover{
        padding: 15px;
    }
`

const IndexPage = () => {
    return (
        <Container>
            <Heading>MY CLINIC</Heading>
            <ButtonContainer>
                <Link to="/patientLogin"><PatientButton>PATIENT LOGIN</PatientButton></Link>
                <Link to="/doctorLogin"><DoctorButton>DOCTOR LOGIN</DoctorButton></Link>
            </ButtonContainer>
        </Container>
    )
}

export default IndexPage