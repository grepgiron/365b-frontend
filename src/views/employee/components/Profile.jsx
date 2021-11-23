import { Link, useNavigate, useParams } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import qs from 'qs';

//import React, { useState, useEffect } from 'react';
//importaciones de rsuitjs

import {
  Divider,
  Form,
  Button,
  ButtonToolbar,
  Schema 
} from 'rsuite';
import { useEffect } from "react";





const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name}  accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const { StringType, NumberType } = Schema.Types;

function Profile() {
 
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    nombres: '',
    telefono: '',
    habilidades: ''
  });
  let { id } = useParams();
  console.log("Dan", id);
  const handleSubmit = async() => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
    ActualizarUsuario(id);

  }

  let match = useNavigate();
  function handleClick(event) {
      match(event);
  }

    const model = Schema.Model({
      nombres: StringType().isRequired('This field is required.'),
      telefono: StringType().isRequired('This field is required.'),
      dni: NumberType(),
      email:  StringType().isEmail('Please enter a valid email address.'),
    });
    

     useEffect(() => {
      obtenerInfoUsuario(id);
     // console.log("Datos", datosEmpleado);      
     }, []);


    function obtenerInfoUsuario(id){
      if(id !== undefined){
      var config = {
        method: 'get',
        url: `https://beauty365api.herokuapp.com/api/v1/empleados/${id}`,
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
       // setdatosEmpleado({...response.data});
        setFormValue({...response.data, telefono: `${response.data.telefono}`});
        console.log(`id = ${response.data._id}`);

        
      })
      .catch(function (error) {
        console.log(error);
      });
      }
      
    }

    function ActualizarUsuario(id){
      var data = JSON.stringify(formValue);
      
      var config = {
        method: 'put',
        url: `https://beauty365api.herokuapp.com/api/v1/empleados/${id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  

    }


  return (
    //Editar Aqui el perfil de empleado
    <Form
      ref={formRef}
      onChange={setFormValue}
      onCheck={setFormError}
      formValue={formValue}
      model={model}

    >
      <TextField  name="nombres" label="Nombres" />
      <TextField  name="telefono" label="Telefono" />
      <TextField  name="habilidades" label="Habilidad" />
      
      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary" onClick={()=>handleSubmit}>
            Guardar Cambios
          </Button>
          <Button appearance="default" onClick={()=>handleClick("/admin/empleados")} >Regresar</Button>
        </ButtonToolbar>
      </Form.Group>
    </Form> 
    
      
  );
}

export default Profile;