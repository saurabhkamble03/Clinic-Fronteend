import React from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000060
`

const NavItems = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Header = styled.div`
    flex: 1;
    margin-left: 20px;
    font-size: 25px;
    font-weight: 800;
    width: 50px;
`
const MenuItems = styled.div`
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin-right: 30px;
`

const NavLink = styled(Link)`
    color: black;
`

const PatientNavbar = () => {
    return (
        <Container>
            <Header>MY CLINIC</Header>
            <NavItems>
                <MenuItems><NavLink to="/patientHomePage">Home</NavLink></MenuItems>
                <MenuItems><NavLink to="/myReports">Reports</NavLink></MenuItems>
                <MenuItems><NavLink to="/addAppointment">Book Appointment</NavLink></MenuItems>
                <MenuItems><NavLink to="/myAppointment">View Appointments</NavLink></MenuItems>
                <MenuItems>About Us</MenuItems>
                <MenuItems><NavLink to="/patientProfile"><AccountCircleIcon/></NavLink></MenuItems>
                <MenuItems><NavLink to="/patientLogin"><LogoutIcon/></NavLink></MenuItems>
            </NavItems>
        </Container>
    )
}

export default PatientNavbar