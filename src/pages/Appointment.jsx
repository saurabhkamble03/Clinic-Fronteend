import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PatientNavbar from '../components/PatientNavbar'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'

const Container = styled.div`
    background-color: azure;
`

const Title = styled.h1`
    text-align: center;
`

const TableContainer = styled.div`
    display: flex;
    width: fit-content;
    margin-top: 80px;
    margin-left: 90vh;
    justify-content: center;
    align-items: center;
`

const DateC = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    /* text-align: center; */
`

const Button = styled.button`
    margin-top: 20px;
    cursor: pointer;
`

const Dater = styled.div`
    
`

const NoData = styled.h1`
    text-align: center;
`

const Already = styled.h5`
    text-align: center;
    color: red;
`

const SButton = styled.button`
    cursor: pointer;
`

const Appointment = () => {

    const initialValues = [
        {
            slot_id: "",
            start_time: ""
        }
    ]

    const navigate = useNavigate();
    const [value, setValue] = useState(new Date());
    const [slot, setSlot] = useState(initialValues);
    const [clicked, setClicked] = useState(true);
    const [alreadyAppointed, setAlreadyAppointed] = useState(false);
    const patientId = sessionStorage.getItem('patientId');

    var sdate = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();

    const clickHandler = (e) => {
        e.preventDefault()
        setClicked(true)
    }

    const showSlots = async (sdate) => {
        try {
            const response = await axios.get(`http://localhost:8080/getSlotsByDate/${sdate}`)
            console.log(response.data)
            setSlot(response.data)
            console.log(slot)
        }
        catch (err) {
            console.log(err)
        }
    }

    const addAppointmentHandler = async (slotId) => {
        try {

            const check = await axios.get(`http://localhost:8080/checkStatus/${patientId}`)
            const history = await axios.get(`http://localhost:8080/checkHistory/${patientId}`)

            if(history.data === false){
                navigate('/addHistory')
            }

            if (check.data && history.data) {
                console.log('patientId ', patientId)
                console.log('date ', value)
                console.log('slot ', slotId)
                const response = await axios.post(`http://localhost:8080/addAppointment`,
                    {
                        "patient": {
                            "patient_id": patientId
                        },
                        "date": value,
                        "slot": {
                            "slot_id": slotId
                        },
                        "status": "Active"
                    }
                )
                console.log(response.data)
                if(response.data){
                    navigate('/myAppointment')
                }
            }
            else{
                setAlreadyAppointed(true)
            }
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
            // const patientId = sessionStorage.getItem('patientId');
            if (clicked) {
                if (value.getDate() < 10 && (value.getMonth() + 1) < 10) {
                    sdate = value.getFullYear() + '-0' + (value.getMonth() + 1) + '-0' + value.getDate();
                }
                else if (value.getDate() < 10) {
                    sdate = value.getFullYear() + '-' + (value.getMonth() + 1) + '-0' + value.getDate();
                }

                else if ((value.getMonth() + 1) < 10) {
                    sdate = value.getFullYear() + '-0' + (value.getMonth() + 1) + '-' + value.getDate();
                }

                console.log(sdate)
                showSlots(sdate)
                setClicked(false)
            }
        }
    }, [clicked])

    return (
        <Container>
            <PatientNavbar />
            <Title>Book Appointment</Title>
            {
                alreadyAppointed ? 
                <Already>You already have an appointment</Already>
                :
                ''
            }
            <DateC>
                <h4>SELECT DATE</h4>
                <Dater>
                    <DatePicker
                        selected={value}
                        onChange={(newValue) => setValue(newValue)}
                        dateFormat='yyyy-MM-dd'
                        minDate={new Date()}
                        maxDate={new Date().setMonth(new Date().getMonth() + 1)}
                        filterDate={date => date.getDay() !== 0}
                    />
                </Dater>
                <Button onClick={e => clickHandler(e)}>SUBMIT</Button>
            </DateC>
            {
                slot !== initialValues ?
                    <TableContainer>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Slot</th>
                                    <th scope="col">Start Time</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    slot.map((apt) => (
                                        <tr key={apt.slot_id}>
                                            <th>{apt.slot_id}</th>
                                            <td>{apt.start_time}</td>
                                            <td><SButton onClick={e => addAppointmentHandler(apt.slot_id)}>Book</SButton></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </TableContainer>
                    :
                    <NoData>Please Select Date And Submit</NoData>
            }

        </Container>
    )
}

export default Appointment