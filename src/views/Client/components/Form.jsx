import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Input,
  Message
} from 'rsuite';

const { StringType, NumberType } = Schema.Types;

// Modelo de esquema de datos
const model = Schema.Model({
  nombres: StringType().isRequired('Es obligatorio escribir el nombre.'),
  telefono: StringType().isRequired('Es obligatorio escribir el teléfono.'),
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
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombres: '',
    telefono: '',
    dni: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function cancelarNuevo() {
    console.log("Cancelar agregar nuevo cliente");
    match("/admin/clientes");
  }
  
  const handleSubmit = async() => {
    // if (!formRef.current.check()) {
    //   console.error('Form Error');
    //   return;
    // }
    let apiRes = null;
    try {
      if (Object.keys(formError).length === 0) {
        console.log(formValue, 'Form Value');
        // POST request using axios
        const response = await axios({
          method: "POST",
          url: 'https://beauty365api.herokuapp.com/api/v1/clientes',
          data: formValue,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
      }
      else {
        console.log(formError, 'Form Error');
      }
    } catch(error) {
      console.log(error)
    } finally {
      console.log(apiRes);
      if (apiRes!==error) {
        setFormValue(apiRes.data);
        setLoading(true);
      } else {
        setFormError(apiRes);
        setLoading(true);
      }
    }
  };
 
  useEffect(() => {
    setLoading(true);
  }, []);

  if (error) {
    return (
      // <div>Error: {error.message}</div>
      <Message showIcon type="error">
        Error. {error.message}
      </Message>
    );
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Form
        onChange={setFormValue}
        onCheck={setFormError}
        formValue={formValue}
        model={model}
        fluid
      >
        <TextField name="nombres" label="Nombre" value=""  />
        <TextField name="telefono" label="Telefono" value="" />
        <TextField name="dni" label="DNI" value="" />
        <TextField name="email" label="Email" value="" />
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit}>Agregar</Button>
            <Button appearance="primary">Editar</Button>
            <Button appearance="default" onClick={cancelarNuevo}>Cancelar</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    );
  }
};

export default FormClient;