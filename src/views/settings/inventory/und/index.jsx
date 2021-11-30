import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import NewUnd from './pages/New';
import ShowUnd from './pages/Show';
import EditUnd from './pages/Edit';
import ListUnd from './pages/List';


const Und = () => {
 
  return (
    <Panel bordered>
      <Routes>
        <Route path='nuevo' element={<NewUnd/>}/>
        <Route path='editar/:id' element={<EditUnd/>}/>
        <Route path='/:id' element={<ShowUnd/>}/>
        <Route path='/' element={<ListUnd/>}/>
      </Routes> 
    </Panel>
  );
};

export default Und;