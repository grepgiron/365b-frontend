import React from 'react';

import {
  Col,
  FlexboxGrid
} from 'rsuite';

import Form from '../components/Form';

const New = () => {
 
  return (
    <>
      <h5>Agregar nuevo establecimiento</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={12} className="rs-code-view">
          <Form />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default New;