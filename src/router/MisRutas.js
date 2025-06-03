import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
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
import { MostrarExpediente } from '../components/MostrarExpediente';
import { Info } from '../components/Info';
import { Servicios } from '../components/Servicios';

export const MisRutas = () => {
  const role = localStorage.getItem('role'); // Obtener el rol del localStorage

  return (
    <BrowserRouter>
      <HeaderNav />

      <section className="content">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Info" element={<Info />} />
          <Route path="/Servicios" element={<Servicios />} />

          {/* Rutas privadas */}
          <Route element={<RutasPrivadas />}>
            <Route path="/agenda" element={<Agend />} />
            <Route path="/expediente" element={role === 'admin' ? <Expediente /> : <Navigate to="/agenda" />} />
            <Route path="/mostrarExpediente" element={role === 'admin' ? <MostrarExpediente/> : <Navigate to="/agenda" />} />
          </Route>

          {/* Ruta para proyectos con parámetros */}
          <Route path="/proyecto/:id" element={<Proyecto />} />

          {/* Ruta por defecto para manejar errores 404 */}
          <Route
            path="*"
            element={
              <div className="page">
                <h1 className="heading">Error 404</h1>
              </div>
            }
          />
        </Routes>
      </section>

      <Footer />
    </BrowserRouter>
  );
};