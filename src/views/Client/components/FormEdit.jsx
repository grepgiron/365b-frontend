import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Input,
  Message,
  Divider
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
  <Form.Group controlId={`${name}-6`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} value={value} accepter={accepter} {...rest} />
  </Form.Group>
);

const FormClient = (props) => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombres: '',
    telefono: '',
    dni: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function cancelarEditar() {
    console.log(`Cancelar editar id: ${props.id}`);
    match("/admin/clientes");
  }
  
  // Mensaje de error
    const errMessage = ({ rowData, dataKey, ...props }) => {
      return (
        <div>
          <Divider />
          <Message showIcon type="error">
            Error. No fue posible editar el cliente.
          </Message>
        </div>
      );
    };
  
  // Recuperar info del cliente a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/clientes/'+props.id)
      .then((response) => {
        if (response!==error) {
          setFormValue(response.data);
          setLoading(true);
        } else {
          setError(response);
          setLoading(true);
        }
      })
  }, []);

  // const handleSubmit = async() => {
  const handleSubmit = async() => {
    // if (!formRef.current.check()) {
    //   console.error('Form Error');
    //   return;
    // }
    let apiRes = null;
    try {
      if (Object.keys(formError).length === 0) {
        console.log(formValue, 'Form Value');
        setShowError(false);
        // PUT request using axios
        apiRes = await axios.put('https://beauty365api.herokuapp.com/api/v1/clientes/'+props.id, formValue);
      }
      else {
        console.log(formError, 'Form Error');
      }
    } catch(error) {
      setShowError(true);
      console.log(error)
    } finally {
      console.log(apiRes);
      if (apiRes!==error) {
        setShowError(false);
        setFormValue(apiRes.data);
        setLoading(true);
      } else {
        setShowError(true);
        setFormError(apiRes);
        setLoading(true);
      }
    }
  };
 
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
      <>
        <Form
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          layout="horizontal"
        >
          <TextField name="nombres" label="Nombre" value={formValue.nombres} />
          <TextField name="telefono" label="Telefono" value={formValue.telefono ? formValue.telefono:formValue.telefon} />
          <TextField name="dni" label="DNI" value={formValue.dni} />
          <TextField name="email" label="Email" value={formValue.email} />

          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Guardar Cambios</Button>
              <Button appearance="default" onClick={cancelarEditar} >Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showError ? <errMessage /> : null }
      </>
    );
  }
};

export default FormClient;