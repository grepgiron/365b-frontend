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
  code: NumberType("El codigo debe ser de tipo numero.").isRequired('Es obligatorio escribir el codigo.')
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
    code: '',
    nombre: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function volverListaCategorias() {
    match("/admin/inventario/categorias");
  }
  function verEditCategoria(id) {
    match("/admin/inventario/categorias/show/"+id);
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

  // Recuperar info del Categoria a editar segun ID
  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/categorias/'+props.id)
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
        const apiRes = await axios.put('https://beauty365api.herokuapp.com/api/v1/categorias/'+props.id, qs.stringify(formValue), {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(res) {
          // VERIFICAR: ??Error en la respuesta del servidor?
          if (res!==error) {
            if (res.status === 200) {
              // SUCCESS: El Categoria fue editado
              setShowError(false);
              verEditCategoria(res.data._id);
            } else {
              // ERROR: HTTP Status != 200
              console.log(res)
              setShowError(true);
              setLoading(true);
            }
          } else {
            // ERROR: Servidor
            console.log(res)
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
          <TextField name="code" label="Codigo" value={formValue.code} />
          <TextField name="nombre" label="Nombre" value={formValue.nombre} />

          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Guardar Cambios</Button>
              <Button appearance="default" onClick={volverListaCategorias} >Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vac??os o datos inv??lidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el Categoria en estos momentos" />: null) }
      </>
    );
  }
};

export default FormClient;