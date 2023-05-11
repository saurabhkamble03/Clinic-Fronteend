import React from 'react'
import styled from 'styled-components'
import DoctorNavbar from '../components/DoctorNavbar';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Container = styled.div`
    
`

const Title = styled.h1`
    text-align: center;
`

const TableContainer = styled.div`
    margin-top: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 70px;
    margin-right: 70px;
`

const ButtonContainer = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Buttons = styled.button`
    margin: 5px;
    cursor: pointer;
`

const Ebutton = styled.button`
    margin: 5px;
    cursor: pointer;
`

const DoctorAppointment = () => {

    const navigate = useNavigate()

    const [appointment, setAppointment] = useState([])
    const [allAppointment, setAllAppointment] = useState(true)
    const [todayAppointment, setTodayAppointment] = useState(false)
    const [dataExist, setDataExist] = useState(false)


    sessionStorage.removeItem('patientId')
    sessionStorage.removeItem('appointmentId')

    const examineHandler = (pid,aid) => {
        const patId = pid
        sessionStorage.setItem('patientId', patId)
        sessionStorage.setItem('appointmentId', aid)

        navigate('/examinePage')
    }

    const getAllAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getAllAppointment`)
            console.log(response.data)

            if (response.data.length !== 0) {
                setAppointment(response.data)
                setDataExist(true)
                // setClicked(!clicked)
            }
            else {
                setDataExist(false)
            }
            // console.log(appointment)
        }
        catch (e) {
            console.log(e)
        }

    }

    const getTodayAppointment = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getTodaysAppointment`)
            console.log(response.data)
            if (response.data.length !== 0) {
                setAppointment(response.data)
                setDataExist(true)
                // setClicked(!clicked)
            }
            else {
                setDataExist(false)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!sessionStorage.getItem('doctorId')) {
            navigate('/patientLogin')
        }
        else {
            if (allAppointment) {
                getAllAppointments()
                setTodayAppointment(false)
            }
        }
    }, [allAppointment])

    useEffect(() => {
        if (!sessionStorage.getItem('doctorId')) {
            navigate('/patientLogin')
        }
        else {
            if (todayAppointment) {
                getTodayAppointment()
                setAllAppointment(false)
            }
        }
    }, [todayAppointment])

    return (
        <Container>
            <DoctorNavbar />
            <Title>APPOINTMENTS</Title>
            <ButtonContainer>
                <Buttons onClick={e => setTodayAppointment(true)}>Today's Appointments</Buttons>
                <Buttons onClick={e => setAllAppointment(true)}>All Appointments</Buttons>
            </ButtonContainer>
            <TableContainer>
                {
                    dataExist ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointment.map((apt) => (
                                        <tr key={apt.appointment_id}>
                                            <td>{apt.patient.first_name}</td>
                                            <td>{apt.patient.last_name}</td>
                                            <td>{apt.date}</td>
                                            <td>{apt.slot.start_time}</td>
                                            <td><Ebutton onClick={e => examineHandler(apt.patient.patient_id,apt.appointment_id)}>Examine</Ebutton></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h4>No Appointments</h4>
                }
            </TableContainer>
        </Container>
    )
}

export default DoctorAppointment