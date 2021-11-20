import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import {
  FlexboxGrid
} from 'rsuite';

import FormClient from '../components/FormEdit';

const EditClient = () => {

  let { id } = useParams();
 
  return (
    <>
      <h5>Editar cliente</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <FormClient id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default EditClient;