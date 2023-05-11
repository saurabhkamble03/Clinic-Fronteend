import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
`

const Elabel = styled.label`
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
`

const UsernameError = styled.h3`
    color: red;
`

const PatientLogin = () => {

    // const [userName , setUserName] = useState("")
    // const [password , setPassword] = useState("")

    const initialValues = {
        username: "",
        password: ""
    }

    sessionStorage.removeItem("patientId")

    const [data, setData] = useState(initialValues);
    const [validation, setValidation] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate();

    function changeHandler(e) {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    function submitForm(e) {
        e.preventDefault();
        if (data.username.length == 0 || data.password.length == 0) {
            setValidation(true);
        }
        axios.get(`http://localhost:8080/checkUser/${data.username}`)
            .then(res => {
                // console.log(res)
                console.log(res.data)
                console.log(data)

                if (res.data) {
                    axios.post(`http://localhost:8080/patientLogin`,
                        {
                            username : data.username,
                            password : data.password
                        })
                        .then(response => {
                            console.log(response.data)
                            console.log(data)
                            if(response.data){
                                axios.get(`http://localhost:8080/getIdByUsername/${data.username}`)
                                .then(resp =>{
                                    const patientId = resp.data;
                                    sessionStorage.setItem("patientId",patientId);
                                })
                                .catch(err =>{
                                    console.log(err)
                                })
                                
                                navigate("/patientHomePage")
                            }
                            else{
                                setError('invalid credentials')
                            }
                        })
                        .catch(err => {
                            console.error(err)
                        })
                }
                else {
                    setError("username not found")
                    throw Error("Username does not exist")
                }
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <Container>
            <Title>Patient Login</Title>
            {error == 'username not found' ? <UsernameError>Invalid Username</UsernameError> : ""}
            {error == 'invalid credentials' ? <UsernameError>Invalid Credentials</UsernameError> : ""}
            <Credentials>
                <Form onSubmit={(e) => submitForm(e)}>
                    <div>
                        <Input onChange={(e) => changeHandler(e)} type="text" placeholder='Username' name='username' />
                        {validation && data.username <= 0 ? <Elabel>Enter Username</Elabel> : ""}
                    </div>
                    <div>
                        <Input onChange={(e) => changeHandler(e)} type="password" placeholder='Password' name='password' />
                        {validation && data.password <= 0 ? <Elabel>Enter Password</Elabel> : ""}
                    </div>
                    <Button type='submit'>SUBMIT</Button>
                    <div>Don't have an account?<Link to="/patientRegister">SIGN UP</Link></div>
                </Form>
            </Credentials>
        </Container>
    )
}

export default PatientLogin