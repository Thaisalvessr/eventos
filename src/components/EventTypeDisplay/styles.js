import styled from 'styled-components'
export const EventContainer = styled.div` 
width: 20%;
max-width: 8rem;
text-align: center;
font-size: 1.2rem;  

img {
    width: 100%;
    border-radius: 50%;
}

color: ${(props)=>props.ativo ? props.theme.blue : props.theme.cinza}
`
