import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import NewDocument from './pages/New';
import ShowDocument from './pages/Show';
import EditDocument from './pages/Edit';
import ListDocument from './pages/List';

const DocumentType = () => {
 
  return (
    <Panel bordered header={<h4>SAR</h4>}>
      <Routes>
        <Route path='nuevo' element={<NewDocument/>}/>
        <Route path='/show/:id' element={<ShowDocument/>}/>
        <Route path='/editar/:id' element={<EditDocument/>}/>
        <Route path='/' element={<ListDocument/>}/>
      </Routes> 
    </Panel>
  );
};

export default DocumentType;