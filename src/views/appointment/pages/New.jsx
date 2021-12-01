import React from 'react';

import {
  FlexboxGrid
} from 'rsuite';

import New from '../components/Form';

const NewAppoitment = () => {
 
  return (
    <>
      <h5>Crear nueva cita</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={24}>
          <New />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default NewAppoitment;