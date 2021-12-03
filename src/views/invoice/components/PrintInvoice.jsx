import React, { useRef, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import axios from 'axios';

import './print.css'

const App = () => {  
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [cliente, setCliente] = React.useState([]);
  const [invoice, setInvoice] = React.useState([]);
  const [doc_autorizado, setDocAutorizado] = React.useState([]);
  const [document, setDocument] = React.useState([]);


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const format = () =>{
    let x = invoice.num_factura;
    console.log(x);
    const mascara = '00000000';
    var mask = mascara.substring(0,8-(x));
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
          axios.get('https://beauty365api.herokuapp.com/api/v1/documentos_autorizados/'+response.data.doc_autorizacion)
          .then((response) => {
            if (response!==error) {
              console.log(response.data);
              setDocument(response.data);
              setDocAutorizado({'format': 
                response.data.establecimiento.prefijo + '-' + response.data.pos.prefijo + '-' + response.data.documento_fiscal.prefijo + '-'});
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
      <button onClick={handlePrint} className="print__button">  Print </button> 
      
      <div ref={componentRef}>
                                
          <div class="receipt-content">
              <div class="container bootstrap snippets bootdey">
              <div class="row">
                <div class="col-md-12">
                  <div class="invoice-wrapper">
                    <div class="intro">
                      Hi <strong>John McClane</strong>, 
                      <br/>
                      This is the receipt for a payment of <strong>$312.00</strong> (USD) for your works
                    </div>

                    <div class="payment-info">
                      <div class="row">
                        <div class="col-sm-6">
                          <span>Payment No.</span>
                          <strong>434334343</strong>
                        </div>
                        <div class="col-sm-6 text-right">
                          <span>Payment Date</span>
                          <strong>Jul 09, 2014 - 12:20 pm</strong>
                        </div>
                      </div>
                    </div>

                    <div class="payment-details">
                      <div class="row">
                        <div class="col-sm-6">
                          <span>Client</span>
                          <strong>
                            Andres felipe posada
                          </strong>
                          <p>
                            989 5th Avenue <br/>
                            City of monterrey <br/>
                            55839 <br/>
                            USA <br/>
                            <a href="#">
                              jonnydeff@gmail.com
                            </a>
                          </p>
                        </div>
                        <div class="col-sm-6 text-right">
                          <span>Payment To</span>
                          <strong>
                            Juan fernando arias
                          </strong>
                          <p>
                            344 9th Avenue <br/>
                            San Francisco <br/>
                            99383 <br/>
                            USA <br/>
                            <a href="#">
                              juanfer@gmail.com
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="line-items">
                      <div class="headers clearfix">
                        <div class="row">
                          <div class="col-xs-4">Description</div>
                          <div class="col-xs-3">Quantity</div>
                          <div class="col-xs-5 text-right">Amount</div>
                        </div>
                      </div>
                      
                      <div class="total text-right">
                        <p class="extra-notes">
                          <strong>Extra Notes</strong>
                          Please send all items at the same time to shipping address by next week.
                          Thanks a lot.
                        </p>
                        <div class="field">
                          Subtotal <span>$379.00</span>
                        </div>
                        <div class="field">
                          Shipping <span>$0.00</span>
                        </div>
                        <div class="field">
                          Discount <span>4.5%</span>
                        </div>
                        <div class="field grand-total">
                          Total <span>$312.00</span>
                        </div>
                      </div>

                      <div class="print">
                        <a href="#">
                          <i class="fa fa-print"></i>
                          Print this receipt
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class="footer">
                    Copyright © 2014. company name
                  </div>
                </div>
              </div>
            </div>
          </div>                      
      </div>
    </>     
  )
}
export default App