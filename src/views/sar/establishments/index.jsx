import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import NewEstablishment from './pages/New';
import ShowEstablishment from './pages/Show';
import EditEstablishment from './pages/Edit';
import ListEstablishment from './pages/List';

const Establishment = () => {
 
  return (
    <Panel bordered header={<h4>SAR</h4>}>
      <Routes>
        <Route path='nuevo' element={<NewEstablishment/>}/>
        <Route path='/show/:id' element={<ShowEstablishment/>}/>
        <Route path='/editar/:id' element={<EditEstablishment/>}/>
        <Route path='/' element={<ListEstablishment/>}/>
      </Routes> 
    </Panel>
  );
};

export default Establishment;