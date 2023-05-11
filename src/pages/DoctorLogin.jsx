import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Title = styled.h1`
    margin-top: 80px;
`

const Credentials = styled.div`
width: 50%;
display: flex;
justify-content: center;
align-items: center;
background-color: beige;
`

const Form = styled.form`
    width: 50%;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Input = styled.input`
    width: 400px;
    padding: 5px;
    margin: 15px;
`

const Button = styled.button`
    width: 30%;
    cursor: pointer;
    margin-bottom: 10px;
`

const Eval = styled.p`
    color: red;
`

const Invalid = styled.h4`
    color: red;
`

const DoctorLogin = () => {

    const navigate = useNavigate()

    const initialValues = {
        username: "",
        password: ""
    }

    sessionStorage.removeItem("doctorId")

    const [data, setData] = useState(initialValues)
    const [validation, setValidation] = useState(false)
    const [errors, setErrors] = useState("")

    const changeHandler = (e) => {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (data.username.length === 0 || data.password.length === 0) {
            setValidation(true)
        }
        else{
            setValidation(false)
        }

        checkCredentials()
    }

    const checkCredentials = async () => {
        const response = await axios.post(`http://localhost:8080/doctorLogin`,
            {
                username : data.username,
                password : data.password
            }
        )

        if(response.data){
            const doctorId = 1
            sessionStorage.setItem('doctorId',doctorId)
            navigate('/doctorHomePage')
        }
        else{
            setErrors("Invalid Credentials")
        }
    }

    return (
        <Container>
            <Title>Doctor Login</Title>
            {errors === "Invalid Credentials" ? <Invalid>Invalid Credentials</Invalid> : ""}
            <Credentials>
                <Form onSubmit={e => submitHandler(e)}>
                    <Input onChange={e => changeHandler(e)} type="text" placeholder='Username' name='username' />
                    {validation && data.username <= 0 ? <Eval>Enter Username</Eval> : ""}
                    <Input onChange={e => changeHandler(e)} type="password" placeholder='Password' name='password' />
                    {validation && data.password <= 0 ? <Eval>Enter Password</Eval> : ""}
                    <Button type='submit'>SUBMIT</Button>
                </Form>
            </Credentials>
        </Container>
    )
}

export default DoctorLogin