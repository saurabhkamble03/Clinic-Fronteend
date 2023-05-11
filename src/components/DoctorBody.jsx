import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: blanchedalmond;
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

const DoctorBody = () => {
  return (
    <Container>
        <Title>WELCOME DOCTOR</Title>
        <Link to={'/viewAppointment'}><Button>VIEW APPOINTMENTS</Button></Link>
    </Container>
  )
}

export default DoctorBody