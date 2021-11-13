import React from 'react';
import { BrowserRouter as Router, Route ,Link, Routes} from "react-router-dom";

import {
  Container,
  Header,
  Sidebar,
  Content,
  Sidenav,
  Nav,
  Dropdown,
  Navbar,
  Panel,
  Footer
} from 'rsuite';

import Client from '../views/Client/index';
import Employee from '../views/employee/index';
import Lista from '../views/Client/components/List';

import SidebarNav from '../components/SidebarNav';

import Cog from '@rsuite/icons/legacy/Cog';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import LogoAnalytics from '@rsuite/icons/legacy/LogoAnalytics';
import Dashboard from '@rsuite/icons/Dashboard';
import Group from '@rsuite/icons/legacy/Group';
import Magic from '@rsuite/icons/legacy/Magic';
import GearCircle from '@rsuite/icons/legacy/GearCircle';

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const iconStyles = {
  width: 56,
  height: 56,
  padding: 18,
  lineHeight: '56px',
  textAlign: 'center'
};

const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">RSUITE</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1" icon={<Cog />}>
          Home
        </Nav.Item>
        <Nav.Item eventKey="2">News</Nav.Item>
        <Nav.Item eventKey="3">Products</Nav.Item>
        <Dropdown title="About">
          <Dropdown.Item eventKey="4">Company</Dropdown.Item>
          <Dropdown.Item eventKey="5">Team</Dropdown.Item>
          <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
        </Dropdown>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<Cog />}>Settings</Nav.Item>
      </Nav>
    </Navbar>
  );
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav>
          <Dropdown
            placement="topStart"
            trigger="click"
            renderTitle={children => {
              return <Cog style={iconStyles} />;
            }}
          >
            <Dropdown.Item>Help</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </Nav>

        <Nav pullRight>
          <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
            {expand ? <AngleLeft /> : <AngleRight />}
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

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
      {/* <Sidebar 
        style={{ display: 'flex', flexDirection: 'column' }}
        width={expand ? 260 : 56}
        collapsible
        appearance="inverse"
      >
        <Sidenav.Header>
          <div style={headerStyles}>
            <LogoAnalytics style={{ fontSize: 20 }} />
            <span style={{ marginLeft: 12 }}> BRAND</span>
          </div>
        </Sidenav.Header>
        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey="1" icon={<Dashboard />}>
                Dashboard
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<Group />}>
                Facturacion
              </Nav.Item>
              <Dropdown
                eventKey="3"
                trigger="hover"
                title="Advanced"
                icon={<Magic />}
                placement="rightStart"
              >
                <Dropdown.Item eventKey="3-1"><Link to="clientes" style={{ textDecoration: 'none' }}>Clientes</Link></Dropdown.Item>
                <Dropdown.Item eventKey="3-2"><Link to="clientes" style={{ textDecoration: 'none' }}>Clientes</Link></Dropdown.Item>
                <Dropdown.Item eventKey="3-3"><Link to="clientes" style={{ textDecoration: 'none' }}>Clientes</Link></Dropdown.Item>
                <Dropdown.Item eventKey="3-4"><Link to="clientes" style={{ textDecoration: 'none' }}>Clientes</Link></Dropdown.Item>
                <Dropdown.Item eventKey="3-5"><Link to="clientes" style={{ textDecoration: 'none' }}>Clientes</Link></Dropdown.Item>
              </Dropdown>
              <Dropdown
                eventKey="4"
                trigger="hover"
                title="Settings"
                icon={<GearCircle />}
                placement="rightStart"
              >
                <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                <Dropdown.Item eventKey="4-2">Websites</Dropdown.Item>
                <Dropdown.Item eventKey="4-3">Channels</Dropdown.Item>
                <Dropdown.Item eventKey="4-4">Tags</Dropdown.Item>
                <Dropdown.Item eventKey="4-5">Versions</Dropdown.Item>
              </Dropdown>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </Sidebar> */}
      <SidebarNav 
        activeKey={activeKey}
        openKeys={openKeys}
        onSelect={setActiveKey}
        onOpenChange={setOpenKeys}
      />

      <Container>
        <NavBarInstance activeKey={activeKey} onSelect={setActiveKey} />
        <Content className="rs-content">
          <Routes>
            <Route path='clientes/*' element={<Client/>}/>
            <Route path='empleados/*' element={<Employee/>}/>
          </Routes>  
        </Content>
        <Footer>dsadsa</Footer>
      </Container>
    </Container>
  );
};

export default Admin;