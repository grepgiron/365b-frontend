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
      <h5>Agregar nuevo documento de autorización</h5>
      <br />
      <Message showIcon type="info" header="Atencion">
        <span>Es el componente del Sistema DET Live que 
        permite la activación de los documentos fiscales solicitados mediante el formulario SAR-924, 
        al momento que la Imprenta entrega los talonarios impresos al Cliente
        </span>

      </Message>
      <br/>
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={12} className="rs-code-view">
          <Form />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default New;