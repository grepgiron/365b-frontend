import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import Lista from './pages/List';
import NewUnd from './pages/New';
import ShowUnd from './pages/Show';
import EditUnd from './pages/Edit';


const Und = () => {
 
  return (
    <Panel bordered header={<h4>Inventario</h4>}>
      <Routes>
        <Route path='nuevo' element={<NewUnd/>}/>
        <Route path='/:id' element={<ShowUnd/>}/>
        <Route path='/editar/:id' element={<EditUnd/>}/>
        <Route path='/' element={<Lista/>}/>
      </Routes> 
    </Panel>
  );
};

export default Und;