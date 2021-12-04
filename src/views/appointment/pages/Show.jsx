import React from 'react';
import { useParams } from "react-router-dom";

import {
  Col,
  FlexboxGrid
} from 'rsuite';

import Profile from '../components/Profile'
import DetailAppointment from '../components/DetailAppointment'

const Show = () => {

  let { id } = useParams();
 
  return (
    <>
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={12} lg={24}>
          <Profile id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default Show;