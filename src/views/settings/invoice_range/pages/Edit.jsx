import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import FormEdit from '../components/FormEdit'

const Show = (props) => {

  return (
    <>
    <FormEdit />
    </>
  );
};

export default Show;