import { useNavigate } from "react-router-dom";
import {
  IconButton,
  ButtonToolbar,
  Row,
  Col,
  Divider
} from 'rsuite';

import TituloView from '../../../components/titulo-views/tvs';

import ListInvoice from '../components/List'

import PlusIcon from '@rsuite/icons/Plus';

function List() {

  let match = useNavigate();
  function handleClick(event) {
      match(event);
  }

  return (
    <>
      <Row>
        <TituloView colmd={9} collg={6} nombre="Facturas generadas" />
        <Col xs={24} md={4} lg={3} mdPush={10} lgPush={14}>
          <ButtonToolbar className="inner-left">
            <IconButton 
              onClick={() => handleClick('/pos')} 
              icon={<PlusIcon />} 
              appearance="primary">
              Nueva
            </IconButton>
          </ButtonToolbar>
        </Col>
      </Row>

      <Divider />
      <ListInvoice />
    </>
  );
}

export default List;