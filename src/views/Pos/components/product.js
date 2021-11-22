import React from 'react';
import { Col, Button } from 'react-bootstrap'

import { Panel } from 'rsuite'

import './style.scss'

import 'bootstrap/dist/css/bootstrap.min.css';

function Card(props) {
  const { product } = props;
  return (
    <div className="card4" {...props} >
      <p style={{ fontSize: 13}}>{product.nombre}</p>
      <p>L. {product.precio}</p>
      <div className="dimmer"></div>
      <div className="go-corner">
        <div className="go-arrow">
          +
        </div>
      </div>
    </div>
  );
}

function Main(props) {
  const { product } = props;
  return (
    <div {...props}>
      <div>
        <div class="shop__thumb">
          <a href="#">
            <div class="shop-thumb__img">
              <img src="https://via.placeholder.com/120x120/FFA07A/000000" class="img-responsive" alt="..."/>
            </div>
            <p class="shop-thumb__title">
              {product.nombre}
            </p>
            <div class="shop-thumb__price">
              L. {product.precio}
            </div>
          </a>
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
      <Main 
        product={product} 
        onClick={() => onAdd(product)}
        style={{ cursor: "pointer", hover: "" }}
        />
    </Col>
  );
}