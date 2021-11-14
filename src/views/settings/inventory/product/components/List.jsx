import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  ButtonToolbar,
  Row,
  Col
} from 'rsuite';

import PlusIcon from '@rsuite/icons/Plus';

function List() {
  let match = useNavigate();
  function handleClick(event) {
      match(event);
  }
  return (
    <>
      <Row>
      <Col xs={9} >
        <h2>Editar esta View</h2>
      </Col>
      <Col xs={3} xsPush={12}>
        <ButtonToolbar className="inner-left">
          <IconButton 
            onClick={() => handleClick('nuevo')} 
            icon={<PlusIcon />} 
            appearance="primary">
            Add
          </IconButton>
        </ButtonToolbar>
      </Col>
    </Row>
    <div>
        <h5>Poner Lista aqui</h5>
        <h5>View: employee/components/List</h5>
    </div>
    </>
  );
}

export default List;