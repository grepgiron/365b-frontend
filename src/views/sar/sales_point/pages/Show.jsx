import React from 'react';
import axios from 'axios';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import Profile from '../components/Profile'

const Show = () => {
 
  return (
    <>
    <div>
        <h5>Mostrar Punto de Venta</h5>
        <h5>View: sar/sales_point/components/Profile</h5>
        <Divider />
    </div>
    <Profile/>
    </>
  );
};

export default Show;