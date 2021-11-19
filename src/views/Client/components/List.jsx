import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Pagination
} from 'rsuite';

import value from './sample';

const { HeaderCell, Cell, Column, ColumnGroup } = Table;

function List() {
  const [clientsArray, setClientsArray] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
      // GET request using axios with async/await
      axios.get('https://beauty365api.herokuapp.com/api/v1/clientes')
        .then((response) => setClientsArray)
      console.log(clientsArray)
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
  
    return (
      <>
        {console.log(axios.get('https://beauty365api.herokuapp.com/api/v1/clientes'))}
        <Table height={420} data={data} loading={loading}>
          <Column width={50} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={100} fixed>
            <HeaderCell>Primer Nombre</HeaderCell>
            <Cell dataKey="firstName" />
          </Column>

          <Column width={100}>
            <HeaderCell>Segundo Nombre</HeaderCell>
            <Cell dataKey="lastName" />
          </Column>

          <Column width={200}>
            <HeaderCell>City</HeaderCell>
            <Cell dataKey="city" />
          </Column>
          <Column width={200} flexGrow={1}>
            <HeaderCell>Compa;ia</HeaderCell>
            <Cell dataKey="companyName" />
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
            total={value.length}
            limitOptions={[10, 20]}
            limit={limit}
            activePage={page}
            onChangePage={setPage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </>
    );
}

export default List;