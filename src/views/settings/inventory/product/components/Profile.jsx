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
    unidad: {},
    categoria: {},
    code: '',
    nombre: '',
    descripcion: '',
    precio: '',
    costo: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaDocs() {
    match("/admin/inventario/productos");
  }

  // Recuperar info de documento de autorización a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/productos/'+props.id)
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
    match('/admin/inventario/productos/editar/'+props.id);
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
                  <span className="page-heading-text">Nombre</span>
                </h4>
                <p>{sales_point.nombre}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Descripcion</span>
                </h4>
                <p>{sales_point.descripcion}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Unidad</span>
                </h4>
                <p>{sales_point.unidad ? sales_point.unidad.nombre : <p>Sin UND</p> }</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Categoria</span>
                </h4>
                <p>{sales_point.categoria ? sales_point.categoria.nombre : <p>Sin categoria</p>}</p>  
                <h4 className="page-heading">
                  <span className="page-heading-text">Precio</span>
                </h4>
                <p>Lps. {sales_point.precio}</p>  
                <h4 className="page-heading">
                  <span className="page-heading-text">Costo</span>
                </h4>
                <p>Lps. {sales_point.costo}</p> 
              </div>    
            </Col>
          </Row>
        </Panel>
      </Grid>
    );
  }
};

export default Profile;