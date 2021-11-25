import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import {
  Col,
  FlexboxGrid
} from 'rsuite';

import Profile from '../components/Profile'

const Show = () => {

  let { id } = useParams();
 
  return (
    <>
      <h5>Servicios</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={18} lg={14}>
          <Profile id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default Show;