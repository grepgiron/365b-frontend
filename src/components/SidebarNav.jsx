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
import EventDetailIcon from '@rsuite/icons/EventDetail';
import TagIcon from '@rsuite/icons/Tag';

const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#402015',
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
        defaultOpenKeys={['0', '0']}
        expanded={expand}
      >
        <Sidenav.Body>
          <Nav {...props}>
            <Nav.Item style={{ textDecoration: 'none' }} eventKey="1" onSelect={() => handleClick('/admin')} icon={<Dashboard />}>
            Dashboard
            </Nav.Item>
            <Nav.Item style={{ textDecoration: 'none' }} eventKey="2" onSelect={() => handleClick('/pos')} icon={<BarChartIcon />}>
            Ventas
            </Nav.Item>
            <Nav.Item style={{ textDecoration: 'none' }} eventKey="3" onSelect={() => handleClick('servicios')} icon={<AttachmentIcon />}>
            Servicios
            </Nav.Item>
            <Nav.Item  style={{ textDecoration: 'none' }} eventKey="5" onSelect={() => handleClick('clientes')} icon={<PeoplesMapIcon />}>
            Clientes
            </Nav.Item>
            <Nav.Item  style={{ textDecoration: 'none' }} eventKey="6" onSelect={() => handleClick('inventario/productos')} icon={<TagIcon />}>
            Productos
            </Nav.Item>
            <Nav.Item  style={{ textDecoration: 'none' }} eventKey="7" onSelect={() => handleClick('citas')} icon={<EventDetailIcon />}>
            Citas
            </Nav.Item>
            <Dropdown eventKey="8" title="Configuraciones" icon={<GearCircle />}>
              <Dropdown.Item 
                  onSelect={() => handleClick('empleados')}
                  eventKey="8-1" icon={<PeoplesIcon/>}>Empleados</Dropdown.Item>
              <Dropdown.Item eventKey="8-2" onSelect={() => handleClick('comercio/show')} icon={<DeviceIcon/>}>Comercio</Dropdown.Item>
              <Dropdown.Item eventKey="8-5-2" onSelect={() => handleClick('metodo_pago')} icon={<TagFilterIcon/>}>Metodos de Pago</Dropdown.Item>
              <Dropdown.Item eventKey="8-3" onSelect={() => handleClick('inventario/categorias')} icon={<TreeIcon/>}>Categorias</Dropdown.Item>
              <Dropdown.Item eventKey="8-5-2" onSelect={() => handleClick('inventario/unidades')} icon={<TagFilterIcon/>}>Unidades</Dropdown.Item>
            </Dropdown>
            <Dropdown eventKey="9" title="SAR" icon={<Magic />}>
              <Dropdown.Item eventKey="9-4" onSelect={() => handleClick('sar/documentos_autorizacion')}>Documentos de Autorización</Dropdown.Item>
              <Dropdown.Item eventKey="9-1" onSelect={() => handleClick('sar/establecimiento')}>Establecimientos</Dropdown.Item>
              <Dropdown.Item eventKey="9-2" onSelect={() => handleClick('sar/punto_venta')}>Puntos de Venta</Dropdown.Item>
              <Dropdown.Item eventKey="9-3" onSelect={() => handleClick('sar/tipo_documento')}>Tipo de Documento</Dropdown.Item>
              <Dropdown.Item eventKey="9-3" onSelect={() => handleClick('sar/rango/show')}>Rango de Facturas</Dropdown.Item>
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Sidebar>
  );
}

export default SidebarNav;