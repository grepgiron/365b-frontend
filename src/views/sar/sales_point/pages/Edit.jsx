import React from 'react';
import { useParams } from "react-router-dom";

import {
  Col,
  FlexboxGrid
} from 'rsuite';

import Form from '../components/FormEdit';

const Edit = () => {

  let { id } = useParams();
 
  return (
    <>
      <h5>Editar punto de venta</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={18} lg={12}>
          <Form id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default Edit;