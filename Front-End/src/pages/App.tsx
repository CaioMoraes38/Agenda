import React, { useState, useEffect, useRef, FormEvent } from "react";
import Scheduler from "react-mui-scheduler";
import { api } from "../service/api";
import './pages.css'
import { FiTrash, FiEdit } from "react-icons/fi"; // Importe o ícone de edição

interface EventosProps {
  id: string;
  titulo: string;
  horario: string;
  descricao: string;
  data:string;
}

export default function App() {
  const [eventos, setEventos] = useState<EventosProps[]>([]);
  const [editingEvento, setEditingEvento] = useState<EventosProps | null>(null); // Estado para controlar o evento sendo editado
  const tituloRef = useRef<HTMLInputElement|null>(null);
  const descricaoRef = useRef<HTMLInputElement|null>(null);
  const horarioEventoRef = useRef<HTMLInputElement|null>(null);
  const dataEventoRef= useRef<HTMLInputElement | null>(null);

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
      minWidth: 540,
      maxWidth: 540,
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

    try {
      if (editingEvento) {
        
        const response = await api.put("/evento/{.id}", {
          titulo: tituloRef.current?.value,
          horario: horarioEventoRef.current?.value,
          descricao: descricaoRef.current?.value,
          data: dataEventoRef.current?.value
        });
        const updatedEventos = eventos.map(evento => {
          if (evento.id === editingEvento.id) {
            return response.data;
          }
          return evento;
        });
        setEventos(updatedEventos);
        setEditingEvento(null);
      } else {
      
        const response = await api.post("/evento", {
          titulo: tituloRef.current?.value,
          horario: horarioEventoRef.current?.value,
          descricao: descricaoRef.current?.value,
          data: dataEventoRef.current?.value
        });
        setEventos([...eventos, response.data]);
      }
    } catch (error) {
      console.error("Erro ao criar/atualizar evento:", error);
    }
  }

  async function deleteEvento(id:string) {
    try {
      await api.delete(`/evento/${id}`);
      const allEventos = eventos.filter(evento => evento.id !== id);
      setEventos(allEventos);
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
    }
  }

  function startEditing(evento: EventosProps) {
    
    setEditingEvento(evento);
    tituloRef.current!.value = evento.titulo;
    descricaoRef.current!.value = evento.descricao;
    horarioEventoRef.current!.value = evento.horario;
    dataEventoRef.current!.value = evento.data;
  }

  return (
    <div className="viewPrinpipal">
      <div className="viewAddEventos">
        <form className="form"onSubmit={handleSubmit}>
          <h1 className="h1">
            {editingEvento ? 'EDITAR EVENTO' : 'CADASTRAR UM NOVO EVENTO'}
          </h1>
          <label className="label"> Titulo: </label>
          <input 
            type="text"
            placeholder="Adicionar Titulo"
            className="input"
            ref={tituloRef}
          />
          <label className="label"> Descrição: </label>
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
            type="submit" 
            value={editingEvento ? 'Salvar' : 'Criar'}
          />
        </form>
        <section className="section"> 
          {eventos.map((evento) => (
            <article className="article" key={evento.id}>
              <p><span>Titulo:</span>{evento.titulo}</p>
              <p><span>Descrição:</span>{evento.descricao}</p>
              <p><span>Horario: </span>{evento.horario}</p>
              <p><span>Data: </span>{evento.data}</p>
              <button 
                className="buttonDelete"
                onClick={() => deleteEvento(evento.id)}
              >
                <FiTrash size={15} color="FFF" />
              </button>
              <button
                className="buttonEdit" 
                onClick={() => startEditing(evento)}
              >
                <FiEdit size={15} color="FFF" />
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
          legacyStyle={false}
          options={state.options}
          alertProps={state.alertProps}
          toolbarProps={state.toolbarProps}      
        />
      </div>
    </div>
  );
}
