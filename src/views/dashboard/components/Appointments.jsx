import React, { useState, useEffect } from 'react';
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

function List(props) {
    const { appointments } = props;
  const [clientsArray, setClientsArray] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const [error, setError] = useState(null);
  
  // Celda para los botones de accion
  let match = useNavigate();
  const ActionCell = ({ rowData, dataKey, ...props }) => {
    function showClient() {
      match(`/admin/citas/${rowData[dataKey]}`);
    }
    return (
      <Cell {...props} className="link-group">
        <IconButton appearance="subtle" onClick={showClient} icon={<VisibleIcon />} />
      </Cell>
    );
  };

  useEffect(() => {
    // GET request using axios
    /* axios.get('https://beauty365api.herokuapp.com/api/v1/citas', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      //console.log(response);
      if (response!==error) {
        setClientsArray(response.data);
        setLoading(true);
      } else {
        console.log(response);
        setError(response);
        setLoading(true);
      }
    }) */
  }, []);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = appointments.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
    
    return (
      <>
      <Table bordered striped={1} height={420} data={data} >

        <Column width={240}>
          <HeaderCell>Nombres</HeaderCell>
          <Cell dataKey="nombre" />
        </Column>

        <Column width={120}>
          <HeaderCell>Teléfono</HeaderCell>
          <Cell dataKey="telefono" />
        </Column>

        <Column width={200}>
          <HeaderCell>Hora</HeaderCell>
          <Cell>{(rowData) => (rowData.hora)}</Cell>
        </Column>

        <Column width={107}>
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
          total={appointments.length}
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