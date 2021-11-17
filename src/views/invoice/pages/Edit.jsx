import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import Edit from '../components/FormEdit'

const EditInvoice = (props) => {
  let { id } = useParams();
  console.log(id)
  return (
    <>
      <Edit />
    </>
  );
};

export default EditInvoice;