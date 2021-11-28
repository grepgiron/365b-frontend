import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import NewClient from './pages/New';
import ShowClient from './pages/Show';
import EditClient from './pages/Edit';
import ListClient from './pages/List';

const Client = () => {
 
  return (
    <Panel bordered>
      <Routes>
        <Route path='nuevo' element={<NewClient/>}/>
        <Route path='/:id' element={<ShowClient/>}/>
        <Route path='/editar/:id' element={<EditClient/>}/>
        <Route path='/' element={<ListClient/>}/>
      </Routes> 
    </Panel>
  );
};

export default Client;