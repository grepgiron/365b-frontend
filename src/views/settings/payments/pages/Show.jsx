import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlexboxGrid,
  Divider,
  Col
} from 'rsuite';

import Profile from '../components/Profile'

const Show = (props) => {

  let { id } = useParams();

  return (
    <>
      <h5>Metodo de Pago</h5>
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