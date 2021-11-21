import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import qs from 'qs';
import axios from 'axios';

import {
  Divider,
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
  const [cliente, setCliente] = React.useState({
    nombres: '',
    telefono: '',
    dni: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaClientes() {
    match("/admin/clientes");
  }

  // Recuperar info del cliente a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/clientes/'+props.id)
      .then((response) => {
        if (response!==error) {
          setCliente(response.data);
          setLoading(true);
        } else {
          setError(response);
          setLoading(true);
        }
      })
  }, []);

  function handleClick() {
    match('/admin/clientes/editar/'+props.id);
  }
 
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    return (
      <>
        <Grid fluid>
          <Panel bordered>
            <h3 class="page-heading">
              <span class="page-heading-text">Detalles</span>
            </h3>
            <Row>
              <Col>
                <ButtonToolbar>
                  <IconButton appearance="primary" onClick={handleClick} icon={<Edit2 />}>Editar</IconButton>
                  <Button appearance="default" onClick={volverListaClientes} >Cancelar</Button>
                </ButtonToolbar>
                <div class="markdown"> 
                  <h4 class="page-heading">
                    <span class="page-heading-text">Nombre</span>
                  </h4>
                  <p>{cliente.nombres}</p>
                  <h4 class="page-heading">
                    <span class="page-heading-text">Teléfono</span>
                  </h4>
                  <p>{cliente.telefono}</p>
                  <h4 class="page-heading">
                    <span class="page-heading-text">DNI</span>
                  </h4>
                  <p>{cliente.dni}</p>
                  <h4 class="page-heading">
                    <span class="page-heading-text">Email</span>
                  </h4>
                  <p>{cliente.email}</p>
                  <br />
                  <Tag color="green">ACTIVO</Tag>
                </div>    
              </Col>
            </Row>
          </Panel>
        </Grid>
      </>
    );
  }
};

export default Profile;