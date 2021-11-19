import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import List from './pages/List';
import New from './pages/New';
import Show from './pages/Show';
import Edit from './pages/Edit';


const Payments = () => {
 
  return (
    <>
    <h4>Metodos de Pago</h4>
    <Panel >
      <Routes>
        <Route path='nuevo' element={<New/>}/>
        <Route path='editar/:id' element={<Edit/>}/>
        <Route path='/show/:id' element={<Show/>}/>
        <Route path='/' element={<List/>}/>
      </Routes> 
    </Panel>
  </> 
  );
};

export default Payments;