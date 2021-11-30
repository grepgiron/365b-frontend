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
      </FlexboxGrid>
    </>
  );
};

export default NewUnd;