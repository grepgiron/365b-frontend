import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  IconButton,
  InputPicker 
} from 'rsuite';

import Edit2 from '@rsuite/icons/legacy/Edit2';


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
  let { id } = useParams();
  const [error, setError] = React.useState({});
  const [isLoaded, setIsLoaded] = React.useState({});

  const [establecimientos, setEstablecimiento] = React.useState([]);
  const [punto, setPunto] = React.useState([]);
  const [documentos, setDocumentos] = React.useState([]);
  const [edit, setEdit ] = React.useState(false)
  const [ postId, setPostId ] = React.useState(null);
  const [formValue, setFormValue] = React.useState({
    nombre: '',
    prefijo: ''
  });

  useEffect(() => {
    // PUT request using fetch with set headers
    fetch('https://beauty365api.herokuapp.com/api/v1/documentos_autorizados/'+id)
      .then(response => response.json())
      .then(data => {
        setFormValue(data)
        console.log('GET: ',data)
        }
      );
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
  }, []);
  

  function handleAction() {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: formValue
    };
    fetch('https://beauty365api.herokuapp.com/api/v1/documentos_autorizados/'+id, requestOptions)
      .then(response => response.json())
      .then(data => {
      setPostId(data._id)
      console.log('PUT:', data)
      }
    );
  };

  function handleClick(){
    if(edit){
      handleAction();
      setEdit(false);
    }else{
      setEdit(true)
    }
  }
 

  return (
    <>
      <ButtonToolbar>
          <IconButton icon={<Edit2 />} placement="right" onClick={handleClick}>
            {
              edit ? 'Cancelar' : 'Editar'
            }
          </IconButton>
      </ButtonToolbar>
      <Form 
        layout="horizontal"
        disabled={!edit}
        onSubmit={handleAction}
        onChange={setFormValue}
        formValue={formValue}
      >
        <Form.Group >
          <Form.ControlLabel>Establecimiento</Form.ControlLabel>
          <Form.Control name="establecimiento" valueKey="_id"
              labelKey="nombre" accepter={InputPicker} data={establecimientos}>
          </Form.Control>
        </Form.Group>
        <Form.Group>
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
    </>
  );
};

export default FormNew;