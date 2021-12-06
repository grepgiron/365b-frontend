import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NumeroALetras} from './NumeroALetras';

//importaciones de rsuitjs
import {
  Loader,
  Message
} from 'rsuite';
import axios from 'axios';


function Invoice(props) {
  const { id } = props;
  const [ invoices, setClients] = useState({});

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState(null);

  const isMounted = useRef(false);

  useEffect(() => {

    isMounted.current = true;
    
    

    return () => isMounted.current = false;
}
, [error]);

  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader center size="lg" content="Cargando..." />;
  } else {
    return (
      <>
        
      </>
    );
  }
}

export default Invoice;