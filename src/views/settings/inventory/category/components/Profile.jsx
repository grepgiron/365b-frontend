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
  const [categoria, setCategoria] = React.useState({
    code: '',
    nombre: ''

  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaClientes() {
    match("/admin/inventario/categorias");
  }

  // Recuperar info del cliente a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/categorias/'+props.id)
      .then((response) => {
        if (response!==error) {
          setCategoria(response.data);
          setLoading(true);
        } else {
          console.log(response);
          setError(response);
          setLoading(true);
        }
      })
  }, [error, props.id]);

  function handleClick() {
    match('/admin/inventario/categorias/editar/'+props.id);
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
                <Button appearance="default" onClick={volverListaClientes} >Volver a lista</Button>
              </ButtonToolbar>
            </Col>
            <Col xs={24}>
              <div className="markdown">
                <h4 className="page-heading">
                  <span className="page-heading-text">Codigo</span>
                </h4>
                <p>{categoria.code}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Nombre</span>
                </h4>
                <p>{categoria.nombre}</p>
                <br />
                <Tag color="green">ACTIVO</Tag>
              </div>    
            </Col>
          </Row>
        </Panel>
      </Grid>
    );
  }
};

export default Profile;