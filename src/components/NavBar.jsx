import React from 'react'
import {
    Nav,
    Navbar,
    Dropdown
} from 'rsuite';

import Cog from '@rsuite/icons/legacy/Cog';

const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar appearance="inverse">
      <Navbar.Header>
        <a className="navbar-brand logo">BRAND</a>
      </Navbar.Header>
      <Navbar.Body>
        <Nav>
          <Nav.Item>Home</Nav.Item>
          <Nav.Item>News</Nav.Item>
          <Nav.Item>Products</Nav.Item>
          <Dropdown title="About">
            <Dropdown.Item>Company</Dropdown.Item>
            <Dropdown.Item>Team</Dropdown.Item>
            <Dropdown.Item>Contact</Dropdown.Item>
          </Dropdown>
        </Nav>
        <Nav pullRight>
          <Nav.Item icon={<Cog />}>Settings</Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

export default NavBarInstance;