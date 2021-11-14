import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ListaEstablishment from './pages/List';
import NewEstablishment from './pages/New';
import ShowEstablishment from './pages/Show';


const Establishment = () => {
 
  return (
    <Panel bordered header={<h4>Establecimientos</h4>}>
      <Routes>
        <Route path='nuevo' element={<NewEstablishment/>}/>
        <Route path='/:id' element={<ShowEstablishment/>}/>
        <Route path='/' element={<ListaEstablishment/>}/>
      </Routes> 
    </Panel>
  );
};

export default Establishment;