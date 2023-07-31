import { Header } from '../../components/Header'
import { useNavigate, NavLink, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import './styles.css'
import { CaretLeft } from 'phosphor-react'
import './styles.css'
import { EventContext } from '../../context/EventContext'
import { formatDate } from '../../utils/formatDate'

export function EventDetails() {
    const navigate = useNavigate()
    const { eventos, editarEvento } = useContext(EventContext)
    const { id } = useParams()
    const [nome, setNome] = useState("")
    const [dataInicial, setDataInicial] = useState("")
    const [dataFinal, setDataFinal] = useState("")
    const [descricao, setDescricao] = useState("")
    const [img, setImg] = useState("")

    function handleUploadIMG(e) {
        const reader = new FileReader();

        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => setImg(reader.result)
    }
    /* 
    id é o nome do paramentro dinamico desta rota, o que o usuario passar na rota, 
    independente do valor que seja vai ser captado aqui e rpresentado por esta variavel id 
    */

    const evento = eventos.find(evento => evento.id === Number(id))

    function handleEditarEvento(e) {
        e.preventDefault()

        const eventosAtualizado = {
            id,
            nome,
            dataInicial: formatDate(dataInicial),
            dataFinal: formatDate(dataFinal),
            img,
            descricao
        }

        editarEvento(eventosAtualizado)
    }

    useEffect(() => {
        if(!evento) {
            navigate('/')
        }
    }, [])

    if(!evento) {
        return <></>
    }

    return (
        <>
        <Header />
            <h1 className="titulo-detalhes-evento">Detalhes do evento</h1>

            <NavLink className="voltar" to="/">
                <CaretLeft size={24} />
                Voltar para o início
            </NavLink>

            <div className="container-detalhes-evento">
                <img src={evento.img} />

                <div>
                    <h2>{evento.nome}</h2>
                    <p className="data-evento">Inicial: {evento.dataInicial}</p>
                    <p className="data-evento">Final: {evento.dataFinal}</p>

                    <p>{evento.descricao}</p>                   
                </div>

        <form onSubmit={handleEditarEvento}>
          <div>
            <label htmlFor='nome'>Nome</label>
            <input 
              type='text' 
              id='nome' 
              onChange={(e) => setNome(e.target.value)} 
              />
          </div>
          <div>
            <label htmlFor='data'>Data Inicial</label>
            <input 
              type='datetime-local' 
              id='data_inicial' 
              onChange={(e) => { setDataInicial(e.target.value)}} 
              />
          </div>
          <div>
            <label htmlFor='data'>Data Final</label>
            <input 
              type='datetime-local' 
              id='data_final' 
              onChange={(e) => { setDataFinal(e.target.value)}} 
              />
          </div>
          <div>
            <label htmlFor='descricao'>Descrição</label>
            <input 
              type='text' 
              id='descricao' 
              onChange={(e) => { setDescricao(e.target.value)}} 
            />
          </div>
          <div className='label-imagem'>
            <label htmlFor='imagem'>Selecione a imagem do evento</label>
            <input onChange={handleUploadIMG} type='file' id='imagem' />
          </div>
          
          <div className='preview-imagem'>
            <img style={{display: img ? 'block' : 'none'}} src={img} alt='preview da imagem do evento' />
          </div>

          <button>Editar evento</button>
        </form>
            </div>
        </>
    )
}