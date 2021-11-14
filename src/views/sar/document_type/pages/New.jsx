import React from 'react';
import axios from 'axios';

import {
  FlexboxGrid
} from 'rsuite';

import FormDocument from '../components/Form';

const NewDocument = () => {
 
  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <FormDocument />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default NewDocument;