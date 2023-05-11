import React, { useEffect } from 'react'
import styled from 'styled-components'
import CancelIcon from '@mui/icons-material/Cancel';
import PatientNavbar from '../components/PatientNavbar';
// import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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

const Button = styled.button`
    border: none;
    cursor: pointer;
    background-color: white;
`

const NoData = styled.h1`
    margin-top: 15%;
    text-align: center;
`

const MyAppointmentPage = () => {

    const navigate = useNavigate();

    const initialAppointment = {
        appointment_id: "",
        patient: {
            patient_id: "",
            first_name: "",
            last_name: "",
            username: "",
            age: "",
            occupation: "",
            height: "",
            weight: "",
            mobile_no: "",
            state: "",
            city: "",
            street: "",
            gender: "",
            zip_code: "",
            password: "",
            email: ""
        },
        date: "",
        slot: {
            slot_id: "",
            start_time: ""
        },
        status: ""
    }

    const [apptData, setApptData] = useState(initialAppointment)

    const clickHandler = (e) => {
        e.preventDefault()
        const patientId = sessionStorage.getItem('patientId');
        deleteAppointment(patientId)
    }

    const checkStatus =async (id) => {
        try{
            const response = await axios.get(`http://localhost:8080/checkStatus/${id}`)
            console.log(response.data)
            if(!response.data){
                getMyAppointment(id)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const deleteAppointment = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:8080/deleteAppointment/${id}`)
            console.log(response.data)
            navigate("/addAppointment")
        }
        catch(err){
            console.log(err)
        }
    }

    const getMyAppointment = async (id) => {
        try {
            console.log("here")
            const response = await axios.get(`http://localhost:8080/getAppointmentByPatientId/${id}`)
            setApptData(response.data)
            console.log('response ', response.data)
            console.log(apptData)
        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        if (!sessionStorage.getItem('patientId')) {
            navigate('/patientLogin')
        }
        else {
            const patientId = sessionStorage.getItem('patientId');
            checkStatus(patientId)
        }
    }, [])

    return (
        <Container>
            <PatientNavbar />
            <Title>My Appointment</Title>
            {
                apptData.appointment_id === "" ?
                    <NoData>No Data</NoData>
                    :
                    <TableContainer>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{apptData.date}</td>
                                    <td>{apptData.slot.start_time}</td>
                                    <td><Button onClick={e => clickHandler(e)}><CancelIcon /></Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </TableContainer>
            }

        </Container>
    )
}

export default MyAppointmentPage