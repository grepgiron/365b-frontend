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
import CheckIcon from '@rsuite/icons/Check';

function Profile(props) {
  const [cliente, setCliente] = React.useState([]);
  const [ detalle, setDetalle] = React.useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaClientes() {
    match("/admin/citas");
  }

  // Recuperar info del cliente a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/citas/'+props.id)
      .then((response) => {
        if (response!==error) {
          setCliente(response.data);
          setLoading(true);
          axios.get('https://beauty365api.herokuapp.com/api/v1/citas/detalle/'+response.data._id)
          .then((response) => {
            if (response!==error) {
              setDetalle(response.data[0]);
              console.log(response.data);
              setLoading(true);
            } else {
              console.log(response);
              setError(response);
              setLoading(true);
            }
          })
        } else {
          console.log(response);
          setError(response);
          setLoading(true);
        }
      })
      
  }, [error, props.id]);

  function handleClick() {
    match('/admin/citas/editar/'+props.id);
  }
  function detalleCita() {
    match('/admin/citas/detalle/'+props.id);
  }
 
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    let hora = new Date(cliente.fecha);
    return (
      <Grid fluid>
        <Panel>
          <Row>
            <Col xs={24} md={8} lg={6}>
              <h4 className="page-heading">
                <span className="page-heading-text">Detalle de Cita</span>
              </h4>
            </Col>
            <Col xs={24} md={13} lg={12} mdPush={4} lgPush={7}>
              <ButtonToolbar className="inner-left">
                <IconButton appearance="primary" onClick={handleClick} icon={<Edit2 />}>Editar</IconButton>
                {detalle.completado != null && detalle.completado != true ? <IconButton appearance="primary" color="green" onClick={detalleCita} enabled icon={<CheckIcon/>}>Completar</IconButton> : <IconButton appearance="primary" color="cyan" onClick={detalleCita} disabled icon={<CheckIcon/>}>Completado</IconButton>}
                <Button appearance="default" onClick={volverListaClientes} >Volver</Button>
              </ButtonToolbar>
            </Col>
            <Col xs={24}>
              <div className="markdown">
                <h4 className="page-heading">
                  <span className="page-heading-text">Nombre</span>
                </h4>
                <p>{cliente.nombre}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Teléfono</span>
                </h4>
                <p>{cliente.telefono ? cliente.telefono : "-"}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">DNI</span>
                </h4>
                <p>{cliente.dni}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Email</span>
                </h4>
                <p>{cliente.email}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Fecha</span>
                </h4>
                <p>{hora.getHours() > 12 ? hora.getHours()+':'+hora.getMinutes()+' PM' : hora.getHours()+':'+hora.getMinutes()+' AM'}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Comentario</span>
                </h4>
                <p>{cliente.comentario}</p>
                <br />
                {detalle.completado != null && detalle.completado != true ? <Tag color="cyan">En Proceso</Tag> : <Tag color="green">Completado</Tag>}
              </div>    
            </Col>
          </Row>
        </Panel>
      </Grid>
    );
  }
};

export default Profile;