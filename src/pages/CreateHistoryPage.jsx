import React, { useState } from 'react'
import styled from 'styled-components'
import PatientNavbar from '../components/PatientNavbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

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

const Validate = styled.p`
    color: red;
`

const CreateHistoryPage = () => {

  const initialValues = {
    illness: "",
    allergy: "",
    dieting: "",
    surgery: "",
    sleep: "",
    stress: "",
    drink: "",
    blood: "",
    other_doctor_problems: ""
  }

  const patientId = sessionStorage.getItem('patientId');

  const navigate = useNavigate();
  const [data, setData] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors,setFormErrors] = useState({})

  const changeHandler = (e) => {
    const newData = { ...data }
    newData[e.target.name] = e.target.value
    setData(newData)
  }

  const historyData = {
    patient: {
      patient_id: patientId
    },
    illness: data.illness,
    allergy: data.allergy,
    dieting: data.dieting,
    surgery: data.surgery,
    sleep: data.sleep,
    drink: data.sleep,
    stress: data.stress,
    blood: data.blood,
    other_doctor_problems: data.other_doctor_problems
}

const submitForm = (e) => {
  e.preventDefault()
  setFormErrors(validate(data))
  setIsSubmit(true)
}

const createHistory = async () => {
  try{
    const response = await axios.post(`http://localhost:8080/addHistory`, historyData)
    console.log(response.data)
    if(response.data){
      navigate('/addAppointment')
    }
  }
  catch(e){
    console.log(e)
  }

}

useEffect(() => {
  if (!sessionStorage.getItem('patientId')) {
    navigate('/patientLogin')
  }
  else {
    const patientId = sessionStorage.getItem('patientId');
  }
}, [])

useEffect(() => {
  if (Object.keys(formErrors).length ===0 && isSubmit) {
    createHistory()
  }
}, [isSubmit,formErrors])

const validate = (values) => {
  const errors = {}

  if(!values.illness){
    errors.illness = "Enter Illness or Enter NA if not applicable"
  }

  if(!values.allergy){
    errors.allergy = "Enter Allergy or Enter NA if not applicable"
  }

  if(!values.dieting){
    errors.dieting = "Enter Dieting status"
  }

  if(!values.surgery){
    errors.surgery = "Enter Surgery status"
  }

  if(!values.sleep){
    errors.sleep = "Enter Sleep status"
  }

  if(!values.drink){
    errors.drink = "Enter Drinking status"
  }

  if(!values.stress){
    errors.stress = "Enter Stress status"
  }

  if(!values.blood){
    errors.blood = "Enter Blood Transfusion status"
  }

  if(!values.other_doctor_problems){
    errors.other_doctor_problems = "Enter previous problems or NA in case you dont have any"
  }

  return errors
}

return (
  <div>
    <PatientNavbar />
    <Container>
      <Title>HISTORY</Title>
      <Form onSubmit={e => submitForm(e)}>
        <Field>
          <Label>Illness:-</Label>
          <Input onChange={e => changeHandler(e)} type="text" name='illness' value={data.illness} placeholder='Illness' />
          <Validate>{formErrors.illness}</Validate>
        </Field>
        <Field>
          <Label>Allergy:-</Label>
          <Input onChange={e => changeHandler(e)} type="text" name='allergy' value={data.allergy} placeholder='Allergy' />
          <Validate>{formErrors.allergy}</Validate>
        </Field>
        <Field>
          <Label>Dieting:-</Label>
          <Input onChange={e => changeHandler(e)} type="text" name='dieting' value={data.dieting} placeholder='Dieting' />
          <Validate>{formErrors.dieting}</Validate>
        </Field>
        <Field>
          <Label>Surgery:-</Label>
          <Input onChange={e => changeHandler(e)} type="text" name='surgery' value={data.surgery} placeholder='Surgery' />
          <Validate>{formErrors.surgery}</Validate>
        </Field>
        <Field>
          <Label>Do you have trouble sleeping?:-</Label>
          <Input onChange={e => changeHandler(e)} type="text" name='sleep' value={data.sleep} placeholder='Sleep' />
          <Validate>{formErrors.sleep}</Validate>
        </Field>
        <Field>
          <Label>Do you drink?:-</Label>
          <Input onChange={e => changeHandler(e)} type="text" name='drink' value={data.drink} placeholder='Drink' />
          <Validate>{formErrors.drink}</Validate>
        </Field>
        <Field>
          <Label>Do you feel Stressed?:-</Label>
          <Input onChange={e => changeHandler(e)} type="text" name='stress' value={data.stress} placeholder='Stress' />
          <Validate>{formErrors.stress}</Validate>
        </Field>
        <Field>
          <Label>Have you done blood transfusion before?:-</Label>
          <Input onChange={e => changeHandler(e)} type="text" name='blood' value={data.blood} placeholder='Blood' />
          <Validate>{formErrors.blood}</Validate>
        </Field>
        <Field>
          <Label>Other Problems:-</Label>
          <Input onChange={e => changeHandler(e)} type="text" name='other_doctor_problems' value={data.other_doctor_problems} placeholder='Other Problems' />
          <Validate>{formErrors.other_doctor_problems}</Validate>
        </Field>
        <Button>SUBMIT</Button>
      </Form>
    </Container>
  </div>
)
}

export default CreateHistoryPage