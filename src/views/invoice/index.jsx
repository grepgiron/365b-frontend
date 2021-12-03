import React from 'react';
import { Route , Routes} from "react-router-dom";
import { 
  Panel 
} from 'rsuite';

import EditInvoice from './pages/Edit'
import ShowInvoice from './pages/Show'
import NewInvoice from './pages/New'
import ListInvoice from './pages/List'
import PrintInvoice from './pages/Print'

const Invoice = () => {
 
  return (
    <div className="pos-div">
      <Routes>
        <Route path='nuevo' element={<NewInvoice/>}/>
        <Route path='editar/:id' element={<EditInvoice/>}/>
        <Route path='show/:id' element={<ShowInvoice/>}/>
        <Route path='print/:id' element={<PrintInvoice/>}/>
        <Route path='/' element={<ListInvoice/>}/>
      </Routes> 
    </div>
  );
};

export default Invoice;