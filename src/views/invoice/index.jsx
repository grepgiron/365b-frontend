import React from 'react';
import { Route , Routes} from "react-router-dom";
import { 
  Panel 
} from 'rsuite';

import EditInvoice from './pages/Edit'
import ShowInvoice from './pages/Show'
import NewInvoice from './pages/New'
import ListInvoice from './pages/List'

const Invoice = () => {
 
  return (
    <>
      <div class="markdown">
        <h5>Prefactura</h5>
      </div>
      <Routes>
        <Route path='nuevo' element={<NewInvoice/>}/>
        <Route path='editar/:id' element={<EditInvoice/>}/>
        <Route path='show/:id' element={<ShowInvoice/>}/>
        <Route path='/' element={<ListInvoice/>}/>
      </Routes> 
    </>
  );
};

export default Invoice;