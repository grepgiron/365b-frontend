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
  Loader
} from 'rsuite';

const { StringType, NumberType } = Schema.Types;

// Modelo de esquema de datos
const model = Schema.Model({
  nombres: StringType().isRequired('Es obligatorio escribir el nombre.'),
  telefono: NumberType().isRequired('Es obligatorio escribir el teléfono.'),
  dni: NumberType().isRequired('Es obligatorio escribir el DNI.'),
  email:  StringType().isEmail('Por favor ingrese un correo válido.').isRequired('El campo email es obligatorio.'),
});

// Plantilla para campos del formulario
const TextField = ({ name, label, value, accepter, ...rest }) => (
  <Form.Group controlId={`${name}-4`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...rest} />
  </Form.Group>
);

const FormClient = () => {
  // const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombres: '',
    telefono: '',
    dni: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function volverListaClientes() {
    match("/admin/clientes");
  }
  function verNuevoCliente(id) {
    match("/admin/clientes/"+id);
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
    // if (!formRef.current.check()) {
    //   console.error('Form Error');
    //   return;
    // }
    setLoading(false);
    // VERIFICAR: Errores en el formulario
    if (Object.keys(formError).length === 0) {
      setShowErrorEmptyForm(false);
      setShowError(false);
      // VERIFICAR: Campos vacios
      if (formValue.nombres === "" || formValue.telefono === "" || formValue.dni === "" || formValue.email === "") {
        console.log(formError, 'Form Error');
        setShowErrorEmptyForm(true); // ERROR. Campos vacios
        setLoading(true);
      } else {
        try {
          const apiRes = await axios.post('https://beauty365api.herokuapp.com/api/v1/clientes', 
          qs.stringify(formValue), {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {
            console.log(res);
            // VERIFICAR: ¿Error en la respuesta del servidor?
            if (res!==error) {
              if (res.status === 200) {
                // SUCCESS: El cliente fue editado
                setShowError(false);
                console.log(res.data, "SUCCESS");
                verNuevoCliente(res.data._id);
              } else {
                // ERROR: HTTP Status != 200
                setShowError(true);
                setLoading(true);
              }
            } else {
              // ERROR: Servidor
              setShowError(true);
              setLoading(true);
            }
          });
        } catch(error) {
          // ERROR: Servidor
          setShowError(true);
          console.log(error)
          setLoading(true);
        }
      }
    }
    else {
      console.log(formError, 'Form Error');
      setShowErrorEmptyForm(true); // ERROR. Campos vacios o datos invalidos
      setLoading(true);
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
          onSubmit={handleSubmit}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          fluid
        >
          <TextField name="nombres" label="Nombre" />
          <TextField name="telefono" label="Telefono" />
          <TextField name="dni" label="DNI" />
          <TextField name="email" label="Email" />

          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Agregar</Button>
              <Button appearance="default" onClick={volverListaClientes}>Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vacíos o datos inválidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el cliente en estos momentos" />: null) }
      </>
    );
  }
};

export default FormClient;