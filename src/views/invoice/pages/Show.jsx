import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import Profile from '../components/Profile';

const Show = (props) => {
  let { id } = useParams();
  console.log(id)
  return (
    <>
      <Profile />  
    </>
  );
};

export default Show;