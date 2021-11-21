import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Sidebar,
    Sidenav,
    Nav,
    Dropdown
} from 'rsuite';

import TagFilterIcon from '@rsuite/icons/TagFilter';
import AttachmentIcon from '@rsuite/icons/Attachment';
import BarChartIcon from '@rsuite/icons/BarChart';
import LogoAnalytics from '@rsuite/icons/legacy/LogoAnalytics';
import Dashboard from '@rsuite/icons/Dashboard';
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
    style={{ 
      position: 'fixed', 
      flexDirection: 'column', 
      display: 'flex'
    }}
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
        appearance="subtle"
        defaultOpenKeys={['5', '4']}
        expanded={expand}
      >
        <Sidenav.Body>
          <Nav {...props}>
            <Nav.Item style={{ textDecoration: 'none' }} eventKey="1" active icon={<Dashboard />}>
            Dashboard
            </Nav.Item>
            <Nav.Item style={{ textDecoration: 'none' }} eventKey="2" onSelect={() => handleClick('/pos')} icon={<BarChartIcon />}>
            Ventas
            </Nav.Item>
            <Nav.Item style={{ textDecoration: 'none' }} eventKey="3" icon={<AttachmentIcon />}>
            Inventario
            </Nav.Item>
            <Nav.Item  style={{ textDecoration: 'none' }} eventKey="4" onSelect={() => handleClick('clientes')} icon={<PeoplesMapIcon />}>
            Clientes
            </Nav.Item>
            <Dropdown eventKey="5" title="SAR" icon={<Magic />}>
              <Dropdown.Item eventKey="5-4" onSelect={() => handleClick('sar/documentos_autorizacion')}>Documentos de Autorización</Dropdown.Item>
              <Dropdown.Item eventKey="5-1" onSelect={() => handleClick('sar/establecimiento')}>Establecimientos</Dropdown.Item>
              <Dropdown.Item eventKey="5-2" onSelect={() => handleClick('sar/punto_venta')}>Puntos de Venta</Dropdown.Item>
              <Dropdown.Item eventKey="5-3" onSelect={() => handleClick('sar/tipo_documento')}>Tipo de Documento</Dropdown.Item>
            </Dropdown>
            <Dropdown eventKey="6" title="Configuraciones" icon={<GearCircle />}>
              <Dropdown.Item 
                  onSelect={() => handleClick('empleados')}
                  eventKey="6-1" icon={<PeoplesIcon/>}>Empleados</Dropdown.Item>
              <Dropdown.Item eventKey="6-2" icon={<DeviceIcon/>}>Maquinaria</Dropdown.Item>
              <Dropdown.Item eventKey="6-5-2" onSelect={() => handleClick('metodo_pago')} icon={<TagFilterIcon/>}>Metodos de Pago</Dropdown.Item>
              <Dropdown.Item eventKey="6-3" onSelect={() => handleClick('inventario/categorias')} icon={<TreeIcon/>}>Categorias</Dropdown.Item>
              <Dropdown.Item eventKey="6-5-2" onSelect={() => handleClick('inventario/unidades')} icon={<TagFilterIcon/>}>Unidades</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
}

export default SidebarNav;