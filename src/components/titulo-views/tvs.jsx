import { Col } from 'rsuite';
  
import './styles.css';

function tvs(props) {
    return (
        <Col xs={24} md={9} lg={4} className="tvs-hd">
          <img src="/images/logo3.jpg" className="tvs-hd-logo" alt="Logo contorno silueta mujer de perfil" />
          <h3>{props.nombre}</h3>
        </Col>
    );
};

export default tvs;