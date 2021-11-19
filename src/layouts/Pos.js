import React from 'react';
import { Route ,Link, Routes} from "react-router-dom";

import {
  Container,
  Content,
  Header,
  Footer,
  Panel
} from 'rsuite';

import NavBar from '../components/NavBar'

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
import PosForm from '../views/invoice/components/PosForm copy';
import Payments from '../views/settings/payments';


const Admin = () => {
  const [expand, setExpand] = React.useState(true);

  return (
    <Container className="navbar-page">
      <Header>
        <NavBar />
      </Header>
      <Content style={{ margin: 20 }}>
        <Routes>
          <Route path='ventas/*' element={<PosForm />}/>
        </Routes>  
      </Content>
      <Footer className="footerbar">Footer</Footer>
    </Container>
  );
};

export default Admin;