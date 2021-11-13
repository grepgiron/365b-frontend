import React from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";

import { Panel } from 'rsuite';
import Lista from './components/List';

import NewClient from './pages/New';

const Client = () => {
 
  return (
    <Panel header="Panel title" bordered>
      <Routes>
        <Route path='nuevo' element={<NewClient/>}/>
        <Route path='/' element={<Lista/>}/>
      </Routes> 
    </Panel>
  );
};

export default Client;