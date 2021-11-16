import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Profile from '../components/Profile'

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

const Show = (props) => {
  return (
    <>
    <Profile />
    </>
  );
};

export default Show;