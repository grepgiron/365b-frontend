import React from 'react'
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
  

const SidebarNav = ({ appearance, ...props }) => {
    const [expand, setExpand] = React.useState(true);
    return (
        <Sidebar 
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expand ? 260 : 56}
            collapsible
        >
            <Sidenav.Header>
                <div style={headerStyles}>
                    <LogoAnalytics style={{ fontSize: 20 }} />
                    <span style={{ marginLeft: 12 }}> BRAND</span>
                </div>
            </Sidenav.Header>
            <Sidenav 
                appearance={appearance} 
                defaultOpenKeys={['3', '4']}
            >
                <Sidenav.Body>
                    <Nav {...props}>
                        <Nav.Item eventKey="1" active icon={<Dashboard />}>
                        Dashboard
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<Group />}>
                        User Group
                        </Nav.Item>
                        <Dropdown eventKey="3" title="Advanced" icon={<Magic />}>
                            <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                            <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                            <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                            <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                        </Dropdown>
                        <Dropdown eventKey="4" title="Settings" icon={<GearCircle />}>
                            <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                            <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                            <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                            <Dropdown.Menu eventKey="4-5" title="Custom Action">
                            <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                            <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    );
}

export default SidebarNav;