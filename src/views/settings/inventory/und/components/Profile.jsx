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
  const [und, setUnd] = React.useState({
    nombres: '',
    telefono: '',
    dni: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaUnds() {
    match("/admin/inventario/unidades");
  }

  // Recuperar info de unidad a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/unidades/'+props.id)
      .then((response) => {
        if (response!==error) {
          setUnd(response.data);
          setLoading(true);
        } else {
          setError(response);
          setLoading(true);
        }
      })
  }, []);

  function handleClick() {
    match('/admin/inventario/unidades/editar/'+props.id);
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
            <Row>
              <Col xs={24} md={8} lg={6}>
                <h3 class="page-heading">
                  <span class="page-heading-text">Detalles</span>
                </h3>
              </Col>
              <Col xs={24} md={13} lg={12} mdPush={4} lgPush={7}>
                <ButtonToolbar className="inner-left">
                  <IconButton appearance="primary" onClick={handleClick} icon={<Edit2 />}>Editar</IconButton>
                  <Button appearance="default" onClick={volverListaUnds} >Volver a lista</Button>
                </ButtonToolbar>
              </Col>
              <Col xs={24}>
                <div class="markdown">
                  <h4 class="page-heading">
                    <span class="page-heading-text">Code</span>
                  </h4>
                  <p>{und.code}</p>
                  <h4 class="page-heading">
                    <span class="page-heading-text">Nombre</span>
                  </h4>
                  <p>{und.nombre}</p>
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