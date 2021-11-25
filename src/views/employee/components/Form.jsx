import React from 'react';
import axios from 'axios';
import qs from 'qs';
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
    habilidades: ''
  });
  
  //funciones de acciones
  const handleSubmit = async() => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }

    var data = JSON.stringify(formValue);
    

    var config = {
      method: 'post',
      url: 'https://beauty365api.herokuapp.com/api/v1/empleados/create',
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


    
   /* try{
    const response = await axios.post(
     'https://beauty365api.herokuapp.com/api/v1/empleados/create',
      //'https://beauty365api.herokuapp.com/api/v1/employee/nuevo',
      qs.stringify(formValue), {
        headers:{
          "Access-Control-Allow-Origin":"*",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    ).then(function(response){
      console.log('[response] ', response);
    })
  }catch(error){
    console.log(error);
  }*/
  
    console.log(formValue, 'Form Value');
  }
 


  return (
    //Editar aqui el formulario
    <Form
      ref={formRef}
      onChange={setFormValue}
      onCheck={setFormError}
      formValue={formValue}
      model={model}

    >
      <TextField name="nombres" label="Nombres" />
      <TextField name="telefono" label="Telefono" />
      <TextField name="habilidades" label="Habilidad" />
      
      
      <ButtonToolbar>
        <Button appearance="primary" onClick={handleSubmit}>
          Guardar 
        </Button>
        
      </ButtonToolbar>
    </Form> 
      
    

  );
};

export default FormEmployee;