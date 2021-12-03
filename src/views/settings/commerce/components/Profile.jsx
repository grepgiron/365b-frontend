import React, { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import FormNew from './../pages/New'

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
  const [establecimientos, setEstablecimientos] = React.useState({
    _id: '',
    nombre: '',
    rtn: '',
    telefono: '',
    email: '',
    direccion: ''
  });
  const [error, setError] = useState(null);
  const [ empty, setEmpty ] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaDocs() {
    match("/admin/comercio/show");
  }

  // Recuperar info de tipo de documento a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/comerciales')
      .then((response) => {
        //console.log(response)
        if (response!==error) {
          console.log(response.data[0])
          setEstablecimientos(response.data[0]);
          setLoading(true);
        } else {
          //console.log(response);
          setError(response);
          setLoading(false);
        }
      }).catch((error) => {
        setLoading(false);
        setEmpty(true);
        console.log(error);
      })
  }, [error, props.id]);

  function handleClick() {
    match('/admin/comercio/editar/'+establecimientos._id);
  }
 
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <FormNew />;
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
                <p>{establecimientos.nombre}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Telefono</span>
                </h4>
                <p>{establecimientos.telefono}</p>  
                <h4 className="page-heading">
                  <span className="page-heading-text">RTN</span>
                </h4>
                <p>{establecimientos.rtn}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Email</span>
                </h4>
                <p>{establecimientos.email}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Direccion</span>
                </h4>
                <p>{establecimientos.direccion}</p>  
                
              </div>    
            </Col>
          </Row>
        </Panel>
      </Grid>
    );
  }
};

export default Profile;