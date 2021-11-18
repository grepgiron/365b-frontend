import React from 'react';
import axios from 'axios';

//importaciones de Rsuitjs
import {
  Form,
  Button,
  ButtonToolbar,
  Schema 
} from 'rsuite';

//Constantes 
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

const FormEmployee = () => {
  //Variables y sus respectivos get
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombres: '',
    telefono: '',
    dni: '',
    email: ''
  });
  
  //funciones de acciones
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
    //Editar aqui el formulario
    <Form
      ref={formRef}
      onChange={setFormValue}
      onCheck={setFormError}
      formValue={formValue}
      model={model}

    > <TextField name="_id" label="ID" />
      <TextField name="nombres" label="Nombres" />
      <TextField name="telefono" label="Telefono" />
      <TextField name="dni" label="DNI" />
      <TextField name="email" label="Email" />
      
      <ButtonToolbar>
        <Button appearance="primary" onClick={handleSubmit}>
          Guardar 
        </Button>
      </ButtonToolbar>
    </Form> 
      
  );
};

export default FormEmployee;