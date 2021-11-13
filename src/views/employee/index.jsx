import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';
import Lista from './components/List';

import NewEmployee from './pages/New';

const Employee = () => {
 
  return (
    <Panel bordered>
      <Routes>
        <Route path='nuevo' element={<NewEmployee/>}/>
        <Route path='/' element={<Lista/>}/>
      </Routes> 
    </Panel>
  );
};

export default Employee;