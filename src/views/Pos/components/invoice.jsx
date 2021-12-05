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
      <div className="mb-12">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="upper p-4">
                <div className="d-flex justify-content-between">
                  {/* Poner Aqui dato de la empresa */}
                  {/* Poner Aqui dato de la factura */}
                </div>
                {/* Poner Aqui dato del Cliente */}
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center"> 
                      <i className="fa fa-check-circle-o"></i>
                      <span className="ml-2">Cliente: {client.nombres}</span>
                    </div> 
                  </div>
                </div>
                <hr/>
                <table className="table table-sm">
                  <thead>
                  <tr>
                    <th>Detalle</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-center">Total</th>
                  </tr>
                  </thead>
                  <tbody>
                  {formValue.productos.map((item, index) => (
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
                <div className="row">
                  <div className="col-6">
                    
                  </div>
                  <div className="col-3">
                    <div className="d-flex flex-column text-end">
                      <span>Sub Total:</span>
                      <span>Excento:</span>
                      <span>ISV 15%:</span>
                      <span>ISV 18%:</span>
                      <span style={{ fontWeight: 600}}>Total:</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="d-flex flex-column text-end">
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