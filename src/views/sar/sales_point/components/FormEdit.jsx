import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    nombre: '',
    prefijo: ''
  });

  useEffect(() => {
    // PUT request using fetch with set headers
    fetch('https://beauty365api.herokuapp.com/api/v1/puntos_de_venta/'+id)
      .then(response => response.json())
      .then(data => {
        setFormValue(data)
        console.log('GET: ',data)
        }
      );
  }, []);
  

  function handleAction() {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: formValue
    };
    fetch('https://beauty365api.herokuapp.com/api/v1/puntos_de_venta/'+id, requestOptions)
      .then(response => response.json())
      .then(data => {
      setPostId(data._id)
      console.log('PUT:', data)
      }
    );
  };

  function handleClick(){
    if(edit){
      handleAction();
      setEdit(false);
    }else{
      setEdit(true)
    }
  }
 

  return (
    <>
      <ButtonToolbar>
          <IconButton icon={<Edit2 />} placement="right" onClick={handleClick}>
            {
              edit ? 'Cancelar' : 'Editar'
            }
          </IconButton>
      </ButtonToolbar>
      <Form 
        layout="horizontal"
        disabled={!edit}
        onSubmit={handleAction}
        onChange={setFormValue}
        formValue={formValue}
      >
        <Form.Group controlId="name-6">
          <Form.ControlLabel>Nombre</Form.ControlLabel>
          <Form.Control name="nombre" value={formValue.nombre}/>
        </Form.Group>
        <Form.Group controlId="email-6">
          <Form.ControlLabel>Prefijo</Form.ControlLabel>
          <Form.Control name="prefijo" value={formValue.prefijo}/>
          <Form.HelpText tooltip>000</Form.HelpText>
        </Form.Group>
        <ButtonToolbar>
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </ButtonToolbar>
      </Form>
    </>
  );
};

export default FormNew;