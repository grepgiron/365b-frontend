import React from 'react';
import axios from 'axios';

import {
  FlexboxGrid
} from 'rsuite';

import Editar from '../components/FormEdit';

const New = () => {
 
  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <Editar/>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default New;