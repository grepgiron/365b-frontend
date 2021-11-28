import { Row, Col } from 'rsuite'

import Profile from '../components/Profile'
import PreInvoice from '../components/PreInvoice'

function Show(props) {
  const { invoice } = props
  return (
    <>
      <Row>
        <Col xs={24}>
          <PreInvoice />
        </Col>
      </Row>
    </>
  );
}

export default Show;