import React from 'react';
import axios from 'axios';

import {
  FlexboxGrid
} from 'rsuite';

import FormEmployee from '../components/Form';

const NewEmployee = () => {
 
  return (
    <FlexboxGrid>
      <a>Nuevo Empleado</a>
      <FlexboxGrid.Item colspan={12}>
        <FormEmployee />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default NewEmployee;