import React from 'react';
import { Route ,Routes} from "react-router-dom";

import {
  Container,
  Content,
  Header,
  Navbar,
  Nav,
  Dropdown
} from 'rsuite';

import 'rsuite/dist/rsuite.min.css'; // or css

import PosForm from '../views/Pos/index';


const Admin = () => {

  return (
    <Container className="show-fake-browser navbar-page">
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Header>
            <a className="navbar-brand logo">BRAND</a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item>POS</Nav.Item>
              <Nav.Item>Ventas</Nav.Item>
              <Nav.Item>Reportes</Nav.Item>
            </Nav>
            <Nav pullRight>
              <Nav.Item >Settings</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Header>
      <Content>
        <Routes>
          <Route path='ventas/*' element={<PosForm />}/>
        </Routes>  
      </Content>
    </Container>
  );
};

export default Admin;