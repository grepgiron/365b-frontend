import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';
import Lista from './pages/List';

import NewClient from './pages/New';
import ShowClient from './pages/Show';


const Client = () => {
 
  return (
    <Panel shaded>
      <Routes>
        <Route path='nuevo' element={<NewClient/>}/>
       < Route path='/mostrar/:id' element={<ShowClient/>}/>
        <Route path='/:id' element={<ShowClient/>}/>
        <Route path='/' element={<Lista/>}/>
      </Routes> 
    </Panel>
  );
};

export default Client;