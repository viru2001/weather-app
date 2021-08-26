import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const Icon = styled.img`
    width: 40%;
`
const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-left:2vw;
    font-size: large;
`

function MoreDetails(props) {
    return (
        <Container>
            <Icon src={props.url} alt={`${props.title} icon`} />
            <Content>
                <span><strong>{props.title}</strong></span>
                <span>{props.value}</span>
            </Content>
        </Container>
    )
}

export default MoreDetails
