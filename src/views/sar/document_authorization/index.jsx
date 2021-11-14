import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import Lista from './pages/List';
import NewDocument from './pages/New';
import ShowDocument from './pages/Show';


const DocumentAutorization = () => {
 
  return (
    <Panel shaded>
      <Routes>
        <Route path='nuevo' element={<NewDocument/>}/>
        <Route path='/:id' element={<ShowDocument/>}/>
        <Route path='/' element={<Lista/>}/>
      </Routes> 
    </Panel>
  );
};

export default DocumentAutorization;