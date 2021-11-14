import React from 'react';
import { Route ,Link, Routes} from "react-router-dom";

import {
  Container,
  Content,
  Footer
} from 'rsuite';

import Client from '../views/Client/index';
import Employee from '../views/employee/index';
import DocumentoAutorizacion from '../views/sar/document_authorization/index';
import Lista from '../views/Client/components/List';
import DocumentType from '../views/sar/document_type/index'

import SidebarNav from '../components/SidebarNav';
import NavBarInstance from '../components/NavBar';
import Establishment from '../views/sar/establishments';
import SalesPoint from '../views/sar/sales_point';

const MyLink = React.forwardRef((props, ref) => {
  const { href, as, ...rest } = props;
  return (
    <Link href={href} as={as}>
      <a ref={ref} {...rest} />
    </Link>
  );
});

const Admin = () => {
  const [expand, setExpand] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState(null);
  const [openKeys, setOpenKeys] = React.useState(['3', '4']);

  return (
    <Container className="show-fake-browser sidebar-page">

      <SidebarNav 
        activeKey={activeKey}
        openKeys={openKeys}
        onSelect={setActiveKey}
        onOpenChange={setOpenKeys}
      />
      <Container>
        <Content>
          <Routes>
            <Route path='clientes/*' element={<Client/>}/>
            <Route path='empleados/*' element={<Employee/>}/>
            <Route path='sar/documentos_autorizacion/*' element={<DocumentoAutorizacion/>}/>
            <Route path='sar/establecimiento/*' element={<Establishment/>}/>
            <Route path='sar/punto_venta/*' element={<SalesPoint/>}/>
            <Route path='sar/tipo_documento/*' element={<DocumentType/>}/>
          </Routes>  
        </Content>
        <Footer>dsadsa</Footer>
      </Container>
    </Container>
  );
};

export default Admin;