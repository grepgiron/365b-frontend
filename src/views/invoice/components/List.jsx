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
      match(`show/editar/${rowData[dataKey]}`);
    }
    function showClient() {
      match(`show/${rowData[dataKey]}`);
    }
    return (
      <Cell {...props} className="link-group">
        <IconButton appearance="subtle" onClick={editClient} icon={<Edit2 />} />
        <IconButton appearance="subtle" onClick={showClient} icon={<VisibleIcon />} />
      </Cell>
    );
  };

  useEffect(() => {
    // GET request using axios
    axios.get('https://beauty365api.herokuapp.com/api/v1/facturas', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((response) => {
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
    return <Message showIcon type="error">Error. {error.message}</Message>;
  } else if (!loading) {
    return <Loader content="loading..." />;
  } else {
    return (
      <>
      <Table bordered striped height={420} data={data} loading={!loading}>
        {/* <Column flexGrow={1}> */}
        <Column width={50} fixed>
          <HeaderCell>#</HeaderCell>
          <Cell>
            {(rowData, rowIndex) => (rowIndex+1)}
          </Cell>
        </Column>
        
        <Column>
          <HeaderCell className="text-center">Fecha</HeaderCell>
          <Cell>
            {(rowData) => (rowData.fecha)}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell >Cliente</HeaderCell>
          <Cell dataKey="cliente" />
        </Column>

        {/* <Column flexGrow={1}> */}
        <Column>
          <HeaderCell className="text-center">Sub Total</HeaderCell>
          <Cell dataKey="sub_total" />
        </Column>
        
        {/* <Column flexGrow={1}> */}
        <Column>
          <HeaderCell className="text-center">ISV</HeaderCell>
          <Cell dataKey="impuesto" />
        </Column>

        {/* <Column flexGrow={1}> */}
        <Column >
          <HeaderCell className="text-center">Total</HeaderCell>
          <Cell dataKey="total" />
        </Column>

        {/* <Column flexGrow={1}> */}
        <Column>
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