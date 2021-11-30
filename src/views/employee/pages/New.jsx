import React from 'react';

import {
  FlexboxGrid
} from 'rsuite';

import FormEmployee from '../components/Form';

const NewEmployee = () => {
 
  return (
    <>
      <h5>Agregar nuevo cliente</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <FormEmployee />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NewEmployee;