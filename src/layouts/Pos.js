import React from 'react';
import { Route ,Routes, useNavigate } from "react-router-dom";

import {
  Container,
  Content,
  Header,
  Navbar,
  Nav,
  Dropdown
} from 'rsuite';

import '../App.css'
import 'rsuite/dist/rsuite.min.css'; // or css

import PosForm from '../views/Pos/index';
import List from '../views/invoice/pages/List';


const Admin = () => {

  let navigate = useNavigate();
  function handleClick(route){
    navigate(route);
  }

  return (
    <Container className="show-fake-browser navbar-page">
      <Header>
        <Navbar className="fixed-top">
          <Navbar.Header>
            <a className="navbar-brand logo">BRAND</a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav>
              <Nav.Item onClick={() => handleClick('/pos')}>POS</Nav.Item>
              <Nav.Item onClick={() => handleClick('/pos/ventas')}>Ventas</Nav.Item>
              <Nav.Item onClick={() => handleClick('/pos/reportes')}>Reportes</Nav.Item>
            </Nav>
            <Nav pullRight>
              <Nav.Item onClick={() => handleClick('/admin')}>Admin</Nav.Item>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Header>
      <Content style={{ marginTop: '70px'}}>
        <Routes>
          <Route path='/' element={<PosForm />}/>
          <Route path='ventas/*' element={<List />}/>
          <Route path='reportes/*' element={<List />}/>
        </Routes>  
      </Content>
    </Container>
  );
};

export default Admin;