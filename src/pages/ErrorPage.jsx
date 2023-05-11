import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Container2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Heading = styled.h1`
    margin-top: 10%;
    color: red;
`

const Para = styled.p`
    margin-top: 30px;
    font-size: 25px;
`

const ErrorPage = () => {
    return (
        <>
            <Container>
                <Heading>404 Not Found</Heading>
            </Container>
            <Container2>
                <Para>Sorry, the page you are looking for don't exist</Para>
            </Container2>
        </>
    )
}

export default ErrorPage