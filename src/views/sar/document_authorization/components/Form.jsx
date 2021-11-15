import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  Input, 
  InputPicker,
  Radio
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

const FormNew = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [establecimientos, setEstablecimiento] = React.useState([]);
  const [punto, setPunto] = React.useState([]);
  const [documentos, setDocumentos] = React.useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formValue, setFormValue] = React.useState({
    establecimiento: '',
    documento_fiscal: '',
    pos: '',
    fecha_limite: '',
    cai: '',
    rango_inicial: '',
    rango_final: ''
  });
  
  useEffect(() => {
    fetch("https://beauty365api.herokuapp.com/api/v1/establecimientos")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setEstablecimiento(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    fetch("https://beauty365api.herokuapp.com/api/v1/puntos_de_venta")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPunto(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    fetch("https://beauty365api.herokuapp.com/api/v1/documentos_fiscal")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setDocumentos(result);
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
  const handleSubmit = async() => {
    try {
      console.log(formValue);
      //Cambiar aqui ruta de direccion del API
      const response = await axios.post(
        'https://beauty365api.herokuapp.com/api/v1/documentos_autorizados/create',
        qs.stringify(formValue), {
          headers: {
            "Access-Control-Allow-Origin": "*",
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
      layout="horizontal"
      onSubmit={handleSubmit}
      onChange={setFormValue}
      formValue={formValue}
    >
      <Form.Group >
        <Form.ControlLabel>Establecimiento</Form.ControlLabel>
        <Form.Control name="establecimiento" valueKey="_id"
            labelKey="nombre" accepter={InputPicker} data={establecimientos}>
        </Form.Control>
      </Form.Group>
      <Form.Group 

      >
        <Form.ControlLabel>Punto de Venta</Form.ControlLabel>
        <Form.Control name="pos" valueKey="_id"
            labelKey="nombre" accepter={InputPicker} data={punto}>
        </Form.Control>
      </Form.Group>
      <Form.Group >
        <Form.ControlLabel>Documento Fiscal</Form.ControlLabel>
        <Form.Control name="documento_fiscal" valueKey="_id"
          labelKey="nombre" accepter={InputPicker} data={documentos}>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>CAI</Form.ControlLabel>
        <Form.Control name="cai" maxLength="37" style={{ width: 224 }}/>
        <Form.HelpText tooltip>Respetar los guiones del formato</Form.HelpText>
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Rango Inicial</Form.ControlLabel>
        <Form.Control name="rango_inicial" maxLength="8" style={{ width: 90 }}/>
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Rango Final</Form.ControlLabel>
        <Form.Control name="rango_final" maxLength="8" style={{ width: 90 }}/>
      </Form.Group>
      <Form.Group>
        <Form.ControlLabel>Fecha Limite de Emision</Form.ControlLabel>
        <Form.Control name="fecha_limite" style={{ width: 224 }} type="date"/>
      </Form.Group>

      <Form.Group>
        <ButtonToolbar>
          <Button appearance="primary" type="submit">
            Registrar
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default FormNew;