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
  InputPicker,
  Row,
  Col
} from 'rsuite';

const { StringType, NumberType } = Schema.Types;

// Modelo de esquema de datos
const model = Schema.Model({
  nombre: StringType("El nombre debe ser de tipo texto.").isRequired('Es obligatorio escribir el nombre.'),
  code: StringType("El codigo debe ser de tipo string.").isRequired('Es obligatorio escribir el codigo.'),
  costo: NumberType("El costo debe ser un número.").isRequired('Es obligatorio escribir el costo'),
  precio: NumberType("El precio debe ser un número.").isRequired('Es obligatorio escribir el precio.')
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
  const [ categorias, setCategorias] = React.useState([]);
  const [ unidades, setUnidades] = React.useState([]);
  const [formValue, setFormValue] = React.useState({
    code: '',
    nombre: '',
    descripcion: '',
    unidad: '',
    costo: '',
    precio: '',
    categoria: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(true);
  
  let match = useNavigate();
  function volverListaClientes() {
    match("/admin/inventario/productos");
  }
  function verNuevoCliente(id) {
    match("/admin/inventario/productos/"+id);
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
    // GET establecimientos using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/categorias')
    .then((response) => {
      if (response!==error) {
        setCategorias(response.data.map(a => { return { label: a.nombre, value: a._id} }));
        // GET puntos de venta using axios
        axios.get('https://beauty365api.herokuapp.com/api/v1/unidades')
        .then((resp) => {
          if (resp!==error) {
            setUnidades(resp.data.map(a => { return { label: a.nombre, value: a._id} }));
            
          } else {
            setError(resp);
            setLoading(true);
          }
        });
      } else {
        setError(response);
        setLoading(true);
      }
    });
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
        const apiRes = await axios.post('https://beauty365api.herokuapp.com/api/v1/productos/create', 
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
          <TextField name="code" label="Codigo" />
          <TextField name="nombre" label="Nombre" />
          <TextField name="descripcion" label="Descripcion" />
          <Row style={{ marginBottom: 25}}>
            <Col xs={12}>
              <TextField name="categoria" label="Categoria" accepter={InputPicker} valuekey='_id' labelkey="nombre" data={categorias}/>
            </Col>
            <Col xs={12}>
              <TextField name="unidad" label="Und" accepter={InputPicker} valuekey='_id' labelkey="nombre" data={unidades}/>
            </Col>
          </Row>
          <tr/>
          <Row style={{ marginBottom: 25}}>
            <Col xs={12}>
              <TextField name="costo" label="Costo" type="number"/>
            </Col>
            <Col xs={12}>
              <TextField name="precio" label="Precio" type="number"/>
            </Col>
          </Row>
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