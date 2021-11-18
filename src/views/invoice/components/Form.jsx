import React from 'react';
import axios from 'axios';


import { Schema, Form, FlexboxGrid, ButtonGroup, IconButton, Input, InputNumber, Button, 
  Row, Col, Grid, DatePicker, Divider, InputPicker
} from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';

const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-10`} ref={ref} className={error ? 'has-error' : ''}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      <Form.HelpText>{message}</Form.HelpText>
    </Form.Group>
  );
});

const { ArrayType, StringType, NumberType, ObjectType } = Schema.Types;
const model = Schema.Model({
  orderId: StringType().minLength(6, 'Minimum 6 characters required').isRequired('Required.'),
  products: ArrayType().of(
    ObjectType().shape({
      name: StringType().minLength(6, 'Minimum 6 characters required').isRequired('Required.'),
      quantity: NumberType().isRequired('Required.')
    })
  )
});

const ErrorMessage = ({ children }) => <span style={{ color: 'red' }}>{children}</span>;
const Cell = ({ children, style, ...rest }) => (
  <td style={{ padding: '2px 4px 2px 0', verticalAlign: 'top', ...style }} {...rest}>
    {children}
  </td>
);

const ProductItem = ({ rowValue = {}, onChange, rowIndex, rowError }) => {
  const handleChangeName = value => {
    onChange(rowIndex, { ...rowValue, nombre: value });
  };
  const handleChangeAmount = value => {
    onChange(rowIndex, { ...rowValue, cantidad: value });
  };
  const handleChangePrice = value => {
    onChange(rowIndex, { ...rowValue, precio: value });
  };
  const handleChangeTotal = value => {
    onChange(rowIndex, { ...rowValue, total: value });
  };
  const handleChangeISV = value => {
    onChange(rowIndex, { ...rowValue, isv: value });
  };

  return (
    <>
      <Col xs={8}>
        <Cell>
          <Input value={rowValue.nombre} onChange={handleChangeName} style={{ marginRight: 100}} />
          {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
        </Cell>
      </Col>
      <Col  xs={4}>
        <Cell>
          <InputNumber

            min={0}
            value={rowValue.cantidad}
            onChange={handleChangeAmount}
            
          />
          {rowError ? <ErrorMessage>{rowError.quantity.errorMessage}</ErrorMessage> : null}
        </Cell>
      </Col>
      <Col xs={4}>
        <Cell>
          <Input value={rowValue.precio} onChange={handleChangePrice}/>
          {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
        </Cell>
      </Col>
      <Col xs={4}>
        <Cell>
          <Input readOnly value={rowValue.isv} onChange={handleChangeISV}/>
          {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
        </Cell>
      </Col>
      <Col xs={4}>
        <Cell>
          <Input readOnly value={rowValue.total} onChange={handleChangeTotal} />
          {rowError ? <ErrorMessage>{rowError.name.errorMessage}</ErrorMessage> : null}
        </Cell>
      </Col>
    </>
  );
};

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
    handleChangeProducts(products.concat([{ nombre: '', cantidad: null, precio: null }]));
  };
  return (
    <>
    <Grid fluid>
      <Row>
        <Col xs={8}>
          <Cell>Producto / Servicio</Cell>
        </Col>
        <Col xs={4}>
          <Cell>Cantidad</Cell>
        </Col>
        <Col xs={4}>
          <Cell>Precio</Cell>
        </Col>
        <Col xs={4}>
          <Cell>ISV</Cell>
        </Col>
        <Col xs={4}>
          <Cell>Total</Cell>
        </Col>
      </Row>
      <Row>
        {products.map((rowValue, index) => (
          <ProductItem
            key={index}
            rowIndex={index}
            rowValue={rowValue}
            rowError={errors[index] ? errors[index].object : null}
            onChange={handleInputChange}
          />
        ))}
      </Row>
      <Row>
        <Cell colSpan={2} style={{ paddingTop: 10 }}>
          <ButtonGroup size="xs">
            <IconButton onClick={handleAdd} icon={<PlusIcon />} />
            <IconButton onClick={handleMinus} icon={<MinusIcon />} />
          </ButtonGroup>
        </Cell>
      </Row>
      </Grid>
    </>
  );
};

const FormEmployee = () => {
  const formRef = React.useRef();
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = React.useState({
    orden: '',
    cliente: '',
    fecha: '',
    products: [
      { 
        nombre: '', 
        cantidad: null, 
        precio: null,
        total: null 
      },
    ],
    subtotal: null,
    isv: null,
    total: null,
  });
  return (
    <>
      <h3>Nueva Factura</h3>
        <Form
          ref={formRef}
          checkTrigger="blur"
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <Row>
            <Form.Group controlId="orden" >
              <Col xs={12}>
                <Form.ControlLabel>Cliente</Form.ControlLabel>
                <Form.Control name="cliente" accepter={Input} errorMessage={formError.cliente} />

              </Col>
              <Col xs={12}>
                <div className="field">
                  <p>Metodo de Pago</p>
                  <InputPicker name="fecha" errorMessage={formError.fecha} block/>
                </div>
                <div className="field">
                  <p>Fecha</p>
                  <DatePicker name="fecha" errorMessage={formError.fecha} />
                </div>

              </Col>
            </Form.Group>
          </Row>
          <h6>Detalle de Factura</h6>
          <Divider />
          {/* Metodo para agregar mas elementos al arreglo*/}
          <Form.Control
            name="products"
            accepter={ProductInputControl}
            fieldError={formError.products}
          />
          <FlexboxGrid justify="end">
            <FlexboxGrid.Item colspan={4}> SubTotal </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>L. {formValue.subtotal}</FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="end">
            <FlexboxGrid.Item colspan={4}>Importe Exento	 </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>L. </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="end">
            <FlexboxGrid.Item colspan={4}>Importe Gravado	 </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>L. </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="end">
            <FlexboxGrid.Item colspan={4}>Impuesto </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>L. </FlexboxGrid.Item>
          </FlexboxGrid>
          <FlexboxGrid justify="end">
            <FlexboxGrid.Item colspan={4}>Total </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={4}>L. {formValue.total}</FlexboxGrid.Item>
          </FlexboxGrid>

          <hr />
          <Button
            appearance="primary"
            onClick={() => {
              formRef.current.check();
            }}
          >
            Submit
          </Button>
        </Form>

    </>
  );
};

export default FormEmployee;