import React from 'react';

import {
  Col,
  FlexboxGrid,
  Message,
  Tag
} from 'rsuite';

import Form from '../components/Form';

const New = () => {
 
  return (
    <>
      <h5>Agregar nuevo punto de venta</h5>
      <br />
      <Message>
        <span><Tag color='yellow'>Atencion</Tag> Punto de venta físico: 
        Aquel punto de venta físico, que se encuentra disponible para la atención al público.
        </span>

      </Message>
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={12} className="rs-code-view">
          <Form />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default New;