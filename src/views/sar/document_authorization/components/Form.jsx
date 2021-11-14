import React from 'react';
import axios from 'axios';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Input, 
  SelectPicker
} from 'rsuite';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

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
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombre: '',
    prefijo: ''
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
    <Form layout="horizontal">
      <Form.Group controlId="name-6">
        <Form.ControlLabel>Establecimiento</Form.ControlLabel>
        <Form.Control name="establecimiento" />
      </Form.Group>
      <Form.Group controlId="email-6">
        <Form.ControlLabel>Punto de Venta</Form.ControlLabel>
        <Form.Control 
          name="pos" 
          accepter={SelectPicker} style={{ display: 'inline-block', width: 200 }}/>
        <Form.HelpText tooltip>000</Form.HelpText>
      </Form.Group>
      <Form.Group controlId="name-6">
        <Form.ControlLabel>Nombre</Form.ControlLabel>
        <Form.Control name="nombre" />
      </Form.Group>
      <Form.Group controlId="email-6">
        <Form.ControlLabel>Prefijo</Form.ControlLabel>
        <Form.Control name="prefijo" />
        <Form.HelpText tooltip>000</Form.HelpText>
      </Form.Group>
    </Form>
  );
};

export default FormNew;