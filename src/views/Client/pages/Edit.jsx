import React from 'react';
import axios from 'axios';

import {
  FlexboxGrid
} from 'rsuite';

import FormClient from '../components/FormEdit';

const EditClient = () => {
 
  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <FormClient />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default EditClient;