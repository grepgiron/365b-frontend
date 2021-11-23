import { Row, Col } from 'rsuite'

import Profile from '../components/Profile'

function Show(props) {
  const { invoice } = props
  return (
    <>
      <Row>
        <Col xs={24}>
          <Profile />
        </Col>
      </Row>
    </>
  );
}

export default Show;