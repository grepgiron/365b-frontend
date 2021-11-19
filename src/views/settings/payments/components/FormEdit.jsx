import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import qs from 'qs';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  IconButton 
} from 'rsuite';

import Edit2 from '@rsuite/icons/legacy/Edit2';


const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  nombre: StringType().isRequired('This field is required.'),
  prefijo: StringType().isRequired('This field is required.')
});

const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const FormNew = () => {
  let { id } = useParams();
  const [formError, setFormError] = React.useState({});
  const [edit, setEdit ] = React.useState(false)
  const [ postId, setPostId ] = React.useState(null);
  const [formValue, setFormValue] = React.useState({
    code: '',
    nombre: ''
  });

  useEffect(() => {
    // PUT request using fetch with set headers
    fetch('https://beauty365api.herokuapp.com/api/v1/categorias/'+id)
      .then(response => response.json())
      .then(data => {
        setFormValue(data)
        console.log('GET: ',data)
        }
      );
  }, []);
  

  let history = useNavigate();
  //console.log(history);
  const handleSubmit = async() => {
    try {
      console.log(formValue);
      //Cambiar aqui ruta de direccion del API
      const response = await axios.put(
        'https://beauty365api.herokuapp.com/api/v1/categorias/'+id,
        qs.stringify(formValue), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response){
          console.log(response.status);
          //Cambiar aqui ruta de redireccion
          history(`/admin/inventario/categorias/show/${response.data._id}`, { state: response.data._id })  
        })
      } catch(error) {
        console.log('Error: '+error)
    }
      console.log(formValue, 'Form Value');
  }

  return (
    <>
      <h3 class="page-heading">
        <span class="page-heading-text">Detalles</span>
      </h3>
      <Form 
        layout="horizontal"
        onSubmit={handleSubmit}
        onChange={setFormValue}
        formValue={formValue}
      >
        <Form.Group controlId="name-6">
          <Form.ControlLabel>Codigo</Form.ControlLabel>
          <Form.Control name="code" value={formValue.code}/>
        </Form.Group>
        <Form.Group controlId="email-6">
          <Form.ControlLabel>Nombre</Form.ControlLabel>
          <Form.Control name="nombre" value={formValue.nombre}/>
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" type="submit">
              Guardar
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormNew;