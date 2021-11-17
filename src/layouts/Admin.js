import React from 'react';
import { Route ,Link, Routes} from "react-router-dom";

import {
  Container,
  Content
} from 'rsuite';

import Client from '../views/Client/index';
import Employee from '../views/employee/index';
import DocumentoAutorizacion from '../views/sar/document_authorization/index';
import DocumentType from '../views/sar/document_type/index'

import SidebarNav from '../components/SidebarNav';
import Establishment from '../views/sar/establishments';
import SalesPoint from '../views/sar/sales_point';
import Category from '../views/settings/inventory/category';
import Und from '../views/settings/inventory/und';
import Product from '../views/settings/inventory/product';


const Admin = () => {
  const [expand, setExpand] = React.useState(true);

  return (
    <Container className="show-fake-browser sidebar-page">
      <SidebarNav 
        style={{ overflow: 'auto', left: 0, top: 0 }}
      />
      <Container
        style={{ marginLeft: expand ? 261 : 56 }}
      >
        <Content>
          <Routes>
            <Route path='clientes/*' element={<Client/>}/>
            <Route path='empleados/*' element={<Employee/>}/>
            <Route path='sar/documentos_autorizacion/*' element={<DocumentoAutorizacion/>}/>
            <Route path='sar/establecimiento/*' element={<Establishment/>}/>
            <Route path='sar/punto_venta/*' element={<SalesPoint/>}/>
            <Route path='sar/tipo_documento/*' element={<DocumentType/>}/>
            <Route path='inventario/categorias/*' element={<Category/>}/>
            <Route path='inventario/unidades/*' element={<Und/>}/>
            <Route path='inventario/productos/*' element={<Product />}/>
          </Routes>  
        </Content>
      </Container>
    </Container>
  );
};

export default Admin;