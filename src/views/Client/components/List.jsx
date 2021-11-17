import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  IconButton,
  Pagination
} from 'rsuite';

import value from './sample';

import Edit2 from '@rsuite/icons/legacy/Edit2';

const { HeaderCell, Cell, Column, ColumnGroup } = Table;

function List() {
  const [clientsArray, setClientsArray] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const [error, setError] = useState(null);
  // const [isLoaded, setLoading] = useState(false);
  // const [items, setClientsArray] = useState([]);

  let match = useNavigate();
  function handleClick(event) {
    console.log(event);
      // match(`/admin/clientes/editar/${event}`, { state: response.data._id });
  }

  useEffect(() => {
      // GET request using axios with async/await
      axios.get('https://beauty365api.herokuapp.com/api/v1/clientes')
        .then((response) => {
          if (response!==error) {
            console.log(response.data);
            setClientsArray(response.data);
            console.log(clientsArray.length);
            setLoading(true);
          } else {
            setError(response);
            setLoading(true);
          }
        })
    // fetch("https://beauty365api.herokuapp.com/api/v1/establecimientos")
    // .then(res => res.json())
    // .then(
    //   (result) => {
    //     setLoading(true);
    //     setClientsArray(result);
    //   },
    //   // Nota: es importante manejar errores aquí y no en 
    //   // un bloque catch() para que no interceptemos errores
    //   // de errores reales en los componentes.
    //   (error) => {
    //     setLoading(true);
    //     setError(error);
    //   }
    // )
  }, []);
    

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = value.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
    
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
      <Table height={420} data={clientsArray} loading={!loading}>
        <Column width={50} align="center" fixed>
          <HeaderCell>DNI</HeaderCell>
          <Cell dataKey="dni" />
        </Column>

        <Column width={100} fixed>
          <HeaderCell>Nombres</HeaderCell>
          <Cell dataKey="nombres" />
        </Column>

        <Column width={100}>
          <HeaderCell>Teléfono</HeaderCell>
          <Cell dataKey="telefono" />
        </Column>

        <Column width={200}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={clientsArray.length}
          limitOptions={[10, 20]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>



{/*       
      <Table
        height={300}
        data={clientsArray}
        onRowClick={data => {
        console.log(data);
      }}
      > 
        <Column width={200}>
          <HeaderCell>DNI</HeaderCell>
          <Cell dataKey="dni" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Nombres</HeaderCell>
          <Cell dataKey="nombres" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Teléfono</HeaderCell>
          <Cell dataKey="telefono" />
        </Column>

        <Column width={200}>
          <HeaderCell>Action</HeaderCell>
          <Cell className="link-group">
            {rowData => {
              function handleAction() {
                alert(`id:${rowData._id}`);
              }
              return (
                <span>
                  <IconButton appearance="subtle" onClick={handleClick(rowData._id)} icon={<Edit2 />} />
                </span>
              );
            }}
          </Cell>
        </Column>
      </Table> */}
      </>
    );
  }
}

export default List;