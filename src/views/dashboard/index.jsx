import React, { useState, useEffect } from 'react';
import { Route , Routes} from "react-router-dom";

import { 
    Panel,
    Row,
    Col,
    Message,
    Loader
} from 'rsuite';

import TrendIcon from '@rsuite/icons/Trend';
import BarLineChartIcon from '@rsuite/icons/BarLineChart';
import EventDetailIcon from '@rsuite/icons/EventDetail';
import Invoice from './components/Invoices';
import Appointments from './components/Appointments';

const style1 = {
    fontFamily: 'Microsoft YaHei',
    fontSize: '14px',
    textAlign: 'right',
    padding: '10px',
    color: '#fff',
    backgroundColor: '#D9C8A9',
}

const style2 = {
  fontFamily: 'Microsoft YaHei',
  fontSize: '14px',
  textAlign: 'right',
  padding: '10px',
  color: '#fff',
  backgroundColor: '#BF6E50',
}

const style3 = {
  fontFamily: 'Microsoft YaHei',
  fontSize: '14px',
  textAlign: 'right',
  padding: '10px',
  color: '#fff',
  backgroundColor: '#59382C',
}

const cart = {
    width: '100px',
    position: 'absolute',
    left: '2px',
    top: '34px',
}

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const [ citas, setCitas] = useState([]);
  const [ ventasHoy, setVentasHoy] = useState([]);
  const [ ventasMes, setVentasMes] = useState([]);

  useEffect(() => {
    fetch('https://beauty365api.herokuapp.com/api/v1/citas_hoy')
      .then(res => res.json())
      .then(
        (result) => {
          setCitas(result);
          console.log(result);
          fetch('https://beauty365api.herokuapp.com/api/v1/ventas_hoy')
            .then(res => res.json())
            .then(
              (result) => {
                setVentasHoy(result);
                console.log(result);
                fetch('https://beauty365api.herokuapp.com/api/v1/ventas_mes')
                  .then(res => res.json())
                  .then(
                    (result) => {
                      setVentasMes(result);
                      console.log(result);
                      setLoading(true);
                    },
                    (error) => {
                      setError(error);
                      setLoading(true);
                    }
                  )
              },
              (error) => {
                setError(error);
                setLoading(true);
              }
            )
        },
        (error) => {
          setError(error);
          setLoading(true);
        }
      )
  }, [error]);

  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    return (
      <>
      <h3>Dashboard</h3>
      <br/>
      <Row>
        <Col xs={8}>
          <Panel bordered shaded style={style1}>
            <div style={cart}><TrendIcon style={{ fontSize: '3em', marginRight: 10 }} /></div>
            <div>Ventas Hoy</div>
            <div style={{ fontSize: '24px' }}>Lps. {ventasHoy.total}</div>
          </Panel>
          <Panel shaded>
            <Invoice invoices={ventasHoy.facturas}/>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel bordered shaded style={style2}>
            <div style={cart}><BarLineChartIcon style={{ fontSize: '3em', marginRight: 10 }} /></div>
            <div>Ventas Mes</div>
            <div style={{ fontSize: '24px' }}>Lps. {ventasMes.total}</div>
          </Panel>
          <Panel shaded>
            <Invoice invoices={ventasMes.facturas}/>
          </Panel>
        </Col>
        <Col xs={8}>
          <Panel bordered shaded style={style3}>
            <div style={cart}><EventDetailIcon style={{ fontSize: '3em', marginRight: 10 }} /></div>
            <div>Citas Hoy</div>
            <div style={{ fontSize: '24px' }}>{citas.citas_hoy > 0 ? citas.citas_hoy : 'No hay Citas'}</div>
          </Panel>
          <Panel shaded>
            <Appointments appointments={citas.citas}/>
          </Panel>
        </Col>
      </Row>
      </>
    );
  }
};

export default Dashboard;