import './styles.css';
import { Header } from '../../components/Header';
import { EventCard } from '../../components/EventCard';
import { useContext, useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { EventTypeDisplay } from '../../components/EventTypeDisplay';
import { eventsTypes } from '../../data/events-type';
import { EventContext } from '../../context/EventContext';

/* Atualizei as importações para incluir mais um '../'
pois agora preciso sair de mais uma pasta para chegar
nos arquivos desejados */

/* não pode modificar a variavel em tempo rodando */


export function Home() {
  const { eventos, criarNovoEvento, apagarTudo } = useContext(EventContext)


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

  function handleCriarEvento(e) {
    e.preventDefault()

    const novoEvento = {

      nome, 
      dataInicial: formatDate(dataInicial), 
      dataFinal: formatDate(dataFinal),
      img,
      descricao
    }

    criarNovoEvento(novoEvento)
    
    setImg('')
    e.target.reset() //limpar os campos do formulario
  }

 
  return (
    <> {/* o fragmento serve para envolver meus elementos html para que eles 
    tenham um pai presente */}

      <Header />

      <h1 className='home-title'>Bem vindo ao site de eventos!</h1>
      <button onClick={apagarTudo}>Apagar tudo</button>

      <div className='event-types'>
        {eventsTypes.map(eventType => {
          return (
            <EventTypeDisplay ativo = {true}
              key={eventType.name}
              name={eventType.name}
              photo={eventType.photo}
            />
          )
        })}
      </div>

      <section className='container'>
        <form onSubmit={handleCriarEvento}>
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

          <button>Cadastrar evento</button>
        </form>

        <div className='container-eventos'>

          {eventos.map(evento => {
            return (
              <EventCard 
                key={evento.id}
                id={evento.id}
                nome={evento.nome}
                dataInicial={evento.dataInicial}
                dataFinal={evento.dataFinal}
                img={evento.img}
                descricao={evento.descricao} //mudei aqui
              />
            )
          })}

        </div>
      </section>
    </>
  );
}

/* export App; */
