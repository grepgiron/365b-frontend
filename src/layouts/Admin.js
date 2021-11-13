import React from 'react';
import { Route ,Link, Routes} from "react-router-dom";

import {
  Container,
  Content,
  Footer
} from 'rsuite';

import Client from '../views/Client/index';
import Employee from '../views/employee/index';
import Lista from '../views/Client/components/List';

import SidebarNav from '../components/SidebarNav';
import NavBarInstance from '../components/NavBar';

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
          </Routes>  
        </Content>
        <Footer>dsadsa</Footer>
      </Container>
    </Container>
  );
};

export default Admin;