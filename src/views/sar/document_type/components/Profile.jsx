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
  const [doc_types, setDoc_types] = React.useState({
    _id: '',
    nombre: '',
    prefijo: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaDocs() {
    match("/admin/sar/tipo_documento");
  }

  // Recuperar info de tipo de documento a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/documentos_fiscal/'+props.id)
      .then((response) => {
        if (response!==error) {
          setDoc_types(response.data);
          setLoading(true);
        } else {
          console.log(response);
          setError(response);
          setLoading(true);
        }
      })
  }, [error, props.id]);

  function handleClick() {
    match('/admin/sar/tipo_documento/editar/'+props.id);
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
                <p>{doc_types.nombre}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Prefijo</span>
                </h4>
                <p>{doc_types.prefijo}</p>  
                <h4 className="page-heading">
                  <span className="page-heading-text">Activo</span>
                </h4>
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