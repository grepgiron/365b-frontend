import React from 'react';
import { useParams } from "react-router-dom";

import {
  Col,
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
        <FlexboxGrid.Item as={Col} colspan={24} md={18} lg={12}>
          <FormClient id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default EditClient;