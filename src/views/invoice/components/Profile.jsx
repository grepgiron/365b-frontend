import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Table,
  IconButton,
  Pagination,
  Divider,
  Message,
  Loader
} from 'rsuite';

// Iconos
import Edit2 from '@rsuite/icons/legacy/Edit2';
import VisibleIcon from '@rsuite/icons/Visible';

const { HeaderCell, Cell, Column } = Table;

function Profile() {
  const { id } = useParams();
  const [invoice, setInvoice] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = useState(null);


  useEffect(() => {
    // GET request using axios
    axios.get(`https://beauty365api.herokuapp.com/api/v1/facturas/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      if (response!==error) {
        setInvoice(response.data);
        setLoading(true);
        // Imprimir estado clientsArray despues de asignar valores
        //console.log(clientsArray);
      } else {
        setError(response);
        setLoading(true);
      }
    })
  }, []);
    
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    return (
      <>
        {JSON.stringify(invoice)}
      </>
    );
  }
}

export default Profile;