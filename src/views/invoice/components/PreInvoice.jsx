import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Table,
  Row,
  Col,
  Message,
  Loader,
  Panel,
  Form,
  Input,
  InputPicker,
  DatePicker,
  IconButton
} from 'rsuite';

// Iconos
import Edit2 from '@rsuite/icons/legacy/Edit2';
import VisibleIcon from '@rsuite/icons/Visible';
import PageIcon from '@rsuite/icons/Page';

const { HeaderCell, Cell, Column } = Table;

function Profile() {
  const { id } = useParams();
  const [invoice, setInvoice] = React.useState([]);
  const [ client, setClient ] = React.useState([]);
  const [ clients, setClients] = React.useState([]);
  const [ payments, setPayments] = React.useState([]);
  const [ service, setService] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = useState(null);


  useEffect(() => {
    // GET request using axios
    axios.get(`https://beauty365api.herokuapp.com/api/v1/facturas/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      if (response!==error) {
        setInvoice(response.data);
        setLoading(true);
        axios.get(`https://beauty365api.herokuapp.com/api/v1/clientes/${response.data.cliente}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then((response) => {
          if (response!==error) {
            setClient(response.data);
            setLoading(true);
          }
        }).catch((error) => {
          setError(error);
        });
        // Imprimir estado clientsArray despues de asignar valores
        //console.log(clientsArray);
      } else {
        setError(response);
        setLoading(true);
      }
    })

    axios.get(`https://beauty365api.herokuapp.com/api/v1/clientes`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      if (response!==error) {
        setClients(response.data);
        setLoading(true);
        // Imprimir estado clientsArray despues de asignar valores
        //console.log(clientsArray);
      } else {
        setError(response);
        setLoading(true);
      }
    })

    axios.get(`https://beauty365api.herokuapp.com/api/v1/metodos_pago`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      if (response!==error) {
        setPayments(response.data);
        setLoading(true);
        // Imprimir estado clientsArray despues de asignar valores
        //console.log(clientsArray);
      } else {
        setError(response);
        setLoading(true);
      }
    })


  }, []);

  const navigate = useNavigate();


  const printReceipt = () => {
    navigate('/pos/ventas/print/' + id);
  }
    
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    return (
      <>
      <Row>
        <Col xs={4}>
          <IconButton appearance="primary" icon={<PageIcon />} onClick={printReceipt}>Imprimir</IconButton>
        </Col>
      </Row>
      <br/>
        <Form
          formValue={invoice}
          onChange={setInvoice}
        >
        <Row>
          <Col xs={10}>
            <Panel bordered header={`Factura # ${invoice.num_factura}`}>
                <Row>
                  <Col xs={16}>
                    <Form.Group controlId="nombres">
                      <Form.ControlLabel>Cliente</Form.ControlLabel>
                      <Form.Control 
                        labelKey="nombres" 
                        name="cliente"
                        accepter={InputPicker} 
                        data={clients} 
                        valueKey="_id" 
                      />
                    </Form.Group>
                    <Form.Group controlId="payments">
                      <Form.ControlLabel>Metodo de Pago</Form.ControlLabel>
                      <Form.Control 
                        labelKey="nombre" 
                        name="metodo_pago"
                        accepter={InputPicker} 
                        data={payments} 
                        valueKey="_id" 
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={8}>
                    <Form.Group controlId="fecha" >
                      <Form.ControlLabel>Fecha</Form.ControlLabel>
                      <Form.Control name="fecha" accepter={Input} type="Date" style={{ width: 150}}/>
                    </Form.Group>
                  </Col>
                </Row>
            </Panel>
          </Col>
          
          <Col xs={14}>
            <Panel bordered header="Servicios">
              <Table
                data={invoice.productos}
                showHeader={true}
                autoHeight={true}
                rowHeight={40}
              >
                <Column>
                  <HeaderCell>#</HeaderCell>
                  <Cell>
                    {(rowData, rowIndex) => (rowIndex+1)}
                  </Cell>
                </Column>
                <Column width={200}>
                  <HeaderCell >Servicio</HeaderCell>
                  <Cell>
                    {(rowData, rowIndex) => (rowData.nombre)}
                  </Cell>
                </Column>
                <Column>
                  <HeaderCell className="text-center">Cantidad</HeaderCell>
                  <Cell className="text-center">
                    {(rowData, rowIndex) => (rowData.cantidad)}
                  </Cell>
                </Column>
                <Column>
                  <HeaderCell className="text-end">Precio</HeaderCell>
                  <Cell className="text-end">
                    {(rowData, rowIndex) => (rowData.precio)}
                  </Cell>
                </Column>
                <Column>
                  <HeaderCell className="text-end">Total</HeaderCell>
                  <Cell className="text-end">
                    {(rowData, rowIndex) => ((rowData.cantidad * rowData.precio))}
                  </Cell>
                </Column>
              </Table>
              <hr/>
              <Row >
                  <p style={{ fontWeight: 600}}>
                  Total:  L. {invoice.total}</p>
              </Row>
            </Panel>
          </Col>
        </Row>
        </Form>
      </>
    );
  }
}

export default Profile;