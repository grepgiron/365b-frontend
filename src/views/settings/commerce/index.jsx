import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import NewEstablishment from './pages/New';
import ShowEstablishment from './pages/Show';
import EditEstablishment from './pages/Edit';

const Commerce = () => {
 
  return (
    <Panel bordered>
      <Routes>
        <Route path='nuevo' element={<NewEstablishment/>}/>
        <Route path='show' element={<ShowEstablishment/>}/>
        <Route path='editar/:id' element={<EditEstablishment/>}/>
      </Routes> 
    </Panel>
  );
};

export default Commerce;