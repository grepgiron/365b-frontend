import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom'

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Checkbox
} from 'rsuite';


const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  nombre: StringType().isRequired('This field is required.'),
  credito: StringType().isRequired('This field is required.')
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
  const [formError, setFormError] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [formValue, setFormValue] = React.useState({
    dias_pago: '',
    nombre: '',
    credito: false,
    active: false
  });

  let history = useNavigate();
  //console.log(history);
  const handleSubmit = async() => {
    try {
      console.log(formValue);
      //Cambiar aqui ruta de direccion del API
      const response = await axios.post(
        'https://beauty365api.herokuapp.com/api/v1/metodos_pago/create',
        qs.stringify(formValue), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response){
          console.log(response.status);
          //Cambiar aqui ruta de redireccion
          history(`/admin/sar/categorias/show/${response.data._id}`, { state: response.data._id })  
        })
      } catch(error) {
        console.log(error)
    }
      console.log(formValue, 'Form Value');
  }

  function handleChange(e){
    console.log(e)
  }

  return (
    <Form 
      onSubmit={handleSubmit}
      onChange={setFormValue}
      formValue={formValue}
    >
      {console.log(formValue)}
      {console.log(checked)}
      <Form.Group controlId="name-6">
        <Form.ControlLabel>Nombre</Form.ControlLabel>
        <Form.Control name="nombre" />
      </Form.Group>
      <Form.Group controlId="email-6">
        <Checkbox name="credito" onChange={setFormError}>Credito</Checkbox>
      </Form.Group>
      <Form.Group controlId="name-6">
        <Form.ControlLabel>Dias para Pago</Form.ControlLabel>
        <Form.Control name="dias_pago" />
      </Form.Group>
      <Form.Group controlId="email-6">
        <Form.Control name='active' 
          accepter={Checkbox} 
          checked={checked}
          onChange={handleChange} />
      </Form.Group>
      <ButtonToolbar>
        <Button appearance="primary" type="submit">
          Guardar
        </Button>
      </ButtonToolbar>
    </Form>
  );
};

export default FormNew;