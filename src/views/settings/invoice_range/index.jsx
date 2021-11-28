import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import Show from './pages/Show';
import Edit from './pages/Edit';


const Payments = () => {
 
  return (
    <>
    <h4>Rango</h4>
    <Panel >
      <Routes>
        <Route path='editar/:id' element={<Edit/>}/>
        <Route path='show/:id' element={<Show/>}/>
      </Routes> 
    </Panel>
  </> 
  );
};

export default Payments;