import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import qs from 'qs';
import axios from 'axios';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Message,
  Divider,
  Loader,
  Row,
  Col,
  Input
} from 'rsuite';

const { StringType, NumberType } = Schema.Types;
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

// Modelo de esquema de datos
const model = Schema.Model({
  nombre: StringType("El nombre debe ser de tipo texto.").isRequired('Es obligatorio escribir el nombre.'),
  telefono: NumberType("El teléfono debe ser un número."),
  dni: NumberType("El DNI debe ser un número.").isRequired('Es obligatorio escribir el DNI.'),
  email:  StringType("El email debe ser de tipo texto.").isEmail('Por favor ingrese un correo válido.'),
});

// Plantilla para campos del formulario
const TextField = ({ name, label, value, accepter, ...rest }) => (
  <Form.Group controlId={`${name}-4`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...rest} />
  </Form.Group>
);

const FormClient = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombres: '',
    telefono: '',
    dni: '',
    email: '',
    fecha: '',
    comentario: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function volverListaCitas() {
    match("/admin/citas");
  }
  function verNuevoCliente(id) {
    match("/admin/citas/");
  }
  
  // Mensaje de error
  const ErrMessage = (props) => {
    return (
      <div>
        <Divider />
        <Message showIcon type="error">{props.mensaje}</Message>
      </div>
    );
  };
 
  useEffect(() => {
    setLoading(true);
  }, []);

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
        const apiRes = await axios.post('https://beauty365api.herokuapp.com/api/v1/citas/create', 
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
              setShowError(false);
              verNuevoCliente(res.data._id);
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
    return (
      <>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          fluid
        >
          <Row>
            <Col xs={12}>
              <TextField name="nombre" label="Nombre" />
              <TextField name="email" label="Email" />
            </Col>
              <Col xs={12}>
                <TextField name="telefono" label="Telefono" />
                <TextField name="dni" label="DNI" />
              </Col>
          </Row>
          <Row style={{ marginTop: 20, marginBottom: 20}}>
            <Col xs={12} md={12}>
              <TextField name="fecha" label="Fecha y Hora" type="datetime-local"/>
              <TextField name="comentario" label="Comentario" accepter={Textarea} row={4}/>
            </Col>
          </Row>
          
          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Agregar</Button>
              <Button appearance="default" onClick={volverListaCitas}>Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vacíos o datos inválidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el cliente en estos momentos" />: null) }
      </>
    );
  }
};

export default FormClient;