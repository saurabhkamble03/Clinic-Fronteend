import React from 'react'
import styled from 'styled-components'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000060
`

const NavItems = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Header = styled.span`
    flex: 1;
    margin-left: 20px;
    font-size: 25px;
    font-weight: 800;
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

const DoctorNavbar = () => {

    const navigate = useNavigate()

    return (
        <Container>
            <Header>MY CLINIC</Header>
            <NavItems>
                <MenuItems><NavLink to={"/doctorHomePage"}>Home</NavLink></MenuItems>
                <MenuItems><NavLink to={"/viewAppointment"}>Appointments</NavLink></MenuItems>
                <MenuItems><NavLink to={"/doctorProfile"}>Profile</NavLink></MenuItems>
                <MenuItems><NavLink to={"/doctorLogin"}>Logout<LogoutIcon/></NavLink></MenuItems>
            </NavItems>
        </Container>
    )
}

export default DoctorNavbar