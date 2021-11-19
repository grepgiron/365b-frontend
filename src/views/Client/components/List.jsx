import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  IconButton,
  Pagination,
  Divider
} from 'rsuite';

// Iconos
import Edit2 from '@rsuite/icons/legacy/Edit2';
import VisibleIcon from '@rsuite/icons/Visible';

const { HeaderCell, Cell, Column, ColumnGroup } = Table;

function List() {
  const [clientsArray, setClientsArray] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const [error, setError] = useState(null);

  // let match = useNavigate();
  // function handleClick(event) {
  //   console.log(event);
  //     match(`/admin/clientes/editar/${event}`, { state: response.data._id });
  // }
  // Celda para los botones de accion
  let match = useNavigate();
  const ActionCell = ({ rowData, dataKey, ...props }) => {
    function editClient() {
      // match(`/admin/clientes/editar/${rowData[dataKey]}`, { state: response.data._id });
      match(`/admin/clientes/editar/${rowData[dataKey]}`);
    }
    function showClient() {
      // match(`/admin/clientes/mostrar/${rowData[dataKey]}`, { state: response.data._id });
      match(`/admin/clientes/${rowData[dataKey]}`);
    }
    return (
      <Cell {...props} className="link-group">
        <IconButton appearance="subtle" onClick={editClient} icon={<Edit2 />} />
        <Divider vertical />
        <IconButton appearance="subtle" onClick={showClient} icon={<VisibleIcon />} />
      </Cell>
    );
  };

  useEffect(() => {
      // GET request using axios
      axios.get('https://beauty365api.herokuapp.com/api/v1/clientes')
        .then((response) => {
          if (response!==error) {
            setClientsArray(response.data);
            setLoading(true);
            // Imprimir estado clientsArray despues de asignar valores
            console.log(clientsArray);
          } else {
            setError(response);
            setLoading(true);
          }
        })
  }, []);
    

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = clientsArray.filter((v, i) => {
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
        <Column flexGrow={1}>
          <HeaderCell>DNI</HeaderCell>
          <Cell dataKey="dni" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Nombres</HeaderCell>
          <Cell dataKey="nombres" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Teléfono</HeaderCell>
          <Cell dataKey="telefono" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Action</HeaderCell>
          <ActionCell dataKey="_id" />
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
      </>
    );
  }
}

export default List;