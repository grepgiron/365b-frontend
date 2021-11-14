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

import FormDocumentType from '../components/Form';

const New = () => {
 
  return (
    <Grid fluid>
      <Row>
        <Col xs={12} className="markdown">
          <h2 className="page-heading">Datos de Tipo de Documento</h2>
          <div className="rs-code-view">
            <FormDocumentType />
          </div>       
        </Col>
        <Col xs={12} className="markdown">
          <h2 className="page-heading">Guia</h2>
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