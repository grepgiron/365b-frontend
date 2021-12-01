import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { 
  Row, 
  Card 
} from 'react-bootstrap';

import Product from './product';

import 'react-perfect-scrollbar/dist/css/styles.css';

import { Panel } from 'rsuite'

export default function Main(props) {
  const { services, onAdd } = props;
  return (
      <Card>
        <Card.Header>Servicios</Card.Header>
        <Card.Body style={{ height: 420}}>
          <PerfectScrollbar>
            <Row xs={12} md={4}>
              {services.map((product) => (
                //console.log(product),
                product = {...product, producto: product._id},
                <Product key={product._id} product={product} onAdd={onAdd}></Product>
              ))}
            </Row>
          </PerfectScrollbar>
        </Card.Body>
      </Card>
  );
}