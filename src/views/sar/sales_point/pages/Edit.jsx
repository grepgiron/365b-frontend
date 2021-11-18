import React from 'react';
import axios from 'axios';

import {
  Panel,
  Divider
} from 'rsuite';

import FormEdit from '../components/FormEdit'

const Edit = () => {
 
  return (
    <>
    <Panel bordered>
      <FormEdit/>
    </Panel>
    </>
  );
};

export default Edit;