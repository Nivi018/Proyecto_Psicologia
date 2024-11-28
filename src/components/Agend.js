import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import axios from "axios";

const localizer = momentLocalizer(moment);

export const Agend = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDescription, setEventDescription] = useState("");
  const [sessionNumber, setSessionNumber] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);
  const [role, setRole] = useState("user");
  const [noControl, setNoControl] = useState(null);
  const API_URL = "http://localhost:3000/api/agenda";

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
          start: new Date(event.start_time), // Cambiado a start_time
          end: new Date(event.end_time), // Cambiado a end_time
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedRole = localStorage.getItem("role");
        if (storedRole) setRole(storedRole);
        const response = await axios.get(
          "http://localhost:3000/api/users/getUserData",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setNoControl(response.data.no_control);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (role === "admin" || noControl) {
      fetchEvents();
    }
  }, [noControl, role]);

  const saveEvent = async () => {
    if (eventDescription && selectedDate && eventTime && sessionNumber) {
      const [hours, minutes] = eventTime.split(':');
      const eventStart = moment(selectedDate).set({ hour: hours, minute: minutes }).toISOString();
      const eventEnd = moment(eventStart).add(1, 'hours').toISOString();
      const updatedEvent = {
        no_control: noControl,
        title: `Sesión ${sessionNumber} - ${eventDescription}`,
        session_number: parseInt(sessionNumber, 10),
        start_time: eventStart,
        end_time: eventEnd,
      };
  
      try {
        if (selectEvent) {
          // Si estamos editando una cita
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
          // Si estamos creando una nueva cita
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
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
    setEventDescription("");
    setSessionNumber("");
    setEventTime("");
  };

  const handleSelectEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventDescription(event.title.split(" - ")[1] || "");
    setSessionNumber(event.session_number || "");
    setEventTime(moment(event.start).format("HH:mm"));
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : i;
      options.push(`${hour}:00`);
      options.push(`${hour}:30`);
    }
    return options;
  };

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end" // Asegúrate de que este campo coincida con el formato de eventos
        style={{ margin: "50px" }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
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
                <label>Descripción:</label>
                <textarea
                  className="form-control"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
                <label>No. Sesión:</label>
                <input
                  type="number"
                  className="form-control"
                  value={sessionNumber}
                  onChange={(e) => setSessionNumber(e.target.value)}
                />
                <label>Hora:</label>
                <select
                  className="form-control"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                >
                  <option value="">Selecciona una hora</option>
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                {selectEvent && (
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={deleteEvent}
                  >
                    Eliminar cita
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveEvent}
                >
                  {selectEvent ? "Actualizar cita" : "Guardar cita"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {role === "admin" && (
        <div style={{ marginTop: "20px" }}>
          <h2>Panel de Administración</h2>
          <p>Aquí puedes gestionar citas y eventos de forma avanzada.</p>
        </div>
      )}
      {role === "user" && (
        <div style={{ marginTop: "20px" }}>
          <h2>Bienvenido, Usuario</h2>
          <p>Solo puedes ver y agendar tus citas.</p>
        </div>
      )}
    </div>
  );
};
