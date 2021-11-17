import React from 'react';
import { Route , Routes} from "react-router-dom";

import { Panel, Divider } from 'rsuite';

import ListEstablishment from './pages/List';
import NewEstablishment from './pages/New';
import ShowEstablishment from './pages/Show';
import EditEstablishment from './pages/Edit';


const Establishment = () => {
 
  return (
    <>
    <div class="markdown">
      <h5>Establecimientos</h5>
    </div>
      <Panel>
        <Routes>
          <Route path='nuevo' element={<NewEstablishment/>}/>
          <Route path='editar/:id' element={<EditEstablishment/>}/>
          <Route path='show/:id' element={<ShowEstablishment/>}/>
          <Route path='/' element={<ListEstablishment/>}/>
        </Routes> 
      </Panel>
    </>
  );
};

export default Establishment;