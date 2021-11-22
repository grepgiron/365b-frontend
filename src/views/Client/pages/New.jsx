import React from 'react';

import {
  FlexboxGrid
} from 'rsuite';

import FormClient from '../components/Form';

const NewClient = () => {
 
  return (
    <>
      <h5>Agregar nuevo cliente</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <FormClient />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NewClient;