import React, { useState, useEffect,useRef, FormEvent} from "react";
import Scheduler from "react-mui-scheduler";
import { api } from "../service/api";
import './pages.css'
import { FiTrash } from "react-icons/fi";

interface EventosProps {
  id: string;
  titulo: string;
  horario: string;
  descricao: string;
  data:string;
}

export default function App() {
  const [eventos, setEventos] = useState<EventosProps[]>([]);
  const tituloRef = useRef<HTMLInputElement|null>(null)
  const descricaoRef = useRef<HTMLInputElement|null>(null)
  const horarioEventoRef = useRef<HTMLInputElement|null>(null)
  const dataEventoRef= useRef<HTMLInputElement | null>(null)
 

  useEffect(() => {
    listarEventos();
  }, []);

  async function listarEventos() {
    try {
      const response = await api.get("/evento");
      setEventos(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  }

  const [state, setState] = useState({
    options: {
      transitionMode: "zoom",
      startWeekOn: "mon",
      defaultMode: "Month",
      minWidth: 500,
      maxWidth: 500,
      minHeight: 540,
      maxHeight: 540
    },
    alertProps: {
      open: false,
      color: "info",
      severity: "info",
      showActionButton: false,
      showNotification: false,
      delay: 1500
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true
    }
  });
 
  async function handleSubmit(event:FormEvent){
    event.preventDefault();

    if(!tituloRef.current?.value ||!horarioEventoRef.current?.value ||
      !descricaoRef.current?.value || !dataEventoRef.current?.value) return;

    const response = await api.post("/evento",{
      titulo: tituloRef.current?.value,
      horario: horarioEventoRef.current?.value,
      descricao: descricaoRef.current?.value,
      data:dataEventoRef.current?.value

    })
    setEventos(allEventos=>[...allEventos, response.data])
    
   
  }

async function DeleteEvento(id:string) {
  try{
    await api.delete("/evento",{
      params:{
        id:id
      }
    })
const allEventos=eventos.filter((eventos)=>eventos.id !==id)
setEventos(allEventos)
  }catch(err){
    console.log(err)
  }

  
}
  return (
    <div className="viewPrinpipal">
      <div className="viewAddEventos">
        <form className="form"onSubmit={handleSubmit}>
        <h1 className="h1">
            CADASTRA UM NOVO EVENTO
          </h1>
          <label className="label"> Titulo: </label>
          <input 
          type="text"
          placeholder="Adicionar Titulo"
          className="input"
          ref={tituloRef}
          />
           <label className="label"> Decrição: </label>
          <input 
          type="text"
          placeholder="Adicionar Descrição"
          className="input"
          ref={descricaoRef}
          />
          <label className="label"> Data: </label>
          <input 
          type="date"
          className="input"
          ref={dataEventoRef}

          />
          <label className="label"> Horario de Inicio </label>
          <input 
          type="time"
          className="input"
          ref={horarioEventoRef}
          /> 
        <input 
        className="submit"
        type="submit" value={"Criar"}>
        </input>  
        </form>
      <section className="section"> 
          {eventos.map((evento)=>(
            <article className="article" key={evento.id}>
            <p><span className="span">Titulo: </span>{evento.titulo}</p>
            <p><span className="span">Descrição: </span>{evento.descricao}</p>
            <p><span className="span">Horario: </span>{evento.horario}</p>
            <p><span className="span">Data: </span>{evento.data}</p>
            <button className="buttonDelete"
            onClick={()=>DeleteEvento(evento.id)}
            >
              <FiTrash size={10}color="FFF"/>
            </button>
          </article>     
          ))} 
      </section>  
      </div>
      <div className="viewCalendario">
      <Scheduler
        locale="pt-BR"
        events={eventos.map(evento => ({
          id: evento.id,  
          label: evento.titulo,
          groupLabel: evento.descricao,
          startHour: evento.horario,
          date: evento.data,
        }))}
        legacyStyle={false  }
        options={state.options}
        alertProps={state.alertProps}
        toolbarProps={state.toolbarProps}      
      />
      </div>
      
    </div>
  );
}
