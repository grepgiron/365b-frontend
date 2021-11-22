import React, { useState, useEffect} from 'react'
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
  IconButton
} from 'rsuite';


function Invoice(props) {
  const { formValue } = props;
  const navigate = useNavigate();
  const [client, setClients] = useState({
    _id: '',
    nombres: '',
    dni: '',
    telefono: ''
  });

  useEffect(() => {
    fetch(`https://beauty365api.herokuapp.com/api/v1/clientes/${formValue.cliente}`)
      .then(response => response.json())
      .then(data => {
        setClients(data);
        //console.log(data);
      });
  }, []);

  return (
    <>
      <div class="mb-12">
        <div class="row d-flex justify-content-center">
          <div class="col-md-12">
            <div class="card">
              <div class="upper p-4">
                <div class="d-flex justify-content-between">
                  {/* Poner Aqui dato de la empresa */}
                  <div class="d-flex flex-row align-items-center">
                    <img src="https://i.imgur.com/HKne8Oc.jpg" width="60" class="rounded-circle"/>
                    <div class="add">
                      <span class="font-weight-bold d-block">Nombre</span>
                      <span class="font-weight-bold d-block">RTN</span>
                      <small class="font-weight-bold d-block">direccion</small>
                      <small class="font-weight-bold d-block">telefono / correo</small>
                    </div> 
                  </div>
                  {/* Poner Aqui dato de la factura */}
                  <div class="col col-lg-4 text-center"> 
                    <small class="font-weight-bold d-block"># factura</small>
                    <small class="font-weight-bold d-block">
                      {formValue.fecha !== null && new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',}).format(formValue.fecha)}</small>
                    <small class="font-weight-bold d-block">cai</small>
                    <small>123456789123456789123456789123456789</small>
                  </div>
                </div>
                <hr/>
                {/* Poner Aqui dato del Cliente */}
                <div>
                  <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center"> 
                      <i class="fa fa-check-circle-o"></i>
                      <span class="ml-2">Nombre: {client.nombres}</span>
                    </div> 
                  </div>
                </div>
                <div>
                  <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                      <i class="fa fa-check-circle-o"></i>
                      {client.dni !== '' ? <span class="ml-2">RTN: {client.dni}</span> : <span class="ml-2">RTN: {}</span>}
                    </div>
                  </div>
                </div>
                <hr/>
                <table class="table table-sm">
                  <thead>
                  <tr>
                    <th>Detalle</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-center">Total</th>
                  </tr>
                  </thead>
                  <tbody>
                  {formValue.items.map((item, index) => (
                    <tr>
                      <td>{item.nombre}</td>
                      <td class="text-center">{item.qty}</td>
                      <td class="text-end">{item.precio.toFixed(2)}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
                {/* Poner Aqui datos de items 
                {formValue.items.map((item, index) => (
                  <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                      <i class="fa fa-check-circle-o"></i>
                      <span class="ml-2">{item.nombre}</span>
                    </div>
                    <span class="font-weight-bold">{item.qty}</span>
                    <span class="font-weight-bold">{item.precio}</span>
                  </div>
                ))}*/}
                <div class="row">
                  <div class="col-6">
                    <div class="d-flex flex-column">
                      <small>Total en letras</small>
                      <small>Rangos</small>
                      <small>Limite Emision</small>
                      <small>Mensage</small>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="d-flex flex-column text-end">
                      <span>Sub Total:</span>
                      <span>Excento:</span>
                      <span>ISV 15%:</span>
                      <span>ISV 18%:</span>
                      <span style={{ fontWeight: 600}}>Total:</span>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="d-flex flex-column text-end">
                      <span>{formValue.sub_total}</span>
                      <span>{'0.00'}</span>
                      <span>{formValue.impuesto}</span>
                      <span>{'0.00'}</span>
                      <span style={{ fontWeight: 600}}>{formValue.total}</span>
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

export default Invoice;