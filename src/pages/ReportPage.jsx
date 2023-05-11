import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import VisibilityIcon from '@mui/icons-material/Visibility';
import PatientNavbar from '../components/PatientNavbar';
import { Link, useNavigate } from 'react-router-dom';
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

const Abutton = styled.button`
    background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;

    &:hover{
        color: aqua;
    }
`

const Nodata = styled.h3`
    margin-top: 150px;
    text-align: center;
`

const ReportPage = () => {

    const navigate = useNavigate()
    const [reports, setReports] = useState([])
    const [dataExists, setDataExists] = useState(false)

    sessionStorage.removeItem('reportId')

    const actionHandler = (reportId) => {
        sessionStorage.setItem('reportId',reportId)
        navigate('/viewPatientReport')
    }

    const getReports = async (id) => {
        const response = await axios.get(`http://localhost:8080/getReportsByPatientId/${id}`)
        console.log(response.data)
        setReports(response.data)
        if (response.data.length !== 0) {
            setDataExists(true)
        }
    }

    useEffect(() => {
        if (!sessionStorage.getItem('patientId')) {
            navigate('/patientLogin')
        }
        else {
            const patientId = sessionStorage.getItem('patientId');
            getReports(patientId)
        }
    }, [])

    return (
        <Container>
            <PatientNavbar />
            <Title>My Reports</Title>
            {
                dataExists ?
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
                                {
                                    reports.map(report => (
                                        <tr key={report.report_id}>
                                            <td>{report.appointment.date}</td>
                                            <td>{report.appointment.slot.start_time}</td>
                                            <td><Abutton onClick={e => actionHandler(report.report_id)}><VisibilityIcon /></Abutton></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </TableContainer>
                    :
                    <Nodata>No Data Available</Nodata>
            }
        </Container>
    )
}

export default ReportPage