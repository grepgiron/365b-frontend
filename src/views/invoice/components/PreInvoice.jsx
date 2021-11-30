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
  DatePicker
} from 'rsuite';

// Iconos
import Edit2 from '@rsuite/icons/legacy/Edit2';
import VisibleIcon from '@rsuite/icons/Visible';

const { HeaderCell, Cell, Column } = Table;

function Profile() {
  const { id } = useParams();
  const [invoice, setInvoice] = React.useState([]);
  const [ client, setClient ] = React.useState([]);
  const [ clients, setClients] = React.useState([]);
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


  }, []);
    
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    return (
      <>
      <Row>
        <Col xs={8} xsPush={16}>
          Aqui boton de Generar y Cancelar
        </Col>
      </Row>
        <Form
          formValue={invoice}
          onChange={setInvoice}
        >
        <Row>
          <Col xs={10}>
            <Panel bordered header="Detalle de Cliente">
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
                  </Col>
                  <Col xs={8}>
                    <Form.Group controlId="fecha" >
                      <Form.ControlLabel>Fecha</Form.ControlLabel>
                      <Form.Control name="fecha" accepter={Input} type="Date" style={{ width: 150}}/>
                    </Form.Group>
                  </Col>
                </Row>
              {JSON.stringify(client)}
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
                <Column width={50} fixed>
                  <HeaderCell>#</HeaderCell>
                  <Cell>
                    {(rowData, rowIndex) => (rowIndex+1)}
                  </Cell>
                </Column>
                <Column flexGrow={1}>
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
                    {(rowData, rowIndex) => (rowData.precio.toFixed(2))}
                  </Cell>
                </Column>
                <Column>
                  <HeaderCell className="text-end">Total</HeaderCell>
                  <Cell className="text-end">
                    {(rowData, rowIndex) => ((rowData.cantidad * rowData.precio).toFixed(2))}
                  </Cell>
                </Column>
              </Table>
              <hr/>
              <Row >
                <Col xs={12}></Col>
                <Col xs={5}>
                  <p style={{ fontWeight: 600, textAlign: 'right'}}>
                    Sub Total:</p>
                </Col>
                <Col xs={7} style={{ textAlign: 'right'}}>Lps. {invoice.sub_total}</Col>
              </Row>
              <Row >
                <Col xs={12}></Col>
                <Col xs={5}>
                  <p style={{ fontWeight: 600, textAlign: 'right'}}>
                    ISV:</p>
                </Col>
                <Col xs={7} style={{ textAlign: 'right'}}>Lps. {invoice.impuesto.toFixed(2)}</Col>
              </Row>
              <Row >
                <Col xs={12}></Col>
                <Col xs={5}>
                  <p style={{ fontWeight: 600, textAlign: 'right'}}>
                    Total:</p>
                </Col>
                <Col xs={7} style={{ textAlign: 'right'}}>Lps. {invoice.total}</Col>
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