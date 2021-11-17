import React from 'react';
import axios from 'axios';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Input 
} from 'rsuite';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  nombres: StringType().isRequired('This field is required.'),
  telefono: StringType().isRequired('This field is required.'),
  dni: NumberType(),
  email:  StringType().isEmail('Please enter a valid email address.'),
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

const FormClient = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombres: '',
    telefono: '',
    dni: '',
    email: ''
  });
  

  const handleSubmit = async() => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
    try {
      console.log(formValue);
      // make axios post request
      const response = await axios({
        method: "POST",
        url: 'https://beauty365api.herokuapp.com/api/v1/clientes',
        data: formValue,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      console.log(response)
    } catch(error) {
      console.log(error)
    }
    console.log(formValue, 'Form Value');
  };
 

  return (
    <Form fluid>
    <Form.Group controlId="name-1">
      <Form.ControlLabel>Nombre</Form.ControlLabel>
      <Form.Control name="name" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="email-1">
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" type="email" />
      <Form.HelpText>Required</Form.HelpText>
    </Form.Group>
    <Form.Group controlId="password-1">
      <Form.ControlLabel>Contraseña</Form.ControlLabel>
      <Form.Control name="password" type="password" autoComplete="off" />
    </Form.Group>
    <Form.Group controlId="textarea-1">
      <Form.ControlLabel>Número telefonico y dirección</Form.ControlLabel>
      <Form.Control rows={5} name="textarea" accepter={Textarea} />
    </Form.Group>
    <Form.Group>
      <ButtonToolbar>
        <Button appearance="primary">Agregar</Button>
        <Button appearance="primary">Editar</Button>
        <Button appearance="default">Cancelar</Button>
       
      </ButtonToolbar>
    </Form.Group>
  </Form>
  );
};

export default FormClient;