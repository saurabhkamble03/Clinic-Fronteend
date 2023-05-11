import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';

const Container = styled.div`
    display: flex;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Logo = styled.h1``

const Desc = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    color: white;
    border-radius: 50%;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 20px;
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>SSS</Logo>
                <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias itaque,
                    ab, quibusdam, nostrum magnam accusantium obcaecati rem dolore dolorem
                    facere aspernatur architecto! Autem nihil, fugit nulla quae illum saepe iure?
                </Desc>
                <SocialContainer>
                    <SocialIcon color='3B5999'>
                        <FacebookIcon/>
                    </SocialIcon>
                    <SocialIcon color='E4405F'>
                        <InstagramIcon/>
                    </SocialIcon>
                    <SocialIcon color='55ACEE'>
                        <TwitterIcon/>
                    </SocialIcon>
                    <SocialIcon color='E60023'>
                        <PinterestIcon/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>My Reports</ListItem>
                    <ListItem>Book Apointment</ListItem>
                    <ListItem>View Appointment</ListItem>
                    <ListItem>Profile</ListItem>
                    <ListItem>Update Profile</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <FmdGoodIcon style={{ marginRight:"10px"}}/> 622 Dixie Path , South Tobinchester 98336
                </ContactItem>
                <ContactItem>
                    <PhoneIcon style={{ marginRight:"10px"}}/> +1 234 56 78 90
                </ContactItem>
                <ContactItem>
                    <AlternateEmailOutlinedIcon style={{ marginRight:"10px"}}/> contact@myclinic.inl
                </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer