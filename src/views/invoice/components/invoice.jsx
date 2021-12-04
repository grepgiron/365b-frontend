import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//importaciones de rsuitjs
import {
  Divider,
  Grid,
  Panel,
  Row,
  Col,
  Tag,
  IconButton,
  Loader,
  Message
} from 'rsuite';
import axios from 'axios';


function Invoice(props) {
  const { id } = props;
  const navigate = useNavigate();
  const[format, setFormat] = useState('');
  const [ client, setClients] = useState(
    {
      nombres: '',
      telefono: '',
      dni: '',
      email: ''
    }
      
  );
  const [ invoice, setInvoice] = useState({
    num_factura: '',
    fecha: '',
    total: '',
    sub_total: '',
    impuesto: '',
    doc_autorizacion: {},
    cliente: '',
    metodo_pago: '',
    productos: [],
  });
  const [ document_au, setDocument] = useState({});
  const [ establecimientos, setEstablecimientos] = useState([]);
  const [ pos, setPos] = useState([]);
  const [ documento_fiscal, setDocumento_fiscal] = useState([]);
  const [ comercio, setComercio] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState(null);

  const isMounted = useRef(false);

  useEffect(() => {

    isMounted.current = true;

    async function fetchData() {
      await axios.get(`https://beauty365api.herokuapp.com/api/v1/facturas/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
        if(!response.data.error){
          setInvoice(response.data)
          setLoading(true);
          axios.get(`https://beauty365api.herokuapp.com/api/v1/clientes/${response.data.cliente}`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/x-www-form-urlencoded"
              }
              }).then((response) => {
                if(!response.data.error){
                  setClients(response.data)
                  setLoading(true);
                }
              }).catch((error) => {
                setError(error);
              });
          console.log(response.data);
        } else {
          console.log(response);
          setError(response);
          setLoading(true);
        }
      })
      await axios.get(`https://beauty365api.herokuapp.com/api/v1/comerciales/`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
        if(!response.data.error){
          setComercio(response.data[0])
          setLoading(true);
          console.log(response.data);
        } else {
          console.log(response);
          setError(response);
          setLoading(true);
        }
      })
    }

  fetchData();

  return () => isMounted.current = false;
}
, [error]);

  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader center size="lg" content="Cargando..." />;
  } else {
    return (
      <>
      
      <div className="mb-12">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12">
              <div className="">
                <div className="upper p-4">
                  <div className="d-flex justify-content-between">
                    {/* Poner Aqui dato de la empresa */}
                    <div className="d-flex flex-row align-items-center">
                      <img src="/images/logo2.jpg" width="60"/>
                      <div className="add" style={{ marginLeft: 20}}>
                        <span className="font-weight-bold d-block">{comercio.nombre}</span>
                        <span className="font-weight-bold d-block">{comercio.rtn}</span>
                        <small className="font-weight-bold d-block">{comercio.direccion}</small>
                        <small className="font-weight-bold d-block">{comercio.telefono} / {comercio.email}</small>
                      </div> 
                    </div>
                    {/* Poner Aqui dato de actuorizacion de factura */}
                    <div className="col col-lg-3 text-center"> 
                      <small className="font-weight-bold d-block">
                        <span className="font-weight-bold d-block">Factura # 
                        {invoice.doc_autorizacion.establecimiento.prefijo}-
                        {invoice.doc_autorizacion.pos.prefijo}-
                        {invoice.doc_autorizacion.documento_fiscal.prefijo}-
                        { '00000000'.substring(0,8-JSON.stringify(invoice.num_factura).length)}{invoice.num_factura}</span>
                        <p></p>
                      </small>
                        <small className="font-weight-bold d-block">Fecha: {invoice.fecha}</small>
                      <small className="font-weight-bold d-block">CAI</small>
                      <small>{invoice.doc_autorizacion.cai}</small>
                    </div>
                  </div>
                  <hr/>
                  {/* Poner Aqui dato del Cliente */}
                  <div>
                    <div></div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center"> 
                        <i className="fa fa-check-circle-o"></i>
                        <span className="ml-2">Nombre: {client.nombres}</span>
                      </div> 
                    </div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <i className="fa fa-check-circle-o"></i>
                        {client.dni !== '' ? <span className="ml-2">RTN: {client.dni}</span> : <span className="ml-2">RTN: {}</span>}
                      </div>
                    </div>
                  </div>
                  <hr/>
                  {/* Poner Aqui dato de la factura */}
                  <table className="table table-sm">
                    <thead>
                    <tr>
                      <th>Detalle</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-center">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoice.productos.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nombre}</td>
                        <td className="text-center">{item.cantidad}</td>
                        <td className="text-end">{item.precio.toFixed(2)}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                  {/* Poner Aqui datos de items 
                  {formValue.items.map((item, index) => (
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <i className="fa fa-check-circle-o"></i>
                        <span className="ml-2">{item.nombre}</span>
                      </div>
                      <span className="font-weight-bold">{item.qty}</span>
                      <span className="font-weight-bold">{item.precio}</span>
                    </div>
                  ))}*/}
                  {/* Poner aqui tados totales de factura*/}
                  <div className="row">
                    <div className="col-2">
                      <div className="d-flex flex-column text-end">
                        <small>Total en letras: </small>
                        <small>Rango Autorizado:</small>
                        <small>Fecha Limite de Emision:</small>
                        <small>Mensage</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex flex-column">
                        <small>Total en letras: </small>
                        <small>{invoice.doc_autorizacion.rango_inicial +' al '+ invoice.doc_autorizacion.rango_final}</small>
                        <small>{invoice.doc_autorizacion.fecha_limite}</small>
                        <small>Mensage</small>
                      </div>
                    </div>
                    <div className="col-3">
                      <div className="d-flex flex-column text-end">
                        <span>SubTotal:</span>
                        <span>Importe Exonerado:</span>
                        <span>Import Excento:</span>
                        <span>Importe Gravado 15%:</span>
                        <span>Importe Gravado 18%:</span>
                        <span style={{ fontWeight: 600}}>Total:</span>
                      </div>
                    </div>
                    <div className="col-1">
                      <div className="d-flex flex-column text-end">
                        <span>{invoice.sub_total}</span>
                        <span>{'0.00'}</span>
                        <span>{'0.00'}</span>
                        <span>{invoice.impuesto}</span>
                        <span>{'0.00'}</span>
                        <span style={{ fontWeight: 600}}>{invoice.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Poner Aqui datos de facturacion */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Invoice;