import React from 'react';
import { useParams } from "react-router-dom";

import {
  Col,
  FlexboxGrid
} from 'rsuite';

import FormCatetory from '../components/FormEdit';

const EditCategory = () => {

  let { id } = useParams();
 
  return (
    <>
      <h5>Editar categoria</h5>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={18} lg={12}>
          <FormCatetory id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default EditCategory;