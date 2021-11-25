import React from 'react';
import { useParams } from "react-router-dom";

import {
  Col,
  FlexboxGrid
} from 'rsuite';

import FormService from '../components/FormEdit';

const EditService = () => {

  let { id } = useParams();
 
  return (
    <>
      <h5>Editar servicio</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={18} lg={12}>
          <FormService id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default EditService;