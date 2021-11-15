import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  IconButton
} from 'rsuite';

import Edit2 from '@rsuite/icons/legacy/Edit2';

const { HeaderCell, Cell, Column } = Table;

const ActionCell = ({ rowData, dataKey, ...props }) => {
  function handleAction() {
    alert(`id:${rowData[dataKey]}`);
  }
};

function List() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://beauty365api.herokuapp.com/api/v1/puntos_de_venta")
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
                alert(`id:${rowData._id}`);
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