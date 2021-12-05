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
    const { invoices } = props;
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

    function showClient() {
      match(`/pos/ventas/show/${rowData[dataKey]}`);
    }
    return (
      <Cell {...props} className="link-group">
        <IconButton appearance="subtle" onClick={showClient} icon={<VisibleIcon />} />
      </Cell>
    );
  };

  useEffect(() => {
    // GET request using axios
    /* axios.get('https://beauty365api.herokuapp.com/api/v1/facturas', {
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
    }) */
  }, []);
    

  const handleChangeLimit = dataKey => {
    setPage(1);
    setLimit(dataKey);
  };

  const data = invoices.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
    
    return (
      <>
      <Table bordered striped height={420} data={data}>
        {/* <Column flexGrow={1}> */}
        <Column width={50} fixed>
          <HeaderCell>#</HeaderCell>
          <Cell>
            {(rowData, rowIndex) => (rowIndex+1)}
          </Cell>
        </Column>
        
        <Column width={180}>
          <HeaderCell >Cliente</HeaderCell>
          <Cell>{(rowData) => (rowData.cliente.nombres)}</Cell>
        </Column>

        <Column >
          <HeaderCell className="text-end">Total</HeaderCell>
          <Cell className="text-end" dataKey="total" />
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
          total={invoices.length}
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