import React, { useState, useEffect} from 'react'
import { Card, Row } from 'react-bootstrap';

import { Col } from 'rsuite'

//import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import Main from './components/main';
import Basket from './components/basket';
import data from './data';

import './index.scss'

function App() {
  const { products } = data;
  const [error, setError] = useState(null);
  const [services, setServices ] = useState([])
  const [cartItems, setCartItems] = useState([]);

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
    )
  }, [])


  //Metodo Agregar nuevo item
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  //Metodo Eliminar item
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <>
      <Row>
        <Col xs={15}>
          <Main services={services} onAdd={onAdd}></Main>
        </Col>
        <Col xs={9}>
          <Basket
            cartItems={cartItems}
            onAdd={onAdd}
            onRemove={onRemove}
          ></Basket>
        </Col>
      </Row>
      {JSON.stringify(cartItems)}
    </>
  );
}

export default App;