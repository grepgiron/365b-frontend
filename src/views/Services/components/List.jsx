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
  const [servicesArray, setServicesArray] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const [error, setError] = useState(null);

  // Celda para los botones de accion
  let match = useNavigate();
  const ActionCell = ({ rowData, dataKey, ...props }) => {
    function editService() {
      match(`/admin/servicios/editar/${rowData[dataKey]}`);
    }
    function showService() {
      match(`/admin/servicios/${rowData[dataKey]}`);
    }
    return (
      <Cell {...props} className="link-group">
        <IconButton appearance="subtle" onClick={editService} icon={<Edit2 />} />
        <Divider vertical />
        <IconButton appearance="subtle" onClick={showService} icon={<VisibleIcon />} />
      </Cell>
    );
  };

  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/servicios', {
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/x-www-form-urlencoded" }
    }).then((response) => {
      var items;
      if (response!==error) {
        items = response.data;
        return Promise.all(items.map((item) => {
          return axios.get('https://beauty365api.herokuapp.com/api/v1/categorias/'+item.categoria, {
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/x-www-form-urlencoded" }
          }).then((res) => {
            item.categoria = res.data.nombre;
            return item;
          });
        }));
      } else {
        return response;
      }
    }).then((items) => {
      console.log(items);
      if (items!==error) {
        setServicesArray(items);
        setLoading(true);
      } else {
        setError(items);
        setLoading(true);
      }
    });
  }, [error]);
  
  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };
  
  const data = servicesArray.filter((v, i) => {
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
        <Column width={100}>
          <HeaderCell>Código</HeaderCell>
          <Cell dataKey="code" />
        </Column>

        <Column width={240}>
          <HeaderCell>Nombre</HeaderCell>
          <Cell dataKey="nombre" />
        </Column>

        <Column width={90}>
          <HeaderCell>Precio</HeaderCell>
          <Cell dataKey="precio" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Categoria</HeaderCell>
          <Cell>{(rowData) => (rowData.categoria != null ? rowData.categoria : <Tag color="violet">Sin Categoria</Tag>)}</Cell>
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
          total={servicesArray.length}
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