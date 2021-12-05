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
      <h5>Agregar nuevo tipo de documento</h5>
      <br />
      <Message showIcon type="info" header="Atencion">
        <span>Son
los Documentos que el Obligado Tributario utiliza de
manera electrónica para respaldar actividades, operaciones
o transacciones que tengan efectos fiscales(Facturas, Notas de Credito, Boletas, etc...).
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