import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  ButtonToolbar,
  Row,
  Col,
  Divider,
  Panel
} from 'rsuite';

import ListNew from '../components/List'

import PlusIcon from '@rsuite/icons/Plus';


function List() {
  let match = useNavigate();
  function handleClick(event) {
      match(event);
  }
  return (
    <>
      <Panel bordered>
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
                Nuevo
              </IconButton>
            </ButtonToolbar>
          </Col>
        </Row>
        <Divider />
        <div>
          <ListNew />
        </div>
      </Panel>
    </>
  );
}

export default List;