import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ListaDocument from './pages/List';
import NewDocument from './pages/New';
import ShowDocument from './pages/Show';


const DocumentAutorization = () => {
 
  return (
    <Panel bordered header={<h4>Documentos de Autorizacion</h4>}>
      <Routes>
        <Route path='nuevo' element={<NewDocument/>}/>
        <Route path='/:id' element={<ShowDocument/>}/>
        <Route path='/' element={<ListaDocument/>}/>
      </Routes> 
    </Panel>
  );
};

export default DocumentAutorization;