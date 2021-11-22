import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  ButtonToolbar,
  Row,
  Col,
  Divider
} from 'rsuite';

import ListNew from '../components/List'

import PlusIcon from '@rsuite/icons/Plus';
//

function List() {
  let match = useNavigate();
  function handleClick(event) {
      match(event);
  }
  return (
    <>
      <Row>
        <Col xs={9} >
          <h3>Editar esta View</h3>
        </Col>
        <Col xs={3} xsPush={12}>
          <ButtonToolbar className="inner-left">
            <IconButton 
              onClick={() => handleClick('nuevo')} 
              icon={<PlusIcon />} 
              appearance="primary">
              Nuevo Empleado 
            </IconButton>
          </ButtonToolbar>
        </Col>
      </Row>
      <Divider />
      <div>
        <h5>Poner Lista aqui</h5>
        <h5>View: clients/components/List</h5>
        <Divider />
        <ListNew />
      </div>
    </>
  );
}

export default List;