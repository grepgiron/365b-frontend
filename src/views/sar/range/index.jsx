import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel } from 'rsuite';

import ShowEstablishment from './pages/Show';
import EditEstablishment from './pages/Edit';

const Range = () => {
 
  return (
    <Panel>
      <Routes>
        <Route path='show' element={<ShowEstablishment/>}/>
        <Route path='editar/:id' element={<EditEstablishment/>}/>
      </Routes> 
    </Panel>
  );
};

export default Range;