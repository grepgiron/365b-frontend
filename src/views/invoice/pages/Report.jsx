import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import PrintInvoice from '../components/PrintInvoice'

const Show = (props) => {
  let { id } = useParams();
  console.log(id)
  return (
    <>
      <PrintInvoice />
    </>
  );
};

export default Show;