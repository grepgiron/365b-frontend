import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ListSalesPoint from './pages/List';
import NewSalesPoint from './pages/New';
import ShowSalesPoint from './pages/Show';
import EditSalesPoint from './pages/Edit';


const SalesPoint = () => {
  return (
    <>
    <div class="markdown">
      <h5>Puntos de Venta</h5>
    </div>
      <Panel> 
        <Routes>
          <Route path='nuevo' element={<NewSalesPoint/>}/>
          <Route path='/show/:id' element={<ShowSalesPoint/>}/>
          <Route path='editar/:id' element={<EditSalesPoint/>}/>
          <Route path='/' element={<ListSalesPoint/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default SalesPoint;