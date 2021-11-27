import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import qs from 'qs';
import axios from 'axios';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Message,
  Divider,
  Loader,
  Checkbox,
  CheckboxGroup
} from 'rsuite';

const { StringType, NumberType } = Schema.Types;

// Modelo de esquema de datos
const model = Schema.Model({
  nombre: StringType("El nombre debe ser de tipo texto.").isRequired('Es obligatorio escribir el nombre.'),
  dias_pago: NumberType("El dias pago debe ser un número.")
});

// Plantilla para campos del formulario
const TextField = ({ name, label, value, accepter, ...rest }) => (
  <Form.Group controlId={`${name}-4`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...rest} />
  </Form.Group>
);

const FormClient = () => {
  const formRef = React.useRef();
  const [ isChecked, setIsChecked ] = useState(false);
  const [ isCheckedCredit, setIsCheckedCredit ] = useState(false);
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    active: '',
    nombre: '',
    dias_pago: '',
    credito: ''
  });
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function volverListaMetodoPago() {
    match("/admin/metodo_pago");
  }
  function verNuevoMetodoPago(id) {
    match("/admin/metodo_pago/"+id);
  }
  
  // Mensaje de error
  const ErrMessage = (props) => {
    return (
      <div>
        <Divider />
        <Message showIcon type="error">{props.mensaje}</Message>
      </div>
    );
  };
 
  useEffect(() => {
    setLoading(true);
  }, []);

  const handleSubmit = async() => {
    setShowErrorEmptyForm(false);
    setShowError(false);
    // Verificar errores en el formulario
    if (!formRef.current.check()) {
      setShowErrorEmptyForm(true);
      console.error('Form Error');
      return;
    } else {
      setLoading(false);
      try {
        const apiRes = await axios.post('https://beauty365api.herokuapp.com/api/v1/metodos_pago/create', 
        qs.stringify(formValue), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res) {
          // VERIFICAR: ¿Error en la respuesta del servidor?
          if (res!==error) {
            if (res.status === 200) {
              // SUCCESS: El cliente fue editado
              setShowError(false);
              verNuevoMetodoPago(res.data._id);
            } else {
              // ERROR: HTTP Status != 200
              console.log(res);
              setShowError(true);
              setLoading(true);
            }
          } else {
            // ERROR: Servidor
            console.log(res);
            setShowError(true);
            setLoading(true);
          }
        });
      } catch(error) {
        // ERROR: Servidor
        console.log(error);
        setShowError(true);
        setLoading(true);
      }
    }
  };

  const handleChangeActive = () => {
    setIsChecked(!isChecked);
    setFormValue({...formValue, active: !isChecked ? 'true' : 'false'});
  };
  const handleChangeCredit = () => {
    setIsCheckedCredit(!isCheckedCredit);
    setFormValue({...formValue, credito: !isCheckedCredit ? 'true' : 'false'});
  };
 
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    return (
      <>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          fluid
          >
          {console.log(model)}
          <TextField name="nombre" label="Nombre" />
          <TextField 
            name="credito" 
            label="Credito" 
            accepter={Checkbox} 
            checked={isCheckedCredit} 
            onChange={handleChangeCredit}
            />
          <TextField name="dias_pago" label="Dias de Pago" type="number" />
          <TextField 
            name="active" 
            label="Activo" 
            accepter={Checkbox} 
            checked={isChecked} 
            onChange={handleChangeActive}
            />
          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Agregar</Button>
              <Button appearance="default" onClick={volverListaMetodoPago}>Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vacíos o datos inválidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el cliente en estos momentos" />: null) }
      </>
    );
  }
};

export default FormClient;