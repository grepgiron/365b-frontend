import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate, useParams } from "react-router-dom";
import qs from 'qs';

import { 
  Row,
  Col, 
  ButtonToolbar, 
  IconButton, 
  Divider, 
  Panel,
  Drawer,
  Button,
  Message 
} from 'rsuite'

import { Card } from 'react-bootstrap'
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import Invoice from './invoice';

//import '../index.css'
import 'react-perfect-scrollbar/dist/css/styles.css';


export default function Basket(props) {
  const { formValue, cartItems, onAdd, onRemove } = props; 
  const { loading, setLoading } = React.useState(false); 
  const [ cartEmpty, cartEmptySet ] = React.useState(false);  // cart is empty
  const [openWithHeader, setOpenWithHeader] = React.useState(false); // open drawer with header
  const itemsPrice = (cartItems.reduce((a, c) => a + c.cantidad * c.precio, 0)/1.15); // total cobro de items
  const taxPrice = itemsPrice * 0.15; // impuestos cobrados
  const totalPrice = itemsPrice + taxPrice; // total cobrado

  function handleClick() {
    formValue.productos = cartItems;
    formValue.sub_total = itemsPrice.toFixed(2);
    formValue.total = totalPrice.toFixed(2);
    formValue.impuesto = taxPrice.toFixed(2);
    if(formValue.total > 0){
      setOpenWithHeader(true);
      console.log('CheckOut: '+ JSON.stringify(formValue))
      cartEmptySet(false);
    }else{
      cartEmptySet(true);
    }
  }

  const match = useNavigate();
  function volverCitas(id) {
    match("/pos/ventas/show/"+id);
  }

  const handlePostInvoice = async () => {
    //setLoading(true);
    console.log('CheckOut: '+ JSON.stringify(formValue))
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify(formValue)
    };
    fetch('https://beauty365api.herokuapp.com/api/v1/facturas/create', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('CheckOut: '+ JSON.stringify(data))
        volverCitas(data._id);
      })
      .catch(error => {
        console.log('CheckOut: '+ JSON.stringify(error))
      });
  }

  const ErrMessage = (props) => {
    return (
      <div>
        <Message showIcon type="error">{props.mensaje}</Message>
      </div>
    );
  };


  return (
    <>
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
        <Card.Body style={{ height: 200}}>
          <PerfectScrollbar>
            {cartItems.length == 0 && <p>Agregar servicios en el carrito</p>}
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
                  {item.cantidad}
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
                Lps. {item.precio.toFixed(2) * item.cantidad}</p>
              </Col>
            </Row>
          ))}
          </PerfectScrollbar>
            <>
              <hr></hr>
              <Row >
                <Col xs={10}></Col>
                <Col xs={7}>
                  <p style={{ fontWeight: 600}}>
                    Sub Total</p>
                </Col>
                <Col xs={7} style={{ textAlign: 'right'}}>Lps. {itemsPrice.toFixed(2)}</Col>
              </Row>
              <Row >
                <Col xs={10}></Col>
                <Col xs={7}>
                  <p style={{ fontWeight: 600}}>
                    ISV 15%</p>
                </Col>
                <Col xs={7} style={{ textAlign: 'right'}}>{taxPrice.toFixed(2)}</Col>
              </Row>
              <Row >
                <Col xs={10}></Col>
                <Col xs={7}>
                  <p style={{ fontWeight: 600}}>
                    Total</p>
                </Col>
                <Col xs={7} style={{fontWeight: 600, textAlign: 'right'}}>{totalPrice.toFixed(2)}</Col>
              </Row>
              <Divider />
              {cartEmpty ? <ErrMessage mensaje={'No hay productos en el carrito'}/> : ''}
              <Row>
                <Col md={4} mdOffset={18}>
                  <IconButton appearance='primary' icon={<CreditCardPlusIcon/>} onClick={() => handleClick()}>
                    Cobrar
                    </IconButton>
                </Col>
              </Row>
            </>
        </Card.Body>
      </Card>
      <Drawer open={openWithHeader} onClose={() => setOpenWithHeader(false)} size="sm">
        <Drawer.Header>
          <Drawer.Title>Detalle de Factura</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setOpenWithHeader(false)}>Cancelar</Button>
            <Button onClick={() => handlePostInvoice(formValue)} appearance='primary'>Generar</Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
            {/*Aqui va el detalle previo a generar factura*/}
              <Invoice formValue={formValue}/>
        </Drawer.Body>
      </Drawer>
      </>
  );
}