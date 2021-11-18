import React from 'react'
import {
    Nav,
    Navbar
} from 'rsuite';

import Cog from '@rsuite/icons/legacy/Cog';

const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Nav pullRight>
        <Nav.Item icon={<Cog />}/>
      </Nav>
    </Navbar>
  );
};

export default NavBarInstance;