import React from 'react';

import { Row, Col, ButtonToolbar, IconButton, Divider, Panel } from 'rsuite'
import { Card } from 'react-bootstrap'
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';

//import '../index.css'



export default function Basket(props) {
  const { formValue, cartItems, onAdd, onRemove } = props;
  const itemsPrice = (cartItems.reduce((a, c) => a + c.qty * c.precio, 0)/1.15);
  const taxPrice = itemsPrice * 0.15;
  const totalPrice = itemsPrice + taxPrice;

  function handleClick() {
    formValue.items = cartItems
    console.log('CheckOut: '+ JSON.stringify(formValue))
  }


  return (
      <Card>
        <Card.Header>
          <Row>
            <Col xs={12}>
              <p style={{ fontWeight: 600}}>
                Nombre</p>
            </Col>
            <Col xs={7}>
              <p style={{ fontWeight: 600}}>
                Cantidad</p>
            </Col>
            <Col xs={5}>
              <p style={{ fontWeight: 600}}>
                Precio</p>
            </Col>
          </Row>

        </Card.Header>
        <Card.Body>
          {cartItems.map((item) => (
            <Row key={item._id} style={{ padding: 2}}>
              <Col xs={12}><p>{item.nombre}</p></Col>
              <Col xs={7}>
                <ButtonToolbar>
                  <IconButton  
                    size="xs" 
                    onClick={() => onRemove(item)} 
                    icon={<MinusIcon/>}
                    appearance="subtle"
                    color="red"
                  />
                  <Divider vertical />
                  {item.qty}
                  <Divider vertical />
                  <IconButton
                    size="xs" 
                    onClick={() => onAdd(item)}  
                    icon={<PlusIcon/>}
                    appearance="subtle"
                    color="green"
                    />
                </ButtonToolbar>
              </Col>
              <Col xs={5}>
              <p style={{ fontWeight: 600, textAlign: 'right'}}>
                Lps. {item.precio.toFixed(2)}</p>
              </Col>
            </Row>
          ))}
            <>
              <hr></hr>
              <Row >
                <Col xs={12}></Col>
                <Col xs={7}>
                  <p style={{ fontWeight: 600}}>
                    Sub Total</p>
                </Col>
                <Col xs={5} style={{ textAlign: 'right'}}>Lps. {itemsPrice.toFixed(2)}</Col>
              </Row>
              <Row >
                <Col xs={12}></Col>
                <Col xs={7}>
                  <p style={{ fontWeight: 600}}>
                    ISV 15%</p>
                </Col>
                <Col xs={5} style={{ textAlign: 'right'}}>{taxPrice.toFixed(2)}</Col>
              </Row>
              <Row >
                <Col xs={12}></Col>
                <Col xs={7}>
                  <p style={{ fontWeight: 600}}>
                    Total</p>
                </Col>
                <Col xs={5} style={{fontWeight: 600, textAlign: 'right'}}>{totalPrice.toFixed(2)}</Col>
              </Row>
              <hr />
              <div className="row">
                <button onClick={() => handleClick()}>
                  Checkout
                </button>
              </div>
            </>
        </Card.Body>
      </Card>
  );
}