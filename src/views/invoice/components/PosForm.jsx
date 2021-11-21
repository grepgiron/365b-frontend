import React, { useState } from 'react';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Panel,
  Col,
  Form,
  InputPicker,
  InputNumber,
  DatePicker,
  ButtonGroup,
  IconButton
} from 'rsuite';

import MinusIcon from '@rsuite/icons/Minus';




const PosForm = () => {
  const [items, setItems] = useState([{
    producto: "",
    nombre: "",
    cantidad: "",
    precio: "",
    total: ""
  }])

  const handleChangeInput = (i, e) => {
    console.log(e);
    const values = [...items]
    values[i][e] = e
    setItems(values)
  }

  const handleAdd = () => {
    setItems([...items, { producto: '', cantidad: '', precio: '' }])
  }

  const handleSubtract = (i) => {
    console.log('sbtract: '+items[i].cantidad);
    const values = [...items]
    values.splice(i, 1)
    setItems([...values])
  }

  const CardService = () => {
    return(
      <Row xs={1} md={5} className="g-4">
        {Array.from({ length: 10 }).map((_, idx) => (
        <Col>
          <Card style={{ cursor: "pointer" }}>
            <Card.Img variant="overlay" />
            <Card.Body>
              <Card.Text>Card title</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
      </Row>
    )
  }
  
  const onClick = () => {
    console.log('click');
    handleAdd();
  }

  return (
    <>
      <Row>
        <Col xs={13}>
          {/* SERVICIOS que se agregan con un click*/}
          <Card>
            <Card.Header>Servicios</Card.Header>
            <Card.Body>
              <CardService />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={11}>
          {/* FORM COMIENZA AQUI*/}
          <Form>
            <Card>
              <Card.Header>
                <Row>
                  {/* Datos generales de la venta*/}
                  <Col xs={14}>
                    <Form.Group controlId="inputPicker">
                      <Form.ControlLabel>Cliente</Form.ControlLabel>
                      <Form.Control name="inputPicker" accepter={InputPicker}/>
                    </Form.Group>  
                  </Col>
                  <Col xs={10}>
                    <Form.Group controlId="datePicker">
                      <Form.ControlLabel>Fecha:</Form.ControlLabel>
                      <Form.Control name="datePicker" accepter={DatePicker} />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Header>
              {/* Lista de Servicios a cobrar*/}
              <Card.Body>
                <Row>
                  <Col xs={12}>Servicio</Col>
                  <Col xs={4}>Cantidad</Col>
                  <Col xs={4}>Total</Col>
                  <Col xs={4}></Col>
                </Row>
                {/*Aqui va la lista*/}
              {items.map((field, i) => (
                <div key={i} style={{ paddingTop: 4}}>
                  <Row>
                    <Col sm={12}>
                      <Form.Group controlId="nombre">
                        <Form.Control 
                          size="sm" 
                          readOnly 
                          name="nombre" 
                          style={{ width: 240 }}/>
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group controlId="cantidad">
                        <Form.Control 
                          size="sm" 
                          name="cantidad" 
                          accepter={InputNumber}
                          value={field.cantidad} 
                          onChange={(e) => handleChangeInput(i, e)}
                          style={{ width: 60 }} />
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group controlId="total">
                        <Form.Control 
                          size="sm" 
                          name="total" 
                          accepter={InputNumber} 
                          style={{ width: 80 }} />
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <ButtonGroup size="xs">
                        <IconButton onClick={() => handleSubtract(i)} icon={<MinusIcon />} />
                      </ButtonGroup>
                    </Col>
                  </Row>
                </div>
              ))}
              </Card.Body>
            </Card>
          </Form>
          {JSON.stringify(items)}
          {/* FORM TERMINA AQUI*/}
        </Col>
      </Row>

    </>
  );
};

export default PosForm;