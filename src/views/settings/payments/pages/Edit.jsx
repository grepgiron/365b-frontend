import React from 'react';
import { useParams } from "react-router-dom";

import {
  Col,
  FlexboxGrid
} from 'rsuite';

import FormUnd from '../components/FormEdit';

const EditUnd = () => {

  let { id } = useParams();
 
  return (
    <>
      <h5>Editar metodo de pago</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={18} lg={12}>
          <FormUnd id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default EditUnd;