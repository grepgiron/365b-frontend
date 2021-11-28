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

function List() {
  const [payments, setPayments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const [error, setError] = useState(null);
  
  // Celda para los botones de accion
  let match = useNavigate();
  const ActionCell = ({ rowData, dataKey, ...props }) => {
    function editPayments() {
      match(`/admin/metodo_pago/editar/${rowData[dataKey]}`);
    }
    function showPayments() {
      match(`/admin/metodo_pago/${rowData[dataKey]}`);
    }
    return (
      <Cell {...props} className="link-group">
        <IconButton appearance="subtle" onClick={editPayments} icon={<Edit2 />} />
        <Divider vertical />
        <IconButton appearance="subtle" onClick={showPayments} icon={<VisibleIcon />} />
      </Cell>
    );
  };

  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/metodos_pago', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      if (response!==error) {
        setPayments(response.data);
        setLoading(true);
      } else {
        console.log(response);
        setError(response);
        setLoading(true);
      }
    })
  }, [error]);

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = payments.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
    
  if (error) {
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    return (
      <>
      <Table bordered striped={1} height={420} data={data} loading={!loading}>
        <Column width={190}>
          <HeaderCell>Codigo</HeaderCell>
          <Cell dataKey="code" />
        </Column>

        <Column width={240}>
          <HeaderCell>Nombre</HeaderCell>
          <Cell dataKey="nombre" />
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
          total={payments.length}
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