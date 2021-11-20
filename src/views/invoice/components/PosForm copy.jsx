import React, { useState, useCallback } from "react";
import Form from "usetheform";
import { Cart } from "./cart/Cart";
import ReactJson from "react-json-view";
import { Card, Container  } from 'react-bootstrap'

import {
  Col,
  Row, 
  Grid
} from 'rsuite'

//import "bulma/css/bulma.css";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.css';

export default function PosForm() {
  const [formState, setFormState] = useState({});
  const [items, setCartItem] = useState([]);

  const onRemoveItem = useCallback(
    (idToRemove) =>
      setCartItem((prev) => prev.filter(({ id }) => id !== idToRemove)),
    []
  );
  const onAddItem = useCallback(() => {
    const item = createRandomItem();
    setCartItem((prev) => [...prev, item]);
  }, []);

  return (
  <>
  <Container fluid>
    <Row>
      <Col xs={16}>
        {/* SERVICIOS que se agregan con un click*/}
        <Card>
          <Card.Header>Servicios</Card.Header>
          <Card.Body>
            {/* <CardService /> */}
          </Card.Body>
        </Card>
      </Col>
      <Col xs={8}>
        <Card>
          <Card.Header>Detalles</Card.Header>
          <Card.Body>
            <Row>
              <Col xs={14}>Servicio</Col>
              <Col xs={3}>Cantidad</Col>
              <Col xs={3}>Precio</Col>
              <Col xs={2}></Col>
            </Row>
          {/* Lista de Servicios a cobrar*/}

            <Form
              onSubmit={(state) => console.log(state)}
              onChange={(state) => setFormState(state)}
            >
              <Cart items={items} onRemoveItem={onRemoveItem} />
              <button type="submit" className="button is-small is-link">
                Submit
              </button>
            </Form>


              <br />
              <button
                type="button"
                className="button is-small is-success"
                onClick={onAddItem}
              >
                Add item to cart
              </button>
 
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
    <div className="App">
      
      <div className="box">
        <ReactJson src={formState} />
      </div>
    </div>
    </>
  );
}

let id = 0;
const createRandomItem = () => {
  id = id + 1;
  return {
    id,
    _id: 'a',
    qty: 1,
    desc: `Item number: ${id}`,
    price: Number((Math.random() * 10 + 1).toFixed(2))
  };
};
