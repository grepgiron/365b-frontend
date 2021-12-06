import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

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
  ButtonToolbar,
  Form,
  Checkbox
} from 'rsuite';

import Edit2 from '@rsuite/icons/legacy/Edit2';

// Plantilla para campos del formulario
const TextField = ({ name, label, value, accepter, ...rest }) => (
  <Form.Group controlId={`${name}-4`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...rest} />
  </Form.Group>
);

function Profile(props) {
  const { id } = useParams();
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState();
  const [cliente, setCliente] = React.useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);

  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  
  const match = useNavigate();
  function volverListaClientes() {
    match("/admin/citas");
  }

  // Recuperar info del cliente a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/citas/detalle/'+id)
      .then((response) => {
        if (response!==error) {
          setCliente(response.data[0]);
          setFormValue(response.data[0]);
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
    match('/admin/citas/editar/'+props.id);
  }

  const handleSubmit = async() => {
    setShowErrorEmptyForm(false);
    setShowError(false);
    // Verificar errores en el formulario
    if (!formRef.current.check()) {
      setShowErrorEmptyForm(true);
      console.error('Form Error');
      return;
    } else {
      setLoading(false);
      try {
        
        const apiRes = await axios.put(`https://beauty365api.herokuapp.com/api/v1/citas/detalle/${cliente._id}`,
        qs.stringify(formValue), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res) {
          // VERIFICAR: ¿Error en la respuesta del servidor?
          if (res!==error) {
            if (res.status === 200) {
              // SUCCESS: El cliente fue editado
              volverListaClientes();
              setShowError(false);
            } else {
              // ERROR: HTTP Status != 200
              console.log(res);
              setShowError(true);
              setLoading(true);
            }
          } else {
            // ERROR: Servidor
            console.log(res);
            setShowError(true);
            setLoading(true);
          }
        });
      } catch(error) {
        // ERROR: Servidor
        console.log(error);
        setShowError(true);
        setLoading(true);
      }
    }
  };
 
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    let hora = new Date(cliente.fecha);
    return (
      <Grid fluid>
        <Panel bordered>
          <Row>
            <Col xs={24} md={8} lg={10}>
              <h3 className="page-heading">
                <span className="page-heading-text">Detalles cita</span>
              </h3>
              <br/>
            </Col>
            <Col xs={24} md={0} lg={14} mdPush={2} lgPush={7}>
              <ButtonToolbar className="inner-left">
                <IconButton appearance="primary" onClick={handleSubmit} icon={<Edit2 />}>Guardar</IconButton>
              </ButtonToolbar>
            </Col>
            <Col xs={24}>
              <Form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  onChange={setFormValue}
                  onCheck={setFormError}
                  formValue={formValue}
                  fluid
              >
                  <Row>
                  <TextField name="empleado" label="Empleado" />
                    <Col xs={24} md={8} lg={12}>
                      <TextField name="hora_entrada" label="Hora Entrada" type="time" />
                    </Col>
                    <Col xs={24} md={8} lg={12}>
                      <TextField name="hora_salida" label="Hora Salida" type="time" />
                    </Col>
                  </Row>
                  <TextField name="servicio" label="Servicio" />
                  <TextField name="comentario_cliente" label="Comentario Cliente" />
                  <TextField name="comentario_admin" label="Comentario Extra" />
                  <TextField name="completado" label="Completado"
                    inline
                    accepter={Checkbox} 
                    value={'true'} 
                    checked={formValue.completado}
                    onChange={(e) => { setFormValue({ ...formValue, completado: !formValue.completado }) }}
                  />
                  <p>{cliente.completado != 1 ? <Tag color='cyan'>En proceso</Tag> : <Tag color='green'>Completado</Tag>}</p>
              </Form>  
            </Col>
          </Row>
        </Panel>
      </Grid>
    );
  }
};

export default Profile;