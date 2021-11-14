import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ListaSalesPoint from './pages/List';
import NewSalesPoint from './pages/New';
import ShowSalesPoint from './pages/Show';


const SalesPoint = () => {
  //comentario prueba
  return (

    <Panel bordered header={<h4>Puntos de Venta</h4>}> 
      <Routes>
        <Route path='nuevo' element={<NewSalesPoint/>}/>
        <Route path='/:id' element={<ShowSalesPoint/>}/>
        <Route path='/' element={<ListaSalesPoint/>}/>
      </Routes> 
    </Panel>
  );
};

export default SalesPoint;