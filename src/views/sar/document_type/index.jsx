import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ListDocument from './pages/List';
import NewDocument from './pages/New';
import ShowDocument from './pages/Show';
import EditDocument from './pages/Edit';



const DocumentType = () => {
 
  return (
    <> 
    <div class="markdown">
      <h5>Documentos Fiscales</h5>
    </div> 
      <Panel> 
        <Routes>
          <Route path='nuevo' element={<NewDocument/>}/>
          <Route path='show/:id' element={<ShowDocument/>}/>
          <Route path='editar/:id' element={<EditDocument/>}/>
          <Route path='/' element={<ListDocument/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default DocumentType;