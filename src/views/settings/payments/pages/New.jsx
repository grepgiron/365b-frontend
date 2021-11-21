import React from 'react';
import axios from 'axios';

import {
  FlexboxGrid,
  Row,
  Col,
  Panel,
  Divider,
  Grid
} from 'rsuite';

import FormEstablishment from '../components/Form';

const New = () => {
 
  return (
    <Grid fluid>
      <Row>
        <Col xs={12} className="markdown">
          <h3 className="page-heading">Detalles de Nuevo</h3>
          <div className="rs-code-view">
            <FormEstablishment />
          </div>       
        </Col>
        <Col xs={12} className="markdown">
          <h2 className="page-heading">Guia de Metodo de Pago</h2>
          <div className="rs-code-view">
            <Panel bordered bodyFill style={{ display: 'inline-block' }}>
              <img src="https://via.placeholder.com/240x240" height="100" width="100" />
              <Panel header="Establecimiento">
                <p>
                  <small>
                    A suite of React components, sensible UI design, and a friendly development experience.
                  </small>
                </p>
              </Panel>
            </Panel>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default New;