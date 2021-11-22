import React from 'react';

import {
  Col,
  FlexboxGrid,
  Panel
} from 'rsuite';
import '../styles.css';

import FormUnd from '../components/Form';

const NewUnd = () => {
 
  return (
    <>
      <h5>Agregar nuevo tipo de unidad</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={12} className="rs-code-view">
          <FormUnd />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item as={Col} colspan={24} md={11} mdPush={1} className="markdown espacio-item">
          <h6 className="rs-form-control-label">Guía de Unidades</h6>
          <div className="rs-code-view">
            <Panel bordered bodyFill>
              <img src="https://via.placeholder.com/240x240" height="100" width="100" alt="Placeholder imagen vacía fondo gris" />
              <Panel header="Establecimiento">
                <p>
                  <small>
                    A suite of React components, sensible UI design, and a friendly development experience.
                  </small>
                </p>
              </Panel>
            </Panel>
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NewUnd;