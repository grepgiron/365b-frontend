import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import Lista from './pages/List';
import NewService from './pages/New';
import ShowService from './pages/Show';
import EditService from './pages/Edit';


const Service = () => {
 
  return (
    <Panel bordered>
      <Routes>
        <Route path='nuevo' element={<NewService/>}/>
        <Route path='/:id' element={<ShowService/>}/>
        <Route path='/editar/:id' element={<EditService/>}/>
        <Route path='/' element={<Lista/>}/>
      </Routes> 
    </Panel>
  );
};

export default Service;