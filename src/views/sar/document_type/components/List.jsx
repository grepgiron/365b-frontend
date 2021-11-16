import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Pagination,
  IconButton,
  ButtonToolbar,
  Divider,
  Row,
  Col
} from 'rsuite';

import Edit2 from '@rsuite/icons/legacy/Edit2';

import PlusIcon from '@rsuite/icons/Plus';

const { HeaderCell, Cell, Column, ColumnGroup } = Table;

const ActionCell = ({ rowData, dataKey, ...props }) => {
  function handleAction() {
    alert(`id:${rowData[dataKey]}`);
  }
};

function List() {
  /* const [clientsArray, setClientsArray] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  //Obetener data de Api
  useEffect(() => {
      // GET request using axios with async/await
      axios.get('https://beauty365api.herokuapp.com/api/v1/puntos_de_venta')
      .then(res => {
        setIsLoaded(true);
        setClientsArray(JSON.stringify(res.data));
      })
      .catch(error => {    
        setIsLoaded(true);
        setError(error);
      })

  }, []);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  if(error) {
    return <div>Error: {error.message}</div>;  
  } else if(!isLoaded) {
    return <div>Loading...</div>;  
  }else {
    return (
        <ul>
        {clientsArray.map(item => (
          <li key={item.id}>
            {item.nombres} {item.price}
          </li>
        ))}
      </ul>
    );
  } */
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  let match = useNavigate();
  function handleClick(event) {
    match(event);
}

  useEffect(() => {
    fetch("https://beauty365api.herokuapp.com/api/v1/documentos_fiscal")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <Table
        height={300}
        data={items}
        onRowClick={data => {
        console.log(data);
      }}
      > 
        <Column width={200}>
          <HeaderCell>Prefijo</HeaderCell>
          <Cell dataKey="prefijo" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Nombre</HeaderCell>
          <Cell dataKey="nombre" />
        </Column>

        <Column width={200}>
          <HeaderCell>Action</HeaderCell>
          <Cell className="link-group">
            {rowData => {
              function handleAction() {
                match(`/admin/sar/tipo_documento/show/${rowData._id}`, { state: rowData._id });
              }
              return (
                <span>
                  <IconButton appearance="subtle" onClick={handleAction} icon={<Edit2 />} />
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </>
    );
  }
}

export default List;