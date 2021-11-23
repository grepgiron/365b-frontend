import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';


import {
  Form,
  Button,
  ButtonToolbar,
  Input,
  InputPicker,
  Schema
} from 'rsuite';

import FormControl from 'rsuite/esm/FormControl';

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

const FormNew = (props) => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [unidades, setUnidad] = React.useState([]);
  const [categorias, setCategoria] = React.useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formValue, setFormValue] = React.useState({
    code: '',
    nombre: '',
    descripcion: '',
    unidad: '',
    costo: '',
    precio: '',
    categoria: ''
  });


  useEffect(() => {
    fetch("https://beauty365api.herokuapp.com/api/v1/unidades")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUnidad(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    fetch("https://beauty365api.herokuapp.com/api/v1/categorias")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCategoria(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
    )
    
  }, [])


  let history = useNavigate();
  console.log(history);
  const handleSubmit = async() => {
    try {
      console.log(formValue);
      //Cambiar aqui ruta de direccion del API
      const response = await axios.post(
        'https://beauty365api.herokuapp.com/api/v1/productos/nuevo',
        qs.stringify(formValue), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response){
          console.log(response.status);
          //Cambiar aqui ruta de redireccion
          history(`/admin/inventario/producto/show/${response.data._id}`, { state: response.data._id })  
        })
      } catch(error) {
        console.log(error)
    }
      console.log(formValue, 'Form Value');
     
  }

  return (
    /*<Form 
      onSubmit={handleSubmit}
      onChange={setFormValue}
      formValue={formValue}
    >
      <Form.Group controlId="name-6">
        <Form.ControlLabel>Nombre</Form.ControlLabel>
        <Form.Control name="nombre" />
      </Form.Group>
      <Form.Group controlId="email-6">
       
        <Form.Control name="prefijo" />
        <Form.HelpText tooltip>000</Form.HelpText>
      </Form.Group>
      <ButtonToolbar>
        <Button appearance="primary" type="submit">
          Submit
        </Button>
      </ButtonToolbar>
    </Form>*/


<Form 

      layout="horizontal"
      onSubmit={handleSubmit}
      onChange={setFormValue}
      formValue={formValue}
    >
      {console.log(formValue)}
      <Form.Group controlId="code">
        <Form.ControlLabel>Codigo</Form.ControlLabel>
        <Form.Control name="code" />
        <Form.HelpText>Code is required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="name">
        <Form.ControlLabel>name</Form.ControlLabel>
        <Form.Control name="name" />
        <Form.HelpText>name is required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="descripcion">
        <Form.ControlLabel>Descripcion</Form.ControlLabel>
        <Form.Control name="descripcion" />
        <Form.HelpText>Descripcion is required</Form.HelpText>
      </Form.Group>

      <Form.Group >
        <Form.ControlLabel>Unidad</Form.ControlLabel>
        <Form.Control name="unidad" valueKey="_id"
            labelKey="nombre" accepter={InputPicker} data={unidades}>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="costo">
        <Form.ControlLabel>Costo</Form.ControlLabel>
        <Form.Control name="costo" />
        <Form.HelpText>costo is required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="precio">
        <Form.ControlLabel>Precio</Form.ControlLabel>
        <Form.Control name="precio" />
        <Form.HelpText>precio is required</Form.HelpText>
      </Form.Group>
                       
      <Form.Group>
        <Form.ControlLabel>Categoria</Form.ControlLabel>
        <Form.Control name="categoria" valueKey="_id"
            labelKey="nombre" accepter={InputPicker} data={categorias}>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary" type="submit">
            Registrar Producto
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>



  );
};

export default FormNew;