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
  SelectPicker
} from 'rsuite';

const { StringType, NumberType, DateType } = Schema.Types;

// Modelo de esquema de datos
const model = Schema.Model({
  establecimiento: StringType("El establecimiento debe ser de tipo texto.").isRequired("Es obligatorio seleccionar un establecimiento."),
  pos: StringType("El punto de venta debe ser de tipo texto.").isRequired("Es obligatorio seleccionar un punto de venta."),
  documento_fiscal: StringType("El documento fiscal debe ser de tipo texto.").isRequired("Es obligatorio seleccionar un tipo de documento."),
  // cai: StringType("El CAI debe ser de tipo texto.").pattern(/^(?:\d+[A-Z]|[A-Z]+\d)$/, "El CAI debe ").maxLength(37, "El límite máximo de caracteres es 37").isRequired(),
  cai: StringType("El CAI debe ser de tipo texto.").maxLength(37, "El límite máximo de caracteres es 37").isRequired("Es obligatorio escribir el CAI."),
  rango_inicial: NumberType("El rango inicial debe ser un número.").min(0, "El rango inicial debe ser un número mayor a 0.").max(99999999, "El rango inicial debe ser un número menor a 99999999.").isRequired("Es obligatorio ingresar el rango inicial."),
  rango_final: NumberType("El rango final debe ser un número.").min(1, "El rango final debe ser un número mayor a 1.").max(99999999, "El rango final debe ser un número menor a 99999999.").isRequired("Es obligatorio ingresar el rango final."),
  fecha_limite: DateType("La fecha límite debe ser de tipo fecha.").isRequired("Es obligatorio seleccionar una fecha límite.")
});
// Plantilla para campos del formulario
const TextField = ({ name, label, accepter, ...rest }) => (
  <Form.Group controlId={`${name}-19`}>
    <Form.ControlLabel>{label}</Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...rest} />
  </Form.Group>
);

const FormDocAut = (props) => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    _id: '',
    establecimiento: '',
    documento_fiscal: '',
    pos: '',
    fecha_limite: '',
    cai: '',
    rango_inicial: '',
    rango_final: ''
  });
  const [establecimientos, setEstablecimientos] = React.useState([]);
  const [puntos, setPuntos] = React.useState([]);
  const [documentos, setDocumentos] = React.useState([]);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showErrorEmptyForm, setShowErrorEmptyForm] = useState(false);
  const [loading, setLoading] = React.useState(false);
  
  let match = useNavigate();
  function volverListaDocsAut() {
    match("/admin/sar/documentos_autorizacion/");
  }
  function verEditDocAut(id) {
    match("/admin/sar/documentos_autorizacion/show/"+id);
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
    // GET establecimientos using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/establecimientos')
    .then((response) => {
      if (response!==error) {
        setEstablecimientos(response.data.map(a => { return { label: a.nombre, value: a._id} }));
        // GET puntos de venta using axios
        axios.get('https://beauty365api.herokuapp.com/api/v1/puntos_de_venta')
        .then((resp) => {
          if (resp!==error) {
            setPuntos(resp.data.map(a => { return { label: a.nombre, value: a._id} }));
            // GET tipos de documento using axios
            axios.get('https://beauty365api.herokuapp.com/api/v1/documentos_fiscal')
            .then((res) => {
              if (res!==error) {
                setDocumentos(res.data.map(a => { return { label: a.nombre, value: a._id} }));
                // GET document_authorization info by ID using axios
                axios.get('https://beauty365api.herokuapp.com/api/v1/documentos_autorizados/simple/'+props.id)
                  .then((response2) => {
                    if (response2!==error) {
                      setFormValue(response2.data);
                      setLoading(true);
                    } else {
                      setError(response2);
                      setLoading(true);
                    }
                  });
              } else {
                setError(res);
                setLoading(true);
              }
            });
          } else {
            setError(resp);
            setLoading(true);
          }
        });
      } else {
        setError(response);
        setLoading(true);
      }
    });
  }, [error, props.id]);

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
        const apiRes = await axios.put('https://beauty365api.herokuapp.com/api/v1/documentos_autorizados', 
        qs.stringify(formValue), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function(res) {
          // VERIFICAR: ¿Error en la respuesta del servidor?
          if (res!==error) {
            if (res.status === 200) {
              // SUCCESS: El establecimiento fue editado
              setShowError(false);
              verEditDocAut(res.data._id);
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
        console.log("SUCCESS", formValue);
      } catch(error) {
        // ERROR: Servidor
        console.log(error)
        setShowError(true);
        setLoading(true);
      }
    }
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
          <TextField value={formValue.establecimiento} name="establecimiento" label="Establecimiento" accepter={SelectPicker} style={{width: "100%"}} data={establecimientos} placeholder="Seleccione un establecimiento" />
          <TextField value={formValue.pos} name="pos" label="Punto de venta" accepter={SelectPicker} style={{width: "100%"}} data={puntos} placeholder="Seleccione un punto de venta" />
          <TextField value={formValue.documento_fiscal} name="documento_fiscal" label="Documento fiscal" accepter={SelectPicker} style={{width: "100%"}} data={documentos} placeholder="Seleccione un documento fiscal" />
          <Form.Group>
            <Form.ControlLabel>CAI</Form.ControlLabel>
            <Form.Control name="cai" maxLength="37" placeholder="553CDC-E2E034-C8488A-99831F-0B3E3C-69" value={formValue.cai} />
            <Form.HelpText tooltip>Respetar los guiones del formato</Form.HelpText>
          </Form.Group>
          <TextField name="rango_inicial" label="Rango inicial" maxLength="8" placeholder="1000" value={formValue.rango_inicial} />
          <TextField name="rango_final" label="Rango final" maxLength="8" placeholder="5000" value={formValue.rango_final} />
          <Form.Group>
            <Form.ControlLabel>Fecha límite de emisión</Form.ControlLabel>
            <Form.Control type="date" name="fecha_limite" placeholder="Seleccione una fecha" value={formValue.fecha_limite} />
          </Form.Group>
          <Form.Group>
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>Guardar cambios</Button>
              <Button appearance="default" onClick={volverListaDocsAut}>Cancelar</Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
        { showErrorEmptyForm ? <ErrMessage mensaje="Error. Hay campos vacíos o datos inválidos." /> : (showError ? <ErrMessage mensaje="Error. No es posible editar el establecimiento en estos momentos" />: null) }
      </>
    );
  }
};

export default FormDocAut;