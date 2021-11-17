import React from 'react';

import { Panel, Grid } from 'rsuite';

import Profile from '../components/Profile'

const Show = (props) => {

  return (
    <>
    <Grid fluid>
      <Panel bordered>
        <Profile/>
      </Panel>
    </Grid>
    </>
  );
};

export default Show;