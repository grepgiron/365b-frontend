import React from 'react'
import { Card, Row, Table  } from 'react-bootstrap';

import { Col, Schema, Form, FlexboxGrid, ButtonGroup, IconButton, Input, InputNumber, Button,
  InputPicker,
  DatePicker } from 'rsuite';

import 'bootstrap/dist/css/bootstrap.min.css';

import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';

const { ArrayType, StringType, NumberType, ObjectType } = Schema.Types;
const model = Schema.Model({
 orderId: StringType().minLength(6, 'Minimum 6 characters required').isRequired('Required.'),
 products: ArrayType().of(
   ObjectType().shape({
     name: StringType().minLength(6, 'Minimum 6 characters required').isRequired('Required.'),
     quantity: NumberType().isRequired('Required.'),
     total: NumberType().isRequired('Required.'),
     precio: NumberType().isRequired('Required.')
   })
 )
});

const ErrorMessage = ({ children }) => <span style={{ color: 'red' }}>{children}</span>;
const Cell = ({ children, style, ...rest }) => (
 <td style={{ padding: '2px 4px 2px 0', verticalAlign: 'top', ...style }} {...rest}>
   {children}
 </td>
);

//------item de form dinamico
const ProductItem = ({ rowValue = {}, onChange, rowIndex, rowError }) => {
  const handleChangeName = value => {
    //console.log(value.target);
    onChange(rowIndex, { ...rowValue, name: value });
    
    //
  };
  const handleChangeAmount = value => {
    onChange(rowIndex, { ...rowValue, quantity: value });
    //handleChangeTotal(value);
    
    //rowValue[rowIndex].total = (value * rowValue.precio).toFixed(2);
  };
  const handleChangePrice = value => {
    onChange(rowIndex, { ...rowValue, precio: value });
  };
  const handleChangeTotal = value => {
    (onChange(rowIndex, { ...rowValue, total: (rowValue.precio * value)}))
  };

  return (
    <tr>
      <Cell>
        <Input 
          value={rowValue.name} 
          onChange={handleChangeName} 
          style={{ width: 196 }} 
          size="sm"
          />
        {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
      </Cell>
      <Cell>
        <InputNumber
          min={0}
          size="sm"
          value={rowValue.quantity}
          onChange={handleChangeAmount}
          style={{ width: 100 }}
        />
        {rowError ? <ErrorMessage>{rowError.quantity.errorMessage}</ErrorMessage> : null}
      </Cell>
      <Cell>
        <InputNumber
          min={0}
          size="sm"
          value={rowValue.precio}
          onChange={handleChangePrice}
          style={{ width: 100 }}
        />
        {rowError ? <ErrorMessage>{rowError.quantity.errorMessage}</ErrorMessage> : null}
      </Cell>
    </tr>
  );
};

//-----metodo de form dinamico
const ProductInputControl = ({ value = [], onChange, fieldError }) => {
 const errors = fieldError ? fieldError.array : [];
 const [products, setProducts] = React.useState(value);
 const handleChangeProducts = nextProducts => {
   setProducts(nextProducts);
   onChange(nextProducts);
 };
 const handleInputChange = (rowIndex, value) => {
   const nextProducts = [...products];
   nextProducts[rowIndex] = value;
   handleChangeProducts(nextProducts);
 };

 const handleMinus = () => {
   handleChangeProducts(products.slice(0, -1));
 };
 const handleAdd = () => {
   handleChangeProducts(products.concat([{ name: '', quantity: null, precio: null, total: null }]));
 };
 return (
   <Table responsive="sm">
     <thead>
       <tr>
         <th>Servicio</th>
         <th>Cantidad</th>
         <th>Precio</th>
       </tr>
     </thead>
     <tbody>
       {products.map((rowValue, index) => (
         <ProductItem
           key={index}
           rowIndex={index}
           rowValue={rowValue}
           rowError={errors[index] ? errors[index].object : null}
           onChange={handleInputChange}
         />
       ))}
     </tbody>
     <tfoot>
       <tr>
         <Cell colSpan={2} style={{ paddingTop: 10 }}>
           <ButtonGroup size="xs">
             <IconButton onClick={handleAdd} icon={<PlusIcon />} />
             <IconButton onClick={handleMinus} icon={<MinusIcon />} />
           </ButtonGroup>
         </Cell>
       </tr>
     </tfoot>
   </Table>
 );
};

//------Metodo para agregar cartas de productos
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

const PosForm = () => {

  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});

  const [formValue, setFormValue] = React.useState({
    orderId: '',
    products: [{ name: '', quantity: null, precio: null, total: 0 }],
  });

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
          <Card>
            {/* Aqui comienza el form*/}
            <Form
              ref={formRef}
              checkTrigger="blur"
              onChange={setFormValue}
              onCheck={setFormError}
              formValue={formValue}
              model={model}
            >
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
              <Card.Body>
                <div className='overflow-auto' style={{ overflow: 'scroll', height: '300px'}}>
                  {/* Aqui va el form dinamico*/}
                  <Form.Control
                    name="products"
                    accepter={ProductInputControl}
                    fieldError={formError.products}
                  />

                  <hr />
                  <Button
                    appearance="primary"
                    onClick={() => {
                      formRef.current.check();
                    }}
                  >
                    Submit
                  </Button>
                  {/* Aqui termina el form dinamico*/}
                </div>
              </Card.Body>
              {
              formValue.products.map((product, index) => (
                product.total = product.precio * product.quantity
              ))
              }
              {console.log(formValue.products)}
              </Form>
            {JSON.stringify(formValue)}
            {/* Aqui va el form dinamico*/}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PosForm;