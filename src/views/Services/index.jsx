import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import NewService from './pages/New';
import ShowService from './pages/Show';
import EditService from './pages/Edit';
import ListService from './pages/List';

const Service = () => {
 
  return (
    <Panel bordered>
      <Routes>
        <Route path='nuevo' element={<NewService/>}/>
        <Route path='/:id' element={<ShowService/>}/>
        <Route path='/editar/:id' element={<EditService/>}/>
        <Route path='/' element={<ListService/>}/>
      </Routes> 
    </Panel>
  );
};

export default Service;