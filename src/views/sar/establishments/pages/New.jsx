import React from 'react';
import axios from 'axios';

import {
  FlexboxGrid
} from 'rsuite';

import FormEstablishment from '../components/Form';

const New = () => {
 
  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <FormEstablishment />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default New;