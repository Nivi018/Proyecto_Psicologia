import React from 'react';
import { Routes, Route, BrowserRouter, NavLink, Navigate } from "react-router-dom";
import { Inicio } from '../components/Inicio';
import { Contacto } from '../components/Contacto';
import { Curriculum } from '../components/Curriculum';
import { Portafolio } from '../components/Portafolio';
import { Login } from '../components/Login';
import { HeaderNav } from '../components/layout/HeaderNav';
import { Footer } from '../components/layout/Footer';
import { Proyecto } from '../components/Proyecto';
import { Register } from '../components/Register';
import { RutasPrivadas } from './RutasPrivadas';
import { Agend } from '../components/Agend';
import { Expediente } from '../components/Expediente';

export const MisRutas = () => {
  

  return (
      <BrowserRouter>
        
        <HeaderNav />

        <section className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/portafolio" element={<Portafolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/expediente" element={<Expediente />}/>

            <Route element={<RutasPrivadas/>}>
            <Route path='/agenda' element={<Agend/>}/>
            
            </Route>
            

            <Route path="/proyecto/:id" element={<Proyecto />} />
            <Route path="*" element={
              <div className='page'>
                <h1 className='heading'>Error 404</h1>
              </div>
            } />
          </Routes>
        </section>

        <Footer />
      </BrowserRouter>
  );
};
