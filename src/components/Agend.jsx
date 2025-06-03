import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import axios from "axios";
import { Expediente } from './Expediente'
import { MostrarExpediente } from './MostrarExpediente'

const localizer = momentLocalizer(moment);

export const Agend = () => {
  const location = useLocation()
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventModality, setEventModality] = useState("");
  const [sessionNumber, setSessionNumber] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventStatus, setEventStatus] = useState(""); // Nuevo estado para el estatus
  const [selectEvent, setSelectEvent] = useState(null);
  const [role, setRole] = useState("user");
  const [noControl, setNoControl] = useState(null);
  const API_URL = "https://back-psico.fly.dev/api/agenda";

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  // Función para obtener eventos
  const fetchEvents = async () => {
    try {
      let response;
      if (noControl || role === "admin") {
        response = await axios.get(`${API_URL}/getAllEvents`);
      }
      if (response?.data) {
        const formattedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.start_time),
          end: new Date(event.end_time),
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedRole = localStorage.getItem('role'); // Obtener el rol del almacenamiento
        setRole(storedRole); // Establecer el rol en el estado

        let response;
        if (storedRole === 'admin') {
          response = await axios.get(
            'https://back-psico.fly.dev/api/admin/getAdminData',
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );
          setNoControl(response.data.no_control);
        } else {
          response = await axios.get(
            'https://back-psico.fly.dev/api/users/getUserData',
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          );
          setNoControl(response.data.no_control);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (role === "admin" || noControl) {
      fetchEvents();
    }
  }, [noControl, role]);

  const saveEvent = async () => {
    if (eventModality && selectedDate && eventTime && sessionNumber) {
      const [hours, minutes] = eventTime.split(':');

      // Si estamos editando una cita, mantenemos la fecha original
      const eventStart = selectEvent
        ? moment(selectEvent.start).set({ hour: hours, minute: minutes }).subtract(6, 'hours').toISOString()
        : moment(selectedDate).set({ hour: hours, minute: minutes }).subtract(6, 'hours').toISOString();

      const eventEnd = moment(eventStart).add(1, 'hours').toISOString();

      const updatedEvent = {
        title: `Sesión ${sessionNumber} - ${eventModality}`,
        session_number: parseInt(sessionNumber, 10),
        start_time: eventStart,
        end_time: eventEnd,
        no_control_user: role === "usuario" ? noControl : null,
        no_control_admin: role === "admin" ? noControl : null,
        status: eventStatus // Agregar estatus al evento
      };

      try {
        if (selectEvent) {
          const response = await axios.put(`${API_URL}/updateEvent/${selectEvent.id}`, updatedEvent);
          if (response.status === 200) {
            setEvents(events.map((event) =>
              event.id === selectEvent.id
                ? { ...event, ...updatedEvent, start: new Date(eventStart), end: new Date(eventEnd) }
                : event
            ));
            setShowModal(false);
          } else {
            console.error('Error al actualizar la cita:', response);
          }
        } else {
          const response = await axios.post(`${API_URL}/createEvent`, updatedEvent);
          if (response.status === 200 || response.status === 201) {
            setEvents([
              ...events,
              { ...updatedEvent, id: response.data.id, start: new Date(eventStart), end: new Date(eventEnd) },
            ]);
            setShowModal(false);
          } else {
            console.error('Error al crear la cita:', response);
          }
        }
      } catch (error) {
        console.error('Error al guardar el evento:', error);
      }
    } else {
      alert('Por favor, completa todos los campos antes de guardar.');
    }
  };

  const deleteEvent = async () => {
    if (selectEvent) {
      try {
        await axios.delete(`${API_URL}/deleteEvent/${selectEvent.id}`);
        setEvents(events.filter((event) => event.id !== selectEvent.id));
        setShowModal(false);
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
      }
    }
  };

  const handleSelectSlot = (slotInfo) => {
    const today = moment().startOf("day");
    const selectedDay = moment(slotInfo.start).startOf("day");

    if (selectedDay.isBefore(today)) {
      alert("No puedes agendar citas en días anteriores.");
      return;
    }

    if (role === "usuario" || role === "admin") {
      setShowModal(true);
      setSelectedDate(slotInfo.start);
      setSelectEvent(null);
      setEventModality("");
      setSessionNumber("");
      setEventTime("");
      setEventStatus(""); // Resetear estatus
    }
  };

  const handleSelectEvent = (event) => {
    const today = moment().startOf("day");
    const eventDay = moment(event.start).startOf("day");

    if (eventDay.isBefore(today)) {
      alert("No puedes modificar citas en días anteriores.");
      return;
    }

    if (role === "admin") {
      setShowModal(true);
      setSelectEvent(event);
      setEventModality(event.title.split(" - ")[1] || "");
      setSessionNumber(event.session_number || "");
      setEventTime(moment(event.start).format("HH:mm"));
      setEventStatus(event.status || ""); // Cargar estatus
    } else {
      //alert("Solo el administrador puede editar o eliminar citas.");
      setShowModal(true);
      setSelectEvent(event);
      setEventModality(event.title.split(" - ")[1] || "");
      setSessionNumber(event.session_number || "");
      setEventTime(moment(event.start).format("HH:mm"));
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 8; i <= 16; i++) { // Cambiar el rango a 8 a 20
      const hour = i < 10 ? `0${i}` : i;
      options.push(`${hour}:00`);
      options.push(`${hour}:30`);
    }
    return options;
  }

  return (
    <>
      <div className="divagenda">

        <div className="titulosagenda">
          {role === "admin" && (
            <div >
              <h2>Panel de Administración</h2>
              <p>Aquí puedes gestionar citas y eventos de forma avanzada.</p>
            </div>
          )}
          {role === "usuario" && (
            <div >
              <h2>Bienvenido, Usuario</h2>
              <p>Aquí puedes ver y agendar tus citas.</p>
            </div>
          )}
        </div>
        <hr className="hragenda" />
        <h2 className="tiagenda">
          Agenda
        </h2>
        <div className="calendario">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: "20px" }}
            selectable={role === "usuario" || role === "admin"} // Solo usuarios y admins pueden seleccionar
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
        </div>



        {role === "admin" && (
          <div>
            <hr className="hragenda" id="Expediente"/>
            <h2 className="tiagenda">
              Generación de expedientes
            </h2>
            <div className="extragenda">
              <div className="expedienteag">
                <Expediente />
              </div>
              <hr className="hragenda"  />
              <h2 id="MostrarExpediente" className="tiagenda">
                Búsqueda de expediente psicológico
              </h2>
              <div className="verexpedienteag">
                <MostrarExpediente />
              </div>

            </div>
          </div>


        )}


        {showModal && (
          <div
            className="modal"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectEvent ? "Editar cita" : "Agregar cita"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <label>Modalidad:</label>
                  <select
                    className="form-control"
                    value={eventModality}
                    onChange={(e) => setEventModality(e.target.value)}
                    readOnly={role !== "admin" && selectEvent} // Deshabilitar edición para usuarios
                  >
                    <option value="">Selecciona una modalidad</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Virtual">Virtual</option>
                  </select>
                  <label>No. Sesión:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={sessionNumber}
                    onChange={(e) => setSessionNumber(e.target.value)}
                    readOnly={role !== "admin" && selectEvent} // Deshabilitar edición para usuarios
                  />
                  <label>Hora:</label>
                  <select
                    className="form-control"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    readOnly={role !== "admin" && selectEvent} // Deshabilitar edición para usuarios
                  >
                    <option value="">Selecciona una hora</option>
                    {generateTimeOptions().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {role === "admin" && ( // Mostrar campos solo si es administrador
                    <>
                      <label>Número de Control:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectEvent ? selectEvent.no_control_user || selectEvent.no_control_admin : noControl} // Usar el número de control del evento seleccionado
                        readOnly // Solo lectura para el número de control
                      />
                      <label>Estatus:</label>
                      <select
                        className="form-control"
                        value={eventStatus}
                        onChange={(e) => setEventStatus(e.target.value)}
                      >
                        <option value="">Selecciona un estatus</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  {role === "admin" && selectEvent && (
                    <button
                      type="button"
                      className="btn btn-danger me-2"
                      onClick={deleteEvent}
                    >
                      Eliminar cita
                    </button>
                  )}
                  {role === "admin" || !selectEvent ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={saveEvent}
                    >
                      {selectEvent ? "Actualizar cita" : "Guardar cita"}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </>
  );
};