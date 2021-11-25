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
  const [servicio, setServicio] = React.useState({
    nombres: '',
    telefono: '',
    dni: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaServicios() {
    match("/admin/servicios");
  }

  // Recuperar info del servicio a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/servicios/'+props.id, {
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/x-www-form-urlencoded" }
    }).then((response) => {
      var item;
      if (response!==error) {
        item = response.data;
        return axios.get('https://beauty365api.herokuapp.com/api/v1/categorias/'+item.categoria, {
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/x-www-form-urlencoded" }
        }).then((res) => {
          if (res!==error) {
            item.categoria = res.data.nombre;
          }
          return item;
        });
      } else {
        item = response;
        return item;
      }
    }).then((data) => {
      if (data!==error) {
        setServicio(data);
        setLoading(true);
      } else {
        console.log(data);
        setError(data);
        setLoading(true);
      }
    });
  }, [error, props.id]);

  function handleClick() {
    match('/admin/servicios/editar/'+props.id);
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
                <Button appearance="default" onClick={volverListaServicios} >Volver a lista</Button>
              </ButtonToolbar>
            </Col>
            <Col xs={24}>
              <div className="markdown">
                <h4 className="page-heading">
                  <span className="page-heading-text">Código</span>
                </h4>
                <p>{servicio.code}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Nombre</span>
                </h4>
                <p>{servicio.nombre}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Descripcion</span>
                </h4>
                <p>{servicio.descripcion ? servicio.descripcion : "-"}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Detalle</span>
                </h4>
                <p>{servicio.detalle ? servicio.detalle : "-"}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Precio</span>
                </h4>
                <p>{servicio.precio}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Categoría</span>
                </h4>
                <p>{servicio.categoria}</p>
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