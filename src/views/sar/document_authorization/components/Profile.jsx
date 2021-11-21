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

import Edit2 from '@rsuite/icons/legacy/Edit2';



function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  /*const [sales_point, setSales_point] = useState({
    _id: '',
    establecimiento: '',
    documento_fiscal: '',
    pos: '',
    fecha_limite: '',
    cai: '',
    rango_inicial: '',
    rango_final: '',
  });*/
   const [sales_point, setSales_point] = useState({
    _id: '',
    establecimiento: {
      _id: '',
      nombre: '',
      prefijo: ''
    },
    documento_fiscal: {
      _id: '',
      nombre: '',
      prefijo: ''
    },
    pos: {
      _id: '',
      nombre: '',
      prefijo: ''
    },
    fecha_limite: '',
    cai: '',
    rango_inicial: '',
    rango_final: '',
  }); 

  useEffect(() => {
    fetch(`https://beauty365api.herokuapp.com/api/v1/documentos_autorizados/${id}`)
      .then(response => response.json())
      .then(data => {
        setSales_point(data);
        console.log(data);
      });
  }, []);

  function handleClick(event) {
    navigate(`/admin/sar/documentos_autorizacion/editar/${id}`);
  }

  return (
    <>
      <Grid fluid>
        <Panel bordered>
          <h3 class="page-heading">
            <span class="page-heading-text">Detalles</span>
            {console.log(sales_point)}
          </h3>
          <Row>
            <Col>
              <span>
                <IconButton appearance="subtle" onClick={() => handleClick(sales_point._id)} icon={<Edit2 />}>Editar</IconButton>
              </span>
              <div class="markdown"> 
                <h4 class="page-heading">
                  <span class="page-heading-text">Establecimiento</span>
                </h4>
                <p>{sales_point.establecimiento.nombre}</p>
                <h4 class="page-heading">
                  <span class="page-heading-text">Punto de Venta</span>
                </h4>
                <p>{sales_point.pos.nombre}</p>  
                <h4 class="page-heading">
                  <span class="page-heading-text">Documento Fiscal</span>
                </h4>
                <p>{sales_point.documento_fiscal.nombre}</p>  
                <h4 class="page-heading">
                  <span class="page-heading-text">CAI</span>
                </h4>
                <p>{sales_point.cai}</p>
                <h4 class="page-heading">
                  <span class="page-heading-text">Fecha Limite</span>
                </h4>
                <p>{sales_point.fecha_limite}</p>
                <h4 class="page-heading">
                  <span class="page-heading-text">Rango Inicial</span>
                </h4>
                <p>{sales_point.rango_inicial}</p>  
                <h4 class="page-heading">
                  <span class="page-heading-text">Rango Final</span>
                </h4>
                <p>{sales_point.rango_final}</p> 
                <h4 class="page-heading">
                  <span class="page-heading-text">Formato de Factura</span>
                </h4>
                <p>{
                sales_point.establecimiento.prefijo+'-'+
                sales_point.pos.prefijo+'-'+
                sales_point.documento_fiscal.prefijo+'-'}</p> 
                <Tag color="green">ACTIVO</Tag>
              </div>    
            </Col>
          </Row>
        </Panel>
      </Grid>
    </>
  );
}

export default Profile;