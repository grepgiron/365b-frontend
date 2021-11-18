import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import List from '../components/List'

const Show = (props) => {
  let { id } = useParams();
  console.log(id)
  return (
    <>
      <List /> 
    </>
  );
};

export default Show;