import React, { useState, useEffect} from 'react'
import { Card, Row } from 'react-bootstrap';

import { Col, InputPicker, Input, Form, Panel, Divider } from 'rsuite'

//import 'bootstrap/dist/css/bootstrap.min.css';
import TituloView from '../../components/titulo-views/tvs';


import Header from './components/header';
import Main from './components/main';
import Basket from './components/basket';
//import data from './data';

import './index.scss'

function App() {
  //const { products } = data;
  const [error, setError] = useState(null);
  const [services, setServices ] = useState([])
  const [payments, setPayments ] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [clients, setClients] = useState([])
  const [ formValue, setFormValue ] = React.useState({
    cliente: '',
    fecha: '',
    productos: [],
    sub_total: '',
    impuesto: '',
    total: ''
  })

  useEffect(() => {
    fetch("https://beauty365api.herokuapp.com/api/v1/servicios")
    .then(res => res.json())
    .then(
      (result) => {
        setServices(result);
        //console.log(result);
      },
      // Nota: es importante manejar errores aquí y no en 
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (error) => {
        setError(error);
      }
    );
    fetch("https://beauty365api.herokuapp.com/api/v1/metodos_pago")
    .then(res => res.json())
    .then(
      (result) => {
        setPayments(result);
         console.log(result);
      },
      // Nota: es importante manejar errores aquí y no en 
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (error) => {
        setError(error);
      }
    );
    fetch("https://beauty365api.herokuapp.com/api/v1/clientes")
    .then(res => res.json())
    .then(
      (result) => {
        setClients(result);
        //console.log(result);
      },
      // Nota: es importante manejar errores aquí y no en 
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (error) => {
        setError(error);
      }
    )
  }, [])


  //Metodo Agregar nuevo item
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) => 
          x._id === product._id ? { ...exist, cantidad: exist.cantidad + 1 } : x,
        )
      );
    } else {
      
      setCartItems([...cartItems, { ...product, cantidad: 1 }]);
    }
  };

  //Metodo Eliminar item
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.cantidad === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, cantidad: exist.cantidad - 1 } : x
        )
      );
    }
  };

  return (
    <>
      <Row>
        <TituloView colmd={9} collg={6} nombre="Generar Factura" />
        <Divider/>
        <Col xs={24}>
          <Form
            fluid
            layout="inline"
            formValue={formValue}
            onChange={setFormValue}
          >
            <Form.Group controlId="inputPicker">
              <Form.ControlLabel>Cliente:</Form.ControlLabel>
              <Form.Control name="cliente" valueKey="_id"
                labelKey="nombres" accepter={InputPicker} data={clients}>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="inputPicker">
              <Form.ControlLabel>Metodo de pago:</Form.ControlLabel>
              <Form.Control name="metodo_pago" valueKey="_id"
                labelKey="nombre" accepter={InputPicker} data={payments}>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="datePicker">
              <Form.ControlLabel>Fecha:</Form.ControlLabel>
              <Form.Control name="fecha" accepter={Input} type="date" placement="autoVerticalEnd"/>
            </Form.Group>
          </Form>
        </Col> 
      </Row>
      <Row>
        <Col xs={16}>
          <Main services={services} onAdd={onAdd}></Main>
        </Col>
        <Col xs={8}>
          
          <Basket
            formValue={formValue}
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
          >
          </Basket>
        </Col>
      </Row>
    </>
  );
}

export default App;