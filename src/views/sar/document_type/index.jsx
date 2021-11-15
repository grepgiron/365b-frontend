import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';
import Lista from './pages/List';

import NewDocument from './pages/New';
import ShowDocument from './pages/Show';


const DocumentType = () => {
 
  return (
    <>
      <h5>Documentos Fiscales</h5>
        <Panel> 
        <Routes>
          <Route path='nuevo' element={<NewDocument/>}/>
          <Route path='/:id' element={<ShowDocument/>}/>
          <Route path='/' element={<Lista/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default DocumentType;