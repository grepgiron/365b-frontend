import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import {
  FlexboxGrid
} from 'rsuite';

import FormClient from '../components/FormEdit';

const EditClient = () => {

  let { id } = useParams();
  console.log("EDITAR CLIENTE: ", id);
 
  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={12}>
        <FormClient id={id} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default EditClient;