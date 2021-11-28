import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import NewSalesPoint from './pages/New';
import ShowSalesPoint from './pages/Show';
import EditSalesPoint from './pages/Edit';
import ListSalesPoint from './pages/List';

const SalesPoint = () => {

  return (
    <Panel bordered header={<h4>SAR</h4>}>
      <Routes>
        <Route path='nuevo' element={<NewSalesPoint/>}/>
        <Route path='/show/:id' element={<ShowSalesPoint/>}/>
        <Route path='/editar/:id' element={<EditSalesPoint/>}/>
        <Route path='/' element={<ListSalesPoint/>}/>
      </Routes> 
    </Panel>
  );

};

export default SalesPoint;