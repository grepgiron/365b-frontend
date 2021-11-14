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
        <h5>Mostrar Documento</h5>
        <h5>View: document_authorization/components/Profile</h5>
        <Divider />
    </div>
    <Profile/>
    </>
  );
};

export default Show;