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
  SelectPicker
} from 'rsuite';

const { StringType, NumberType } = Schema.Types;

// Modelo de esquema de datos
const model = Schema.Model({
  code: NumberType("El código debe ser un número.").isRequired('Es obligatorio escribir el código.'),
  nombre: StringType("El nombre debe ser de tipo texto.").isRequired('Es obligatorio escribir el nombre.'),
  descripcion: StringType("La descripción debe ser de tipo texto."),
  detalle: StringType("El detalle del servicio debe ser de tipo texto."),
  precio: NumberType("El precio debe ser un número.").isRequired('Es obligatorio ingresar el precio.'),
  categoria: StringType("La categoría debe ser de tipo texto.").isRequired('Es obligatorio selecconar una categoría.')
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
  const [formCats, setFormCats] = React.useState([]);
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    code: '',
    nombre: '',
    descripcion: '',
    detalle: '',
    precio: '',
    categoria: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function volverListaServicios() {
    match("/admin/servicios");
  }
  function verNuevoServicio(id) {
    match("/admin/servicios/"+id);
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
 
  
  // Recuperar info del servicio a editar segun ID y lista de categorias
  useEffect(() => {
    // GET request using axios for categorias
    axios.get('https://beauty365api.herokuapp.com/api/v1/categorias', {
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/x-www-form-urlencoded" }
    }).then((response) => {
      if (response!==error) {
        let data = response.data.map(a => { return { label: a.nombre, value: a._id} })
        setFormCats(data);
        setLoading(true);
      } else {
        setError(response);
        setLoading(true);
      }
    });
  }, [error]);

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
        const apiRes = await axios.post('https://beauty365api.herokuapp.com/api/v1/servicios/create', 
        qs.stringify(formValue), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res) {
          // VERIFICAR: ¿Error en la respuesta del servidor?
          if (res!==error) {
            if (res.status === 200) {
              // SUCCESS: El servicio fue editado
              setShowError(false);
              verNuevoServicio(res.data._id);
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
        setShowError(true);
        console.log(error)
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
          <TextField name="descripcion" label="Descripción" />
          <TextField name="detalle" label="Detalle" />
          <TextField name="precio" label="Precio" />
          <TextField name="categoria" label="Categoría" accepter={SelectPicker} style={{width: "100%"}} data={formCats} />
          <br />
          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Agregar</Button>
              <Button appearance="default" onClick={volverListaServicios}>Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vacíos o datos inválidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el servicio en estos momentos" />: null) }
      </>
    );
  }
};

export default FormClient;