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
  nombre: StringType("El nombre debe ser de tipo texto.").isRequired('Es obligatorio escribir el nombre.'),
  code: NumberType("El código debe ser un número.").isRequired('Es obligatorio escribir el código.'),
});

// Plantilla para campos del formulario
const TextField = ({ name, label, value, accepter, ...rest }) => (
  <Form.Group controlId={`${name}-8`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...rest} />
  </Form.Group>
);

const FormClient = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombre: '',
    code: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function volverListaUnds() {
    match("/admin/inventario/unidades/");
  }
  function verNuevaUnd(id) {
    match("/admin/inventario/unidades/"+id);
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
        const apiRes = await axios.post('https://beauty365api.herokuapp.com/api/v1/unidades/create', 
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
              verNuevaUnd(res.data._id);
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
        console.log(error)
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
          <TextField name="code" label="Código" />
          <TextField name="nombre" label="Nombre" />

          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Agregar</Button>
              <Button appearance="default" onClick={volverListaUnds}>Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vacíos o datos inválidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el cliente en estos momentos" />: null) }
      </>
    );
  }
};

export default FormClient;