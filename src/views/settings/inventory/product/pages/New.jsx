import React from 'react';

import {
  FlexboxGrid
} from 'rsuite';

import FormProduct from '../components/Form';

const New = () => {
 
  return (
    <>
      <h5>Agregar nuevo producto</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <FormProduct />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default New;