import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {
  Table,
  IconButton,
  Pagination,
  Divider,
  Message,
  Loader,
  Tag
} from 'rsuite';

// Iconos
import Edit2 from '@rsuite/icons/legacy/Edit2';
import VisibleIcon from '@rsuite/icons/Visible';

const { HeaderCell, Cell, Column } = Table;

function List() {
  const [clientsArray, setClientsArray] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const [error, setError] = useState(null);
  
  // Celda para los botones de accion
  let match = useNavigate();
  const ActionCell = ({ rowData, dataKey, ...props }) => {
    function editClient() {
      match(`/admin/inventario/productos/editar/${rowData[dataKey]}`);
    }
    function showClient() {
      match(`/admin/inventario/productos/${rowData[dataKey]}`);
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
    axios.get('https://beauty365api.herokuapp.com/api/v1/productos', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
      if (response!==error) {
        console.log(response.data)
        setClientsArray(response.data);
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

  const data = clientsArray.filter((v, i) => {
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
          <HeaderCell>code</HeaderCell>
          <Cell dataKey="code" />
        </Column>

        <Column width={240}>
          <HeaderCell>Nombre</HeaderCell>
          <Cell dataKey="nombre" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Descripcion</HeaderCell>
          <Cell dataKey="descripcion" />
        </Column>

        <Column width={200}>
          <HeaderCell>Categoria</HeaderCell>
          <Cell>{(rowData) => (rowData.categoria != null ? rowData.categoria.nombre : <Tag color="violet">Sin Categoria</Tag>)}</Cell>
        </Column>

        <Column width={200}>
          <HeaderCell>Unidad</HeaderCell>
          <Cell>{(rowData) => (rowData.unidad.nombre ? rowData.unidad.nombre : <Tag color="violet">Sin Und</Tag>)}</Cell>
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