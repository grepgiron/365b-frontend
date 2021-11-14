import React from 'react';
import axios from 'axios';

import {
  FlexboxGrid
} from 'rsuite';

import FormSalePoint from '../components/Form';

const New = () => {
 
  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <FormSalePoint />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default New;