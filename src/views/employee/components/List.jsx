import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Pagination
} from 'rsuite';


//import value from './sample';

const { HeaderCell, Cell, Column, ColumnGroup } = Table;

function List() {
  const [clientsArray, setClientsArray] = React.useState([]);
  const [error, setError] = React.useState(null); //variables con su metodo get y React.useState sirve para darle un estado a la constante creada
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  useEffect(() => { // es lo primero que carga al iniciar el componente, carga toda la informacion que ya esta cargada al momento de iniciar una pagina
      // GET request using axios with async/await
      fetch('https://beauty365api.herokuapp.com/api/v1/empleados')
        .then(response => response.json())
        .then((result ) => {
          setClientsArray(result)
          console.log(result)
        }, (error) => { setError(error)
          console.log(error)

        }
        
        )
      console.log(clientsArray)
  }, []);
    

    const handleChangeLimit = dataKey => {
      setPage(1);
      setLimit(dataKey);
    };

   /* const data = clientsArray.filter((v, i) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end;
    });*/
  
    return (
      <>
       
        <Table height={420} data={clientsArray} loading={loading}>
          <Column width={50} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="_id" />
          </Column>

          <Column  flexGrow>
            <HeaderCell>Nombre</HeaderCell>
            <Cell dataKey="nombres" />
          </Column>

          <Column width={200}>
            <HeaderCell>Telefono</HeaderCell>
            <Cell dataKey="telefono" />
          </Column>
          <Column >
            <HeaderCell>DNI</HeaderCell>
            <Cell dataKey="dni" />
          </Column>
        </Table>
        
      </>
    );
}

export default List;