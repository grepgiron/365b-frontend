import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Form,
  Grid,
  Panel,
  ButtonToolbar,
  Schema,
  Input,
  Button 
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
  

  let history = useNavigate();
  const handleSubmit = async() => {
    try {
      console.log(formValue);
      //Cambiar aqui ruta de direccion del API
      const response = await axios.post(
        'https://beauty365api.herokuapp.com/api/v1/puntos_de_venta/create',
        qs.stringify(formValue), {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response){
          console.log(response.status);
          //Cambiar aqui ruta de redireccion
          history(`/admin/sar/punto_venta/show/${response.data._id}`, { state: response.data._id })  
        })
      } catch(error) {
        console.log(error)
    }
      console.log(formValue, 'Form Value');
  }
 

  return (
    <Grid fluid>
      <Panel bordered>
        <Form 
          onSubmit={handleSubmit}
          onChange={setFormValue}
          formValue={formValue}
          layout="horizontal"
        >
          <Form.Group controlId="name-1">
            <Form.ControlLabel>Nombre</Form.ControlLabel>
            <Form.Control name="nombre" />
          </Form.Group>
          <Form.Group controlId="prefijo-1">
            <Form.ControlLabel>Prefijo</Form.ControlLabel>
            <Form.Control name="prefijo" />
            <Form.HelpText tooltip>000</Form.HelpText>
          </Form.Group>
          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" type="submit">
                Registrar
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      </Panel>
    </Grid>
  );
};

export default FormNew;