import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom'

import {
  Form,
  Button,
  ButtonToolbar,
  Schema
} from 'rsuite';


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

const FormNew = (props) => {
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombre: '',
    prefijo: ''
  });

  let history = useNavigate();
  console.log(history);
  const handleSubmit = async() => {
    try {
      console.log(formValue);
      //Cambiar aqui ruta de direccion del API
      const response = await axios.post(
        'https://beauty365api.herokuapp.com/api/v1/establecimientos/create',
        qs.stringify(formValue), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response){
          console.log(response.status);
          //Cambiar aqui ruta de redireccion
          history(`/admin/sar/establecimiento/show/${response.data._id}`, { state: response.data._id })  
        })
      } catch(error) {
        console.log(error)
    }
      console.log(formValue, 'Form Value');
  }

  return (
    <Form 
      onSubmit={handleSubmit}
      onChange={setFormValue}
      formValue={formValue}
    >
      <Form.Group controlId="name-6">
        <Form.ControlLabel>Codigo</Form.ControlLabel>
        <Form.Control name="code" />
      </Form.Group>
      <Form.Group controlId="email-6">
        <Form.ControlLabel>Nombre</Form.ControlLabel>
        <Form.Control name="nombre" />
        <Form.HelpText tooltip>000</Form.HelpText>
      </Form.Group>
      <ButtonToolbar>
        <Button appearance="primary" type="submit">
          Submit
        </Button>
      </ButtonToolbar>
    </Form>
  );
};

export default FormNew;