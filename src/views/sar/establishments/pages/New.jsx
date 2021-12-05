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
      <h5>Agregar nuevo establecimiento</h5>
      <br />
      <Message showIcon type="info" header="Atencion">
        <span>La idea de establecimiento comercial se vincula 
        al local donde se desarrolla una actividad de comercio. 
        Se trata de un espacio físico que reúne a quien ofrece un 
        producto o servicio y al consumidor o cliente.
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