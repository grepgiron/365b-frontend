import React from 'react';
import { Col, Button } from 'react-bootstrap'

import { Panel } from 'rsuite'

import 'bootstrap/dist/css/bootstrap.min.css';

function Card(props) {
  const { product } = props;
  return (
    <div class="card4" {...props}>
      <p style={{ fontSize: 13}}>{product.nombre}</p>
      <p>L. {product.precio}</p>
      <div class="dimmer"></div>
      <div class="go-corner">
        <div class="go-arrow">
          +
        </div>
      </div>
    </div>
  );
}

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <Col>
      {delete product['createdAt'] && 
      delete product['updatedAt'] &&
      delete product['detalle'] &&
      delete product['descripcion'] &&
      delete product['code']}
      <Card 
        product={product} 
        onClick={() => onAdd(product)}
        style={{ cursor: "pointer", hover: "" }}
        />
      {/* <Card>
        <Card.Img variant="top"/>
          <Card.Body>
            <Card.Title >{product.nombre}</Card.Title>
            <Card.Text>Lps. {product.precio}</Card.Text>
            <Button variant="primary" onClick={() => onAdd(product)}>Agregar</Button>
          </Card.Body>
        </Card> */}
    </Col>
  );
}