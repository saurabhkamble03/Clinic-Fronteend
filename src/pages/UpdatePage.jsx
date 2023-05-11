import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PatientNavbar from '../components/PatientNavbar'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    margin-top: 10px;
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

const Bbutton = styled.button`
    margin-top: 20px;
    margin-left: 50px;
    cursor: pointer;
`

const Validate = styled.p`
    color: red;
`

const UpdatePage = () => {

    const navigate = useNavigate()

    const initialValues = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        occupation: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        mobile_no: "",
        state: "",
        city: "",
        zip_code: "",
        street: "",
        password: "",
    }

    const [details, setDetails] = useState(initialValues)
    const [isSubmit, setIsSubmit] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    // const [updatedData,setUpdatedData] = useState(details)
    // console.log("Updated",updatedData)

    const changeHandler = (e) => {
        const { name, value } = e.target
        setDetails({ ...details, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setIsSubmit(true)
        setFormErrors(validate(details))
    }

    const validate = (values) => {

        const errors = {}

        if (!values.first_name) {
            errors.first_name = 'First Name is required'
        }
        if (!values.last_name) {
            errors.last_name = 'Last Name is required'
        }
        if (!values.age) {
            errors.age = 'Age is required'
        }
        if (!values.height) {
            errors.height = ' Height is required'
        }
        if (!values.weight) {
            errors.weight = ' Weight is required'
        }
        if (!values.mobile_no) {
            errors.mobile_no = 'Mobile No is required'
        }
        if (!values.state) {
            errors.state = 'State is required'
        }
        if (!values.city) {
            errors.city = 'City is required'
        }
        if (!values.zip_code) {
            errors.zip_code = 'Zip Code is required'
        }
        if (!values.email) {
            errors.email = 'Email is required'
        }

        return errors
    }

    const getPatientDetails = async (patientId) => {

        try {
            const res = await axios.get(`http://localhost:8080/getPatient/${patientId}`)
            console.log("Patient Details : ", res.data)
            setDetails(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const updatePatient = async (patientId, patientDetails) => {

        try {
            const res = await axios.put(`http://localhost:8080/updatePatient/${patientId}`, patientDetails)

            console.log("Succesfully Updated ", res.data)
            console.log(details)

            if (res.data) {
                await getPatientDetails(patientId)
                console.log('Successfully Updated')
                navigate("/patientProfile")
            }

        } catch (error) {
            console.log(error)
        }
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

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const patientId = sessionStorage.getItem('patientId');
            getPatientDetails(patientId);
            updatePatient(patientId, details)
            setIsSubmit(false)
        }
    }, [isSubmit, details, formErrors])


    return (
        <div>
            <PatientNavbar />
            <Link to="/patientProfile"><Bbutton>BACK</Bbutton></Link>
            <Container>
                <Title>UPDATE PROFILE</Title>
                <Form onSubmit={(e) => submitHandler(e)}>
                    <Field>
                        <Label>First Name:-</Label>
                        <Input type="text" name='first_name' onChange={(e) => changeHandler(e)} value={details.first_name} placeholder="First Name" />
                        <Validate>{formErrors.first_name}</Validate>
                    </Field>
                    <Field>
                        <Label>Last Name:-</Label>
                        <Input type="text" name='last_name' onChange={(e) => changeHandler(e)} value={details.last_name} placeholder="Last Name" />
                        <Validate>{formErrors.last_name}</Validate>
                    </Field>
                    <Field>
                        <Label>Age:-</Label>
                        <Input type="number" name='age' onChange={(e) => changeHandler(e)} value={details.age} placeholder="Age" />
                        <Validate>{formErrors.age}</Validate>
                    </Field>
                    <Field>
                        <Label>Height(cm):-</Label>
                        <Input type="number" name='height' onChange={(e) => changeHandler(e)} value={details.height} placeholder="Height" />
                        <Validate>{formErrors.height}</Validate>
                    </Field>
                    <Field>
                        <Label>Weight(kg):-</Label>
                        <Input type="number" name='weight' onChange={(e) => changeHandler(e)} value={details.weight} placeholder="Weight" />
                        <Validate>{formErrors.weight}</Validate>
                    </Field>
                    <Field>
                        <Label>Mobile No:-</Label>
                        <Input type="text" name='mobile_no' onChange={(e) => changeHandler(e)} value={details.mobile_no} placeholder="Mobile No" />
                        <Validate>{formErrors.mobile_no}</Validate>
                    </Field>
                    <Field>
                        <Label>State:-</Label>
                        <Input type="text" name='state' onChange={(e) => changeHandler(e)} value={details.state} placeholder="State" />
                        <Validate>{formErrors.state}</Validate>
                    </Field>
                    <Field>
                        <Label>City</Label>
                        <Input type="text" name='city' onChange={(e) => changeHandler(e)} value={details.city} placeholder="City" />
                        <Validate>{formErrors.city}</Validate>
                    </Field>
                    <Field>
                        <Label>Zip Code</Label>
                        <Input type="text" name='zip_code' onChange={(e) => changeHandler(e)} value={details.zip_code} placeholder="Zip Code" />
                        <Validate>{formErrors.zip_code}</Validate>
                    </Field>
                    <Field>
                        <Label>Email</Label>
                        <Input type="email" name='email' onChange={(e) => changeHandler(e)} value={details.email} placeholder="Email" />
                        <Validate>{formErrors.email}</Validate>
                    </Field>
                    <Button type='submit'>UDPATE</Button>
                </Form>
            </Container>
        </div>
    )
}

export default UpdatePage