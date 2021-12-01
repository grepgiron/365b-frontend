import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ListaProduct from './pages/List';
import NewEstablishment from './pages/New';
import EditProduct from './pages/Edit';
import ShowEstablishment from './pages/Show';


const Establishment = () => {
 
  return (
    <Panel bordered>
      <Routes>
        <Route path='nuevo' element={<NewEstablishment/>}/>
        <Route path='editar/:id' element={<EditProduct />}/>
        <Route path='/:id' element={<ShowEstablishment/>}/>
        <Route path='/' element={<ListaProduct/>}/>
      </Routes> 
    </Panel>
  );
};

export default Establishment;