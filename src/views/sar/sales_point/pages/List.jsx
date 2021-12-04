import { useNavigate } from "react-router-dom";
import {
  IconButton,
  ButtonToolbar,
  Row,
  Col,
  Divider
} from 'rsuite';

import TituloView from '../../../../components/titulo-views/tvs';

import ListNew from '../components/List'

import PlusIcon from '@rsuite/icons/Plus';

function List() {

  let match = useNavigate();
  function handleClick(event) {
      match(event);
  }
  return (
    <>
      <Row>
        <TituloView colmd={11} collg={9} nombre="Puntos de venta" />
        <Col xs={24} md={4} lg={3} mdPush={9} lgPush={12}>
          <ButtonToolbar className="inner-left">
            <IconButton 
              onClick={() => handleClick('nuevo')} 
              icon={<PlusIcon />} 
              appearance="primary">
              Nuevo
            </IconButton>
          </ButtonToolbar>
        </Col>
      </Row>

      <Divider />
      <ListNew />
    </>
  );
}

export default List;