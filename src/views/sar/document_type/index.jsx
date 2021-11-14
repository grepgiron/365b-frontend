import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';
import Lista from './pages/List';

import NewDocument from './pages/New';
import ShowDocument from './pages/Show';


const Client = () => {
 
  return (
    <Panel bordered header={<h4>Tipos de Documentos</h4>}>
      <Routes>
        <Route path='nuevo' element={<NewDocument/>}/>
        <Route path='/:id' element={<ShowDocument/>}/>
        <Route path='/' element={<Lista/>}/>
      </Routes> 
    </Panel>
  );
};

export default Client;