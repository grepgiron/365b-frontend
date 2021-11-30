import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
  Grid,
  Panel,
  Row,
  Col,
  Tag,
  IconButton,
  Message,
  Loader,
  Button,
  ButtonToolbar
} from 'rsuite';

import Edit2 from '@rsuite/icons/legacy/Edit2';

function Profile(props) {
  const [sales_point, setSales_point] = React.useState({
    _id: '',
    establecimiento: {
      _id: '',
      nombre: '',
      prefijo: ''
    },
    documento_fiscal: {
      _id: '',
      nombre: '',
      prefijo: ''
    },
    pos: {
      _id: '',
      nombre: '',
      prefijo: ''
    },
    fecha_limite: '',
    cai: '',
    rango_inicial: '',
    rango_final: '',
    is_active: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaDocs() {
    match("/admin/sar/documentos_autorizacion");
  }

  // Recuperar info de documento de autorización a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/documentos_autorizados/'+props.id)
      .then((response) => {
        if (response!==error) {
          setSales_point(response.data);
          setLoading(true);
        } else {
          console.log(response);
          setError(response);
          setLoading(true);
        }
      })
  }, [error, props.id]);

  function handleClick() {
    match('/admin/sar/documentos_autorizacion/editar/'+props.id);
  }
 
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    return (
      <Grid fluid>
        <Panel bordered>
          <Row>
            <Col xs={24} md={8} lg={6}>
              <h3 className="page-heading">
                <span className="page-heading-text">Detalles</span>
              </h3>
            </Col>
            <Col xs={24} md={13} lg={12} mdPush={4} lgPush={7}>
              <ButtonToolbar className="inner-left">
                <IconButton appearance="primary" onClick={handleClick} icon={<Edit2 />}>Editar</IconButton>
                <Button appearance="default" onClick={volverListaDocs} >Volver a lista</Button>
              </ButtonToolbar>
            </Col>
            <Col xs={24}>
              <div className="markdown">
                <h4 className="page-heading">
                  <span className="page-heading-text">Establecimiento</span>
                </h4>
                <p>{sales_point.establecimiento.nombre}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Punto de Venta</span>
                </h4>
                <p>{sales_point.pos.nombre}</p>  
                <h4 className="page-heading">
                  <span className="page-heading-text">Documento Fiscal</span>
                </h4>
                <p>{sales_point.documento_fiscal.nombre}</p>  
                <h4 className="page-heading">
                  <span className="page-heading-text">CAI</span>
                </h4>
                <p>{sales_point.cai}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Fecha Limite</span>
                </h4>
                <p>{sales_point.fecha_limite}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Rango Inicial</span>
                </h4>
                <p>{sales_point.rango_inicial}</p>  
                <h4 className="page-heading">
                  <span className="page-heading-text">Rango Final</span>
                </h4>
                <p>{sales_point.rango_final}</p> 
                <h4 className="page-heading">
                  <span className="page-heading-text">Formato de Factura</span>
                </h4>
                <p>{
                sales_point.establecimiento.prefijo+'-'+
                sales_point.pos.prefijo+'-'+
                sales_point.documento_fiscal.prefijo+'-'}</p> 
                { sales_point.is_active ? <Tag color="green">Activo</Tag> : <Tag color="red">Inactivo</Tag>}
              </div>    
            </Col>
          </Row>
        </Panel>
      </Grid>
    );
  }
};

export default Profile;