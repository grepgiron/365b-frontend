import React, { useRef, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import axios from 'axios';

import {
  Row,
  Col,
  IconButton
} from 'rsuite';

import PageIcon from '@rsuite/icons/Page';


import './print.css'
import Invoice from './invoice';

const App = () => {  
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [cliente, setCliente] = React.useState([]);
  const [invoice, setInvoice] = React.useState([]);
  const [doc_autorizado, setDocAutorizado] = React.useState([]);
  const [document, setDocument] = React.useState([]);
  const [ mask, setMask] = React.useState([]);


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const format = () =>{
    let x = invoice.num_factura;
    console.log(x);
    const mascara = '00000000';
    setMask(mascara.substring(0,8-(x)));
    return mask;
  }

  useEffect(() => {
    // GET request using axios
    axios.get(`https://beauty365api.herokuapp.com/api/v1/facturas/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      if (response!==error) {
        console.log(response.data);
        setInvoice(response.data);
        setLoading(true);
        axios.get('https://beauty365api.herokuapp.com/api/v1/clientes/'+response.data.cliente)
          .then((response) => {
            if (response!==error) {
              console.log(response.data);
              setCliente(response.data);
              setLoading(true);
            } else {
              console.log(response);
              setError(response);
              setLoading(true);
            }
          })
          
        // Imprimir estado clientsArray despues de asignar valores
        //console.log(clientsArray);
      } else {
        setError(response);
        setLoading(true);
      }
    })
  }, [error, id]);

  return (
    <>
      <Row>
        <Col xs={4}>
          <IconButton appearance="primary" icon={<PageIcon />} onClick={handlePrint}>Imprimir</IconButton>
        </Col>
      </Row>
      <br/>
      <div ref={componentRef}>
          <Invoice id={id}/>               
      </div>
    </>     
  )
}
export default App