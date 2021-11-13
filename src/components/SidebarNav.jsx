import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Container,
    Header,
    Sidebar,
    Button,
    Sidenav,
    Nav,
    Dropdown,
    Navbar,
    Panel,
    Footer
} from 'rsuite';

import TagFilterIcon from '@rsuite/icons/TagFilter';
import AttachmentIcon from '@rsuite/icons/Attachment';
import BarChartIcon from '@rsuite/icons/BarChart';
import LogoAnalytics from '@rsuite/icons/legacy/LogoAnalytics';
import Dashboard from '@rsuite/icons/Dashboard';
import Group from '@rsuite/icons/legacy/Group';
import Magic from '@rsuite/icons/legacy/Magic';
import GearCircle from '@rsuite/icons/legacy/GearCircle';
import PeoplesIcon from '@rsuite/icons/Peoples';
import DeviceIcon from '@rsuite/icons/Device';
import TreeIcon from '@rsuite/icons/Tree';
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';

const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34b3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };
  

const SidebarNav = ({ appearance, ...props }) => {
    const [expand, setExpand] = React.useState(true);
    
    //Conexion con las rutas y eventos de navegacion
    let match = useNavigate();
    function handleClick(event) {
        match(event);
    }
    
    return (
        <Sidebar 
            style={{ display: 'flex', flexDirection: 'column' }}
            width={expand ? 260 : 56}
            collapsible
        >
            <Sidenav.Header>
                <div style={headerStyles}>
                    <LogoAnalytics style={{ fontSize: 20 }} />
                    <span style={{ marginLeft: 12 }}> 365Beauty Salon</span>
                </div>
            </Sidenav.Header>
            <Sidenav 
                appearance={appearance} 
                defaultOpenKeys={['3', '4']}
            >
                <Sidenav.Body>
                    <Nav {...props}>
                        <Nav.Item style={{ textDecoration: 'none' }} eventKey="1" active icon={<Dashboard />}>
                        Dashboard
                        </Nav.Item>
                        <Nav.Item style={{ textDecoration: 'none' }} eventKey="2" icon={<BarChartIcon />}>
                        Ventas
                        </Nav.Item>
                        <Nav.Item style={{ textDecoration: 'none' }} eventKey="3" icon={<AttachmentIcon />}>
                        Inventario
                        </Nav.Item>
                        <Nav.Item  style={{ textDecoration: 'none' }} eventKey="4" onSelect={() => handleClick('clientes')} icon={<PeoplesMapIcon />}>
                        Clientes
                        </Nav.Item>
                        <Dropdown eventKey="5" title="SAR" icon={<Magic />}>
                            <Dropdown.Item eventKey="5-1">Establecimientos</Dropdown.Item>
                            <Dropdown.Item eventKey="5-2">Puntos de Venta</Dropdown.Item>
                            <Dropdown.Item eventKey="5-3">Tipo de Documento</Dropdown.Item>
                            <Dropdown.Item eventKey="5-4">Documentos de Autorización</Dropdown.Item>
                        </Dropdown>
                        <Dropdown eventKey="6" title="Configuraciones" icon={<GearCircle />}>
                            <Dropdown.Item 
                                onSelect={() => handleClick('empleados')}
                                eventKey="6-1" icon={<PeoplesIcon/>}>Empleados</Dropdown.Item>
                            <Dropdown.Item eventKey="6-2" icon={<DeviceIcon/>}>Maquinaria</Dropdown.Item>
                            <Dropdown.Menu eventKey="6-5" title="Inventario">
                            <Dropdown.Item eventKey="6-3" icon={<TreeIcon/>}>Categorias</Dropdown.Item>
                            <Dropdown.Item eventKey="6-5-2" icon={<TagFilterIcon/>}>Unidades</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    );
}

export default SidebarNav;