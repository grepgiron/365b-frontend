import React, { useState, useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import DocumentoAutorizado from './../../document_authorization/index'

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
import PlusIcon from '@rsuite/icons/Plus';

function Profile(props) {
  const [rango, setRango] = React.useState({
    _id: '',
    documento_autorizado: '',
    inicio: '',
    final: '',
    actual: ''
  });
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false)
  const [loading, setLoading] = React.useState(false);
  
  const match = useNavigate();
  function volverListaDocs() {
    match("/admin/sar/rango");
  }

  // Recuperar info de tipo de documento a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/rango')
      .then((response) => {
        if (response!==error) {
          setRango(response.data[0]);
          setEmpty(false)
          setLoading(true);
        } else {
          console.log(response);
          setEmpty(false)
          setError(response);
          setLoading(true);
        }
      }).catch((error) => {
        setEmpty(true);
        console.log(error);
      })
  }, [error, props.id]);

  function handleClick(event) {
    match(event);
  }
 
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if(!loading){
    return (
      <>
        <span>Aun no ha creado una autorizacion de documento del SAR</span>
        <br/>
        <IconButton appearance="primary" onClick={() => handleClick('/admin/sar/documentos_autorizacion/nuevo')} icon={<PlusIcon />}>Crear Documento</IconButton>
      </>
    )
  }else {
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
                <IconButton appearance="primary" onClick={()=>handleClick('/admin/sar/rango/editar/'+ props.id)} icon={<Edit2 />}>Editar</IconButton>
                <Button appearance="default" onClick={volverListaDocs} >Volver a lista</Button>
              </ButtonToolbar>
            </Col>
            <Col xs={24}>
              <div className="markdown">
                <h4 className="page-heading">
                  <span className="page-heading-text">Documento Autorizado</span>
                </h4>
                <p>{rango.documento_autorizado}</p>
                <h4 className="page-heading">
                  <span className="page-heading-text">Rango Incial</span>
                </h4>
                <p>{rango.inicio}</p>  
                <h4 className="page-heading">
                  <span className="page-heading-text">Rango Final</span>
                </h4>
                <p>{rango.final}</p>  
                <h4 className="page-heading">
                  <span className="page-heading-text"># Fact. Actual</span>
                </h4>
                <p>{rango.actual}</p>  
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