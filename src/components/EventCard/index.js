import { PencilCircle, Trash } from "phosphor-react"
import { useNavigate } from 'react-router-dom'
import "./styles.css"
import { useContext } from "react"
import { EventContext } from "../../context/EventContext"

export function EventCard({img, id, nome, dataInicial, dataFinal, descricao}) {
    const { deletarEvento } = useContext(EventContext)
    const navigate = useNavigate()
    
    function navegarParaDetalhes() {
        navigate(`/eventos/${id}`)
    }
    
    /* if(!img || !dataInicial || !nome) {
        return;
    } */

    return (
        <div className='card-evento'>
            <img src={img} alt='' />

            <div className='infos-evento'>
                <div>
                    <h2>{nome}</h2>
                    <p>{descricao}</p> 

                    <button onClick={navegarParaDetalhes}>Ver detalhes</button>

                    <p>Inicial: {dataInicial}</p>
                    <p>Final: {dataFinal}</p>
                </div>

                <div>
                    <button onClick={() => deletarEvento(id)}>
                        <Trash size={24} />
                    </button>
                    <button>
                        <PencilCircle size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}