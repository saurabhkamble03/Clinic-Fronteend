import ArrowBack from '@mui/icons-material/ArrowBack'
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
  width: 100%;
`

const Title = styled.h1`
  
`

const Form = styled.form`
  margin-top: 70px;
`

const Field = styled.div`
  width: max-content;
`

const Label = styled.label`
  font-size: 20px;
`

const Input = styled.input`
  width: 300px;
  margin: 15px;
  padding: 7px;
`

const Button = styled.button`
  background-color: #7979ff;
  margin-top: 30px;
  margin-bottom: 40px;
  cursor: pointer;
  font-weight: 600;
`

const Textarea = styled.textarea`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 100px;
`

const Bbutton = styled.button`
    margin-top: 30px;
    margin-left: 30px;
    cursor: pointer;
`

const Validate = styled.p`
    color: red;
`

const AddReport = () => {

    const navigate = useNavigate()
    const patientId = sessionStorage.getItem('patientId')
    const appointmentId = sessionStorage.getItem('appointmentId')

    const initialValues = {
        temperature: "",
        pulse: "",
        prescripton: "",
        diagnosis: "",
        remark: "",
        symptoms: "",
        oxygen_level: "",
        blood_pressure: ""
    }
    const [data, setData] = useState(initialValues)
    const [isSubmit,setIsSubmit] = useState(false)
    const [formErrors,setFormErrors] = useState({})
    // const [appointmentId,setAppointmentId] = useState("")

    const changeHandler = (e) => {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setFormErrors(validate(data))
        setIsSubmit(true)
    }

    const reportData = {
        appointment: {
            appointment_id: appointmentId
        },
        patient: {
            patient_id: patientId
        },
        temperature: data.temperature,
        pulse: data.pulse,
        prescripton: data.prescripton,
        diagnosis: data.diagnosis,
        remark: data.remark,
        symptoms: data.symptoms,
        oxygen_level: data.oxygen_level,
        blood_pressure: data.blood_pressure
    }

    const addReport = async() => {
        try{
            const response = await axios.post(`http://localhost:8080/addReport`,reportData)
            console.log(response.data)

            if(response.data){
                navigate('/viewAppointment')
            }
        }
        catch(e){
            console.log(e)
        }
    }
    
    useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmit){
            addReport()
        }
    },[isSubmit,formErrors])

    const validate = (values) => {
        const errors = {}

        if(!values.temperature){
            errors.temperature = "Enter Temperature"
        }

        if(!values.pulse){
            errors.pulse = "Enter Pulse"
        }

        if(!values.symptoms){
            errors.symptoms = "Enter Symptoms"
        }

        if(!values.oxygen_level){
            errors.oxygen_level = "Enter Oxygen Level"
        }

        if(!values.blood_pressure){
            errors.blood_pressure = "Enter Blood Pressure"
        }

        if(!values.diagnosis){
            errors.diagnosis = "Enter Diagnosis"
        }

        if(!values.prescripton){
            errors.prescripton = "Enter Prescription"
        }

        if(!values.remark){
            errors.remark = "Enter Remarks or NA if not applicable"
        }

        return errors
    }

    return (
        <div>
            <DoctorNavbar />
            <Bbutton onClick={e => navigate('/examinePage')}><ArrowBack/>BACK</Bbutton>
            <Container>
                <Title>EXAMINE PATIENT</Title>
                <Form onSubmit={e => submitHandler(e)}>
                    <Field>
                        <Label>Temperature(F):-</Label>
                        <Input onChange={e => changeHandler(e)} type="number" name='temperature' value={data.temperature} placeholder='Temperature' />
                        <Validate>{formErrors.temperature}</Validate>
                    </Field>
                    <Field>
                        <Label>Pulse:-</Label>
                        <Input onChange={e => changeHandler(e)} type="number" name='pulse' value={data.pulse} placeholder='Pulse' />
                        <Validate>{formErrors.pulse}</Validate>
                    </Field>
                    <Field>
                        <Label>Symptoms:-</Label>
                        <Input onChange={e => changeHandler(e)} type="text" name='symptoms' value={data.symptoms} placeholder='Symptoms' />
                        <Validate>{formErrors.symptoms}</Validate>
                    </Field>
                    <Field>
                        <Label>Oxygen Level(%):-</Label>
                        <Input onChange={e => changeHandler(e)} type="number" name='oxygen_level' value={data.oxygen_level} placeholder='Oxygen Level' />
                        <Validate>{formErrors.oxygen_level}</Validate>
                    </Field>
                    <Field>
                        <Label>Blood Pressure:-</Label>
                        <Input onChange={e => changeHandler(e)} type="number" name='blood_pressure' value={data.blood_pressure} placeholder='Blood Pressure' />
                        <Validate>{formErrors.blood_pressure}</Validate>
                    </Field>
                    <Field>
                        <Label>Diagnosis:-</Label>
                        <Input onChange={e => changeHandler(e)} type="text" name='diagnosis' value={data.diagnosis} placeholder='Diagnosis' />
                        <Validate>{formErrors.diagnosis}</Validate>
                    </Field>
                    <Field>
                        <Label>Prescription:-</Label>
                        <Textarea onChange={e => changeHandler(e)} name='prescripton' value={data.prescripton} placeholder='Prescription' />
                        <Validate>{formErrors.prescripton}</Validate>
                    </Field>
                    <Field>
                        <Label>Remark:-</Label>
                        <Textarea onChange={e => changeHandler(e)} name='remark' value={data.remark} placeholder='Remark' />
                        <Validate>{formErrors.remark}</Validate>
                    </Field>

                    <Button type='submit'>SUBMIT</Button>
                </Form>
            </Container>
        </div>
    )
}

export default AddReport