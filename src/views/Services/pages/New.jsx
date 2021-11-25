import React from 'react';

import {
  FlexboxGrid
} from 'rsuite';

import FormService from '../components/Form';

const NewService = () => {
 
  return (
    <>
      <h5>Agregar nuevo servicio</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <FormService />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NewService;