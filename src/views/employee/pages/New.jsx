import React from 'react';
import axios from 'axios';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import FormEmployee from '../components/Form';

const NewEmployee = () => {
 
  return (
    <>
    <div>
        <h5>Editar Formulario</h5>
        <h5>View: employee/components/Form</h5>
        <Divider />
    </div>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <FormEmployee />
      </FlexboxGrid.Item>
    </FlexboxGrid>
    </>
  );
};

export default NewEmployee;