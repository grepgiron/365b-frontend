import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import Lista from './pages/List';
import ShowEmployee from './pages/Show';
import NewEmployee from './pages/New';

const Employee = () => {
 
  return (
    <Panel bordered>
      <Routes>
        <Route path='nuevo' element={<NewEmployee/>}/>
        <Route path='/:id' element={<ShowEmployee/>}/>
        <Route path='/' element={<Lista/>}/>
      </Routes> 
    </Panel>
  );
};

export default Employee;