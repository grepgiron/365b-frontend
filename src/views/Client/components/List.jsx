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
  const [clientsArray, setClientsArray] = React.useState(null);
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
  
  



    // ObtenerClientes() 
    // {axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then(res => {
    //     const persons = res.data;
    //     this.setState({ persons });








    //   })}
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
            <HeaderCell>Departamento</HeaderCell>
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

// const [error, setError] = useState(null);
// const [isLoaded, setIsLoaded] = useState(false);
// const [items, setItems] = useState([]);

// let match = useNavigate();
// function handleClick(event) {
//     match(`/admin/clientes/editar/${event}`, { state: response.data._id });
// }
// // Note: the empty deps array [] means
// // this useEffect will run once
// // similar to componentDidMount()
// useEffect(() => {
//   fetch("https://beauty365api.herokuapp.com/api/v1/clientes")
//     .then(res => res.json())
//     .then(
//       (result) => {
//         setIsLoaded(true);
//         setItems(result);
//       },
//       // Nota: es importante manejar errores aquí y no en 
//       // un bloque catch() para que no interceptemos errores
//       // de errores reales en los componentes.
//       (error) => {
//         setIsLoaded(true);
//         setError(error);
//       }
//     )
// }, [])

// if (error) {
//   return <div>Error: {error.message}</div>;
// } else if (!isLoaded) {
//   return <div>Loading...</div>;
// } else {
//   return (
//     <>
//     <Row>
//       <Col xs={9} >
//         <h3>Editar esta View</h3>
//       </Col>
//       <Col xs={3} xsPush={12}>
        
//         <ButtonToolbar className="inner-left">
//           <IconButton 
//             onClick={() => handleClick('nuevo')} 
//             icon={<PlusIcon />} 
//             appearance="primary">
//             Add
//           </IconButton>
//         </ButtonToolbar>
//       </Col>
//     </Row>
//     <Divider />
//     <Table
//       height={300}
//       data={items}
//       onRowClick={data => {
//       console.log(data);
//     }}
//     > 
//       <Column width={200}>
//         <HeaderCell>Prefijo</HeaderCell>
//         <Cell dataKey="prefijo" />
//       </Column>
//       <Column flexGrow={1}>
//         <HeaderCell>Nombre</HeaderCell>
//         <Cell dataKey="nombre" />
//       </Column>

//       <Column width={200}>
//         <HeaderCell>Action</HeaderCell>
//         <Cell className="link-group">
//           {rowData => {
//             function handleAction() {
//               alert(`id:${rowData._id}`);
//             }
//             return (
//               <span>
//                 <IconButton appearance="subtle" onClick={handleClick(rowData._id)} icon={<Edit2 />} />
//               </span>
//             );
//           }}
//         </Cell>
//       </Column>
//     </Table>
//   </>
//   );
// }
// }



export default List;