import React from 'react';
import { useParams } from "react-router-dom";

import {
  Col,
  FlexboxGrid,
  Message,
  Tag
} from 'rsuite';

import Profile from '../components/Profile'

const Show = () => {

  let { id } = useParams();
 
  return (
    <>
      <h5>Rango de Facturas</h5>
      <Message showIcon type="warning" header="Warning">
        <span>Manipular los rangos, ya que este afecta la secuencia 
          de las facturas por lo que se recomienda solamente manipular en caso necesario. Los rangos se
          determinan de acuerdo al documento autorizado del Sar generado por el admin.
        </span>

      </Message>
      <p></p>
      <br />
      <FlexboxGrid>
        <FlexboxGrid.Item as={Col} colspan={24} md={19} lg={15}>
          <Profile id={id} />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

export default Show;