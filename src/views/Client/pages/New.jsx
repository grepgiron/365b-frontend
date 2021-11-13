import React from 'react';
import axios from 'axios';

import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  FlexboxGrid
} from 'rsuite';

import FormClient from '../components/Form';

const NewClient = () => {
 
  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <FormClient />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default NewClient;