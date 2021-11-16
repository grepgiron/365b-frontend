import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ListaSalesPoint from './pages/List';
import NewSalesPoint from './pages/New';
import ShowSalesPoint from './pages/Show';


const SalesPoint = () => {
  //comentario prueba
  return (
    <>
    <div class="markdown">
      <h5>Sales Point</h5>
    </div>
      <Panel bordered> 
        <Routes>
          <Route path='nuevo' element={<NewSalesPoint/>}/>
          <Route path='/show/:id' element={<ShowSalesPoint/>}/>
          <Route path='/:id/editar' element={<ShowSalesPoint/>}/>
          <Route path='/' element={<ListaSalesPoint/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default SalesPoint;