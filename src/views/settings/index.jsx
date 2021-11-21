import React from 'react';
import { Route , Routes} from "react-router-dom";
import { 
  Panel 
} from 'rsuite';

import Edit from './pages/Edit'
import Show from './pages/Show'
import New from './pages/New'
import List from './pages/List'

const Payments = () => {
 
  return (
    <>
      <div class="markdown">
        <h5>Ventas</h5>
      </div>
      <Panel>
        <Routes>
          <Route path='nuevo' element={<New/>}/>
          <Route path='editar/:id' element={<Edit/>}/>
          <Route path='/show/:id' element={<Show/>}/>
          <Route path='/' element={<List/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default Payments;