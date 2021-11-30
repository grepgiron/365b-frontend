import React from 'react';

import {
  Col,
  FlexboxGrid,
  Panel
} from 'rsuite';
import '../styles.css';

import FormPayment from '../components/Form';

const NewPayment = () => {
 
  return (
    <>
      <h5>Agregar nuevo metodo de Pago</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={12} className="rs-code-view">
          <FormPayment />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NewPayment;