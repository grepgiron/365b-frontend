import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import Profile from '../components/Profile'

const Show = (props) => {
  let { id } = useParams();
  console.log(id)
  return (
    <>
    <div>
        <h5>Mostrar Productos</h5>
        <h5>View: sar/establishments/components/Profile</h5>
        <Divider />
    </div>
    <Profile/>
    </>
  );
};

export default Show;