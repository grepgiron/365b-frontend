import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import FormNew from '../components/Form'

const Show = (props) => {
  let { id } = useParams();
  console.log(id)
  return (
    <>
      <FormNew />
    </>
  );
};

export default Show;