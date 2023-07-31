import './styles.css'
import { EventContainer } from './styles'

export function EventTypeDisplay(barbie) {
    return (
        <EventContainer colorText="#ccc" ativo={barbie.ativo}>
            <img src={barbie.photo} />
            <p>{barbie.name}</p>
        </EventContainer>
    )
}