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

const { StringType } = Schema.Types;

// Modelo de esquema de datos
const model = Schema.Model({
  nombre: StringType().isRequired('Es obligatorio escribir el nombre.'),
  prefijo: StringType().isRequired('Es obligatorio escribir el prefijo.')
});

// Plantilla para campos del formulario
const TextField = ({ name, label, value, accepter, ...rest }) => (
  <Form.Group controlId={`${name}-7`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} value={value} accepter={accepter} {...rest} />
  </Form.Group>
);

const FormUnd = (props) => {
  // const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombre: '',
    prefijo: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function volverListaUnds() {
    match("/admin/inventario/unidades");
  }
  function verEditUnd(id) {
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

  // Recuperar info de la unidad a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/unidades/'+props.id)
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
    setLoading(false);
    // VERIFICAR: Errores en el formulario
    if (Object.keys(formError).length === 0) {
      setShowErrorEmptyForm(false);
      setShowError(false);
      // VERIFICAR: Campos vacios
      if (formValue.nombre === "" || formValue.code === "") {
        console.log(formError, 'Form Error');
        setShowErrorEmptyForm(true); // ERROR. Campos vacios
        setLoading(true);
      } else {
        try {
          // PUT request using axios
          const apiRes = await axios.put('https://beauty365api.herokuapp.com/api/v1/unidades/'+props.id, qs.stringify(formValue), {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(function(res) {
            console.log(res);
            // VERIFICAR: ¿Error en la respuesta del servidor?
            if (res!==error) {
              if (res.status === 200) {
                // SUCCESS: La unidad fue editada
                setShowError(false);
                console.log(res.data, "SUCCESS");
                verEditUnd(res.data._id);
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
          <TextField name="code" label="Código" value={formValue.code} />

          <Form.Group controlId="nombre">
            <Form.ControlLabel>Nombre</Form.ControlLabel>
            <Form.Control name="nombre" value={formValue.nombre} />
            <Form.HelpText tooltip>000</Form.HelpText>
          </Form.Group>

          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Guardar Cambios</Button>
              <Button appearance="default" onClick={volverListaUnds} >Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vacíos o datos inválidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el tipo de unidad en estos momentos" />: null) }
      </>
    );
  }
};

export default FormUnd;