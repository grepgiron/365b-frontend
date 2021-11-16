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
  Tag
} from 'rsuite';


function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sales_point, setSales_point] = useState({
    _id: '',
    nombre: '',
    prefijo: ''
  });

  useEffect(() => {
    fetch(`https://beauty365api.herokuapp.com/api/v1/establecimientos/${id}`)
      .then(response => response.json())
      .then(data => {
        setSales_point(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <Grid fluid>
        <Panel bordered>
          <h3 class="page-heading">
            <span class="page-heading-text">Detalles</span>
          </h3>
          <Row>
            <Col>
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