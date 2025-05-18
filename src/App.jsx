import React from 'react';
import { useActua } from './context/ActuaContext';
import Portada from './components/Portada';
import IngresoAlumno from './components/IngresoAlumno';
import MainMenu from './components/MainMenu';
import ActuaEscenario from './components/ActuaEscenario';
import AdminPanel from './components/AdminPanel';
import DrawerMenu from './components/DrawerMenu';

export default function App() {
  const { stage } = useActua();
  return (
    <>
      {stage === 'portada' && <Portada />}
      {stage === 'ingreso' && <IngresoAlumno />}
      {stage === 'menu' && <MainMenu />}
      {stage === 'escenario' && <ActuaEscenario />}
      {stage === 'admin' && <AdminPanel />}
      <DrawerMenu />
    </>
  );
}