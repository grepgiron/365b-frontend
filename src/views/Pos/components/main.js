import React from 'react';
import Product from './product';
import { Row, Card } from 'react-bootstrap';


import { Panel } from 'rsuite'

export default function Main(props) {
  const { services, onAdd } = props;
  return (
      <Card>
        <Card.Header>Servicios</Card.Header>
        <Card.Body>
            <Row xs={12} md={4}>
              {services.map((product) => (
                //console.log(product),
                <Product key={product._id} product={product} onAdd={onAdd}></Product>
              ))}
            </Row>
        </Card.Body>
      </Card>
  );
}