import React from 'react';

import {
  FlexboxGrid
} from 'rsuite';

import FormCategory from '../components/Form';

const NewCategory = () => {
 
  return (
    <>
      <h5>Agregar nueva categoria</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <FormCategory />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NewCategory;