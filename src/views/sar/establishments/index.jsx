import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel, Divider } from 'rsuite';

import ListaEstablishment from './pages/List';
import NewEstablishment from './pages/New';
import ShowEstablishment from './pages/Show';


const Establishment = () => {
 
  return (
    <>
    <div class="markdown">
      <h5>Establecimientos</h5>
    </div>
      <Panel bordered>
        <Routes>
          <Route path='nuevo' element={<NewEstablishment/>}/>
          <Route path='/show/:id' element={<ShowEstablishment/>}/>
          <Route path='/' element={<ListaEstablishment/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default Establishment;