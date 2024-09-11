import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import 'moment/locale/es';

const localizer = momentLocalizer(moment);


export const Agend = () => {
    

    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [selectEvent, setSelectEvent] = useState(null);

    const handleSelectSlot = (slotInfo) => {
        setShowModal(true);
        setSelectedDate(slotInfo.start);
        setSelectEvent(null);
    };
    const handleSelectEvent = (event) => {
        setShowModal(true);
        setSelectEvent(event);
        setEventTitle(event.title);
    }

    const saveEvent = () => {
        if(eventTitle && selectedDate){
            if(selectEvent){
                const updatedEvent ={...selectEvent, title: eventTitle};
                const updatedEvents = events.map((event) =>
                     event === selectEvent ? updatedEvent : event
            );
            setEvents(updatedEvents);
            } else{
                const newEvent = {
                    title: eventTitle,
                    start: selectedDate,
                    end: moment(selectedDate).add(1, 'hours').toDate(),
                };
                setEvents([...events, newEvent]);
            }
                setShowModal(false);
                setEventTitle('');
                setSelectEvent(null);
            }
        };
    
    const deleteEvents = () =>{
        if(selectEvent){
            const updatedEvents = events.filter((event) => event!== selectEvent);
            setEvents(updatedEvents);
            setShowModal(false);
            setEventTitle('');
            setSelectEvent(null);
        }
    }

    return (
        <div style={{
            height: '500px'}}>
                <Calendar
            localizer={localizer}
            events={events}
            startAccessor={"start"}
            endAccessor={"end"}
            style={{margin:'50px'}}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            />

            {showModal &&(
                <div class="modal" style={{display:'block', backgroundColor:'rgba(0.0.0.0.5)', position:'fixed', top:0, botton:0, left:0, right:0}}>
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">
                        {selectEvent ? 'Editar cita':'Agregar cita'}
                        </h5>
                      <button type="button" class="btn-close" 
                      onClick={()=> {
                      setShowModal(false)
                      setEventTitle('');
                      setSelectEvent(null);
                    }}
                      ></button>
                    </div>
                    <div class="modal-body">
                    <label>Agenda una cita:</label>
                    <input 
                        type="text" 
                        className='form-control'
                        id='eventTitle'
                        value={eventTitle} 
                        onChange={(e)=>setEventTitle(e.target.value)}
                    />
                    </div>
                    <div class="modal-footer">
                        {selectEvent &&(<button type="button"
                            className="btn btn-danger me-2"
                            onClick={deleteEvents}
                            >Eliminar cita</button>)}
                      <button type="button" onClick={saveEvent} className='btn btn-primary'>Guardar cita</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            
            
        </div>
    );
}
