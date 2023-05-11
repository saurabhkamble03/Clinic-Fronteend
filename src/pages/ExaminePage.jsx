import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DoctorNavbar from '../components/DoctorNavbar'

const Container = styled.div`
    
`

const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ButtonContainer = styled.div`
    margin-top: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Buttons = styled.button`
    cursor: pointer;
    margin: 0px 10px;
`

const Button = styled.button`
    cursor: pointer;
    margin-left: 50px;
`

const ExaminePage = () => {

    const navigate = useNavigate()

  return (
    <div>
        <DoctorNavbar/>
        <Container>
            <Title>Examine Patient</Title>
            <Button onClick={e => navigate('/viewAppointment')}>Back</Button>
            <ButtonContainer>
                <Buttons onClick={e => navigate('/viewPatientDetail')}>View Patient Details</Buttons>
                <Buttons onClick={e => navigate('/viewPatientHistory')}>View Patient History</Buttons>
                <Buttons onClick={e => navigate('/addReport')}>Examine Patient</Buttons>
            </ButtonContainer>
        </Container>
    </div>
  )
}

export default ExaminePage