import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ListaDocument from './pages/List';
import NewDocument from './pages/New';
import ShowDocument from './pages/Show';
import EditDocument from './pages/Edit';


const DocumentAutorization = () => {
 
  return (
    <>
    <div class="markdown">
      <h5>Documentos de Autorizacion</h5>
    </div>
      <Panel>
        <Routes>
          <Route path='nuevo' element={<NewDocument/>}/>
          <Route path='/show/:id' element={<ShowDocument/>}/>
          <Route path='/editar/:id' element={<EditDocument/>}/>
          <Route path='/' element={<ListaDocument/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default DocumentAutorization;