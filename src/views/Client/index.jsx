import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import Lista from './pages/List';
import NewClient from './pages/New';
import ShowClient from './pages/Show';
import EditClient from './pages/Edit';


const Client = () => {
 
  return (
    <>
      <Panel bordered>
        <Routes>
          <Route path='nuevo' element={<NewClient/>}/>
          <Route path='/:id' element={<ShowClient/>}/>
          <Route path='/editar/:id' element={<EditClient/>}/>
          <Route path='/' element={<Lista/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default Client;