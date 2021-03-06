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
  telefono: NumberType("El telefono debe ser de tipo numero.").isRequired('Es obligatorio escribir el telefono.'),
  rtn: NumberType("El rtn debe ser de tipo numero.").isRequired('Es obligatorio escribir el rtn.'),
  email: StringType("El email debe ser de tipo email.").isEmail().isRequired('Es obligatorio escribir el email.'),
  direccion: StringType("La direccion debe ser de tipo texto.").isRequired('Es obligatorio escribir el direccion.'),
});

// Plantilla para campos del formulario
const TextField = ({ name, label, value, accepter, ...rest }) => (
  <Form.Group controlId={`${name}-11`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} value={value} accepter={accepter} {...rest} />
  </Form.Group>
);

const FormEstablishment = (props) => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombre: '',
    rtn: '',
    telefono: '',
    email: '',
    direccion: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function volverListaEstablecimientos() {
    match("/admin/sar/establecimiento");
  }
  function verEditEstablecimiento(id) {
    match("/admin/sar/establecimiento/show/"+id);
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

  // Recuperar info de tipo de documento a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/comerciales/'+props.id)
      .then((response) => {
        if (response!==error) {
          setFormValue(response.data);
          setLoading(true);
        } else {
          setError(response);
          setLoading(true);
        }
      })
  }, [error, props.id]);

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
        // PUT request using axios
        const apiRes = await axios.put('https://beauty365api.herokuapp.com/api/v1/comercio/'+props.id, qs.stringify(formValue), {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(res) {
          console.log(res);
          // VERIFICAR: ??Error en la respuesta del servidor?
          if (res!==error) {
            if (res.status === 200) {
              // SUCCESS: El tipo de documento fue editada
              setShowError(false);
              verEditEstablecimiento(res.data._id);
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
      return;
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
          <TextField name="nombre" label="Nombre" />
          <TextField name="telfono" label="Telefono" />
          <TextField name="rtn" label="RTN" />
          <TextField name="email" label="Email" />
          <TextField name="direccion" label="Direccion" />
          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Guardar Cambios</Button>
              <Button appearance="default" onClick={volverListaEstablecimientos} >Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vac??os o datos inv??lidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el tipo de documento en estos momentos" />: null) }
      </>
    );
  }
};

export default FormEstablishment;