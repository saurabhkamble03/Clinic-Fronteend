import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0px 200px;
    `

const Title = styled.h1`
    margin-top: 10px;
    `

const Form = styled.form`
    margin-top: 50px;
    `

const Validate = styled.p`
    color: red;
`

const PatientRegister = () => {
    const url = "http://localhost:8080/addPatient";
    const navigate = useNavigate();

    // const [error,setError] = useState(false);

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

    const [data, setData] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    function changeHandler(e) {
        // e.preventDefault();
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
        // console.log(newData)
    }

    const patientData = {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        occupation: data.occupation,
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        mobile_no: data.mobile_no,
        state: data.state,
        city: data.city,
        zip_code: data.zip_code,
        street: data.street,
        password: data.password
    }


    const submitForm = (e) => {
        e.preventDefault();
        setFormErrors(validate(data))
        setIsSubmit(true)
        console.log(formErrors.length)
        console.log(formErrors)
        console.log("isSubmit ", isSubmit)

    }

    const registerPatient = async () => {
            await axios.post(url,patientData)
                .then(res => {
                    console.log("Succesfully Created : ", res.data)
                    console.log(data)

                    if (res.data) {
                        navigate("/patientLogin")
                    }
                })
                .catch(err => {
                    // Handle errors
                    console.error(err);
                });
    }

    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(data)
            registerPatient();
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {}

        if (!values.first_name) {
            errors.first_name = "First Name is required"
        }
        if (!values.last_name) {
            errors.last_name = "Last Name is required"
        }
        if (!values.username) {
            errors.username = "Username is required"
        }
        if (!values.email) {
            errors.email = "Email is required"
        }
        if (!values.occupation) {
            errors.occupation = "Occupation is required"
        }
        if (!values.age) {
            errors.age = "Age is required"
        }
        if (!values.gender) {
            errors.gender = "Gender is required"
        }
        if (!values.height) {
            errors.height = "Height is required"
        }
        if (!values.weight) {
            errors.weight = "Weight is required"
        }
        if (!values.mobile_no) {
            errors.mobile_no = "Mobile No is required"
        }
        if (!values.state) {
            errors.state = "State is required"
        }

        if(values.state === "Not Selected"){
            errors.state = "Choose a state"
        }

        if (!values.city) {
            errors.city = "City is required"
        }
        if (!values.street) {
            errors.street = "Street is required"
        }
        if (!values.zip_code) {
            errors.zip_code = "Zip Code is required"
        }
        if (!values.password) {
            errors.password = "Password is required"
        }
        if (!values.confirm_password) {
            errors.confirm_password = "Confirm Password is required"
        }

        if(values.password != values.confirm_password){
            errors.confirm_password = "Password not matched"
        }

        return errors
    };

    return (
        <Container>
            <Title>REGISTRATION</Title>
            <Form onSubmit={(e) => submitForm(e)}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>First Name</label>
                        <input onChange={(e) => changeHandler(e)} value={data.first_name} type="text" className="form-control" name="first_name" minLength="1" placeholder="First Name" />
                        <Validate>{formErrors.first_name}</Validate>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input onChange={(e) => changeHandler(e)} value={data.last_name} type="text" className="form-control" name="last_name" placeholder="Last Name" />
                        <Validate>{formErrors.last_name}</Validate>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Username</label>
                        <input onChange={(e) => changeHandler(e)} value={data.username} type="text" className="form-control" name="username" placeholder="Username" />
                        <Validate>{formErrors.username}</Validate>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input onChange={(e) => changeHandler(e)} value={data.email} type="email" className="form-control" name="email" placeholder="Email" />
                        <Validate>{formErrors.email}</Validate>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Occupation</label>
                        <input onChange={(e) => changeHandler(e)} value={data.occupation} type="text" className="form-control" name="occupation" placeholder="Occupation" />
                        <Validate>{formErrors.occupation}</Validate>
                    </div>
                    <div className="form-group col-md-2">
                        <label>Age</label>
                        <input onChange={(e) => changeHandler(e)} value={data.age} type="number" className="form-control" name="age" />
                        <Validate>{formErrors.age}</Validate>
                    </div>
                    <div className="form-group col-md-2">
                        <label>Gender</label>
                        <input onChange={(e) => changeHandler(e)} value={data.gender} type="text" className="form-control" name="gender" placeholder='Gender' />
                        <Validate>{formErrors.gender}</Validate>
                    </div>

                    <div className="form-group col-md-2">
                        <label>Height(cm)</label>
                        <input onChange={(e) => changeHandler(e)} value={data.height} type="number" className="form-control" name="height" />
                        <Validate>{formErrors.height}</Validate>
                    </div>
                    <div className="form-group col-md-2">
                        <label>Weight(kg)</label>
                        <input onChange={(e) => changeHandler(e)} value={data.weight} type="number" className="form-control" name="weight" />
                        <Validate>{formErrors.weight}</Validate>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Mobile</label>
                        <input onChange={(e) => changeHandler(e)} value={data.mobile_no} type="text" className="form-control" name="mobile_no" placeholder="Mobile" />
                        <Validate>{formErrors.mobile_no}</Validate>
                    </div>
                    <div className="form-group col-md-4">
                        <label>State</label>
                        <select onChange={(e) => changeHandler(e)} value={data.state} name="state" className="form-control">

                            <option value="Not Selected">Choose an option</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                        <Validate>{formErrors.state}</Validate>
                    </div>
                    <div className="form-group col-md-6">
                        <label>City</label>
                        <input onChange={(e) => changeHandler(e)} value={data.city} type="text" className="form-control" name="city" placeholder='City' />
                        <Validate>{formErrors.city}</Validate>
                    </div>
                    <div className="form-group col-md-2">
                        <label>Zip</label>
                        <input onChange={(e) => changeHandler(e)} value={data.zip_code} type="text" className="form-control" name="zip_code" />
                        <Validate>{formErrors.zip_code}</Validate>
                    </div>
                </div>
                <div className="form-group">
                    <label>Street</label>
                    <input onChange={(e) => changeHandler(e)} value={data.street} type="text" className="form-control" name="street" placeholder="eg:- 1234 Main St" />
                    <Validate>{formErrors.street}</Validate>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Password</label>
                        <input onChange={(e) => changeHandler(e)} value={data.password} type="password" className="form-control" name="password" placeholder="Password" />
                        <Validate>{formErrors.password}</Validate>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Confirm Password</label>
                        <input onChange={(e) => changeHandler(e)} type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" />
                        <Validate>{formErrors.confirm_password}</Validate>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">REGISTER</button>
            </Form>
        </Container>
    )
}

export default PatientRegister