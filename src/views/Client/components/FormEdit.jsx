import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import qs from 'qs';
import axios from 'axios';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Input,
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
  <Form.Group controlId={`${name}-6`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} value={value} accepter={accepter} {...rest} />
  </Form.Group>
);

const FormClient = (props) => {
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
  
  // Mensaje de error
  const ErrMessage = (props) => {
    return (
      <div>
        <Divider />
        <Message showIcon type="error">{props.mensaje}</Message>
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

  const handleSubmit = async() => {
    // if (!formRef.current.check()) {
    //   console.error('Form Error');
    //   return;
    // }
    // VERIFICAR: Errores en el formulario
    if (Object.keys(formError).length === 0) {
      setShowErrorEmptyForm(false);
      setShowError(false);
      // VERIFICAR: Campos vacios
      if (formValue.nombres === "" || formValue.telefono === "" || formValue.dni === "" || formValue.email === "") {
        console.log(formError, 'Form Error');
        setShowErrorEmptyForm(true); // ERROR. Campos vacios
      } else {
        try {
          // PUT request using axios
          const apiRes = await axios.put('https://beauty365api.herokuapp.com/api/v1/clientes/'+props.id, qs.stringify(formValue), {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(function(res) {
            console.log(res);
            // VERIFICAR: ¿Error en la respuesta del servidor?
            if (res!==error) {
              if (res.status === 200) {
                // SUCCESS: El cliente fue editado
                setShowError(false);
                console.log(res.data, "SUCCESS");
                volverListaClientes();
              } else {
                // ERROR: HTTP Status != 200
                setShowError(true);
              }
            } else {
              // ERROR: Servidor
              setShowError(true);
            }
          });
        } catch(error) {
          // ERROR: Servidor
          setShowError(true);
          console.log(error)
        }
      }
    }
    else {
      console.log(formError, 'Form Error');
      setShowErrorEmptyForm(true); // ERROR. Campos vacios o datos invalidos
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
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          fluid
        >
          <TextField name="nombres" label="Nombre" value={formValue.nombres} />
          <TextField name="telefono" label="Telefono" value={formValue.telefono ? formValue.telefono:formValue.telefon} />
          <TextField name="dni" label="DNI" value={formValue.dni} />
          <TextField name="email" label="Email" value={formValue.email} />

          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Guardar Cambios</Button>
              <Button appearance="default" onClick={volverListaClientes} >Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vacíos o datos inválidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el cliente en estos momentos" />: null) }
      </>
    );
  }
};

export default FormClient;