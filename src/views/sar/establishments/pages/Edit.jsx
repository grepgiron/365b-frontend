import React from 'react';
import axios from 'axios';

import {
  Grid,
  Panel,
  Divider
} from 'rsuite';

import FormEdit from '../components/FormEdit';

const Edit = () => {
 
  return (
    <>
    <Grid fluid>
      <Panel bordered>
        <FormEdit />
      </Panel>
    </Grid>
    </>
  );
};

export default Edit;