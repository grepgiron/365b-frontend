import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ListaDocument from './pages/List';
import NewDocument from './pages/New';
import ShowDocument from './pages/Show';


const DocumentAutorization = () => {
 
  return (
    <>
    <div class="markdown">
      <h5>Documentos de Autorizacion</h5>
    </div>
      <Panel bordered>
        <Routes>
          <Route path='nuevo' element={<NewDocument/>}/>
          <Route path='/show/:id' element={<ShowDocument/>}/>
          <Route path='/' element={<ListaDocument/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default DocumentAutorization;