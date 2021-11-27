import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
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

  const [payment, setPayment] = React.useState({
    nombre: '',
    dias_pago: '',
    credito: '',
    active: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaClientes() {
    match("/admin/metodo_pago");
  }

  // Recuperar info del cliente a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/metodos_pago/'+props.id)
      .then((response) => {
        if (response!==error) {
          setPayment(response.data);
          console.log(response.data);
          setLoading(true);
        } else {
          console.log(response);
          setError(response);
          setLoading(true);
        }
      })
  }, [error, props.id]);

  function handleClick() {
    match('/admin/metodo_pago/editar/'+props.id);
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
                  <span className="page-heading-text">Nombre</span>
                </h4>
                <p>{payment.nombre}</p>
                {/* <h4 className="page-heading">
                  <span className="page-heading-text">Teléfono</span>
                </h4>
                <p>{payment.telefono ? payment.telefono : "-"}</p> */}
                <h4 className="page-heading">
                  <span className="page-heading-text">Dias de Pago</span>
                </h4>
                <p>{payment.dias_pago}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Credito</span>
                </h4>
                <p>{payment.credito}</p>
                <>{payment.active ? <Tag color="green">ACTIVO</Tag> : <Tag color="red">Inactivo</Tag>}</>
                <br />
                
              </div>    
            </Col>
          </Row>
        </Panel>
      </Grid>
    );
  }
};

export default Profile;