import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import {
  FlexboxGrid
} from 'rsuite';

import Profile from '../components/Profile'

const Show = () => {

  let { id } = useParams();
 
  return (
    <>
      <h5>Clientes</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <Profile id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default Show;