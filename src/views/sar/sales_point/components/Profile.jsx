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
  const [sales_point, setSales_point] = useState({
    _id: '',
    nombre: '',
    prefijo: ''
  });

  useEffect(() => {
    fetch(`https://beauty365api.herokuapp.com/api/v1/puntos_de_venta/${id}`)
      .then(response => response.json())
      .then(data => {
        setSales_point(data);
        console.log(data);
      });
  }, []);

  function handleClick(event) {
    navigate(`/admin/sar/punto_venta/editar/${id}`);
  }

  return (
    <>
      <Grid fluid>
        <Panel bordered>
          <h3 class="page-heading">
            <span class="page-heading-text">Detalles</span>
          </h3>
          <Row>
            <Col>
              <span>
                <IconButton appearance="subtle" onClick={() => handleClick(sales_point._id)} icon={<Edit2 />}>Editar</IconButton>
              </span>
              <div class="markdown"> 
                <h4 class="page-heading">
                  <span class="page-heading-text">Nombre</span>
                </h4>
                <p>{sales_point.nombre}</p>
                <h4 class="page-heading">
                  <span class="page-heading-text">Prefijo</span>
                </h4>
                <p>{sales_point.prefijo}</p>  
                <h4 class="page-heading">
                  <span class="page-heading-text">Activo</span>
                </h4>
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