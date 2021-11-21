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
  const [usuarioBorrado, setusuarioBorrado] = React.useState("");

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
  }, [usuarioBorrado]);
    
  useEffect(() => { 

    
    
    
  }, []);

    const handleChangeLimit = dataKey => {
      setPage(1);
      setLimit(dataKey);
    };

   const borrar_usuario = (_id)=>{

    var config = {
      method: 'delete',
      url: `https://beauty365api.herokuapp.com/api/v1/empleados/${_id}`,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      window.alert("Usuario Borrado");
      
      setusuarioBorrado(_id);
       
    })
    .catch(function (error) {
      console.log(error);
    });
    

   }

   /* const data = clientsArray.filter((v, i) => {
      const start = limit * (page - 1);
      const end = start + limit;
      return i >= start && i < end;
    });*/

   // no me esta funcionando Popover y whisper 
   /* const NameCell = ({ rowData, dataKey, ...props }) => {
      const speaker = (
        <Popover title="Descripcion">
          <p>
            <b>Nombre:</b> {rowData.nombres}{' '}
          </p>
          <p>
            <b>Email:</b> {rowData.email}{' '}
          </p>
          <p>
            <b>Telefono:</b> {rowData.telefono}{' '}
          </p>
          <p>
            <b>DNI:</b> {rowData.dni}{' '}
          </p>

        </Popover>
      );
    
      return (
        <Cell {...props}>
          <Whisper placement="top" speaker={speaker}>
            <a>{rowData[dataKey].toLocaleString()}</a>
          </Whisper>
        </Cell>
      );
    };*/

    return (
      <>
       
        <Table height={400} data={clientsArray} loading={loading}>
          <Column width={200} align="center" fixed>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="_id" />
          </Column>

          <Column  width={200} fixed >
            <HeaderCell>Nombre</HeaderCell>
            <Cell dataKey="nombres" />
          </Column>

          <Column width={200}>
            <HeaderCell>Telefono</HeaderCell>
            <Cell dataKey="telefono" />
          </Column>


          <Column width={400}>
            <HeaderCell>Habilidades</HeaderCell>
            <Cell dataKey="habilidades" />
          </Column >


          <Column width={120} fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Cell>
            {rowData => {
              function handleAction() {
                alert(`id: ${rowData._id}`);
                //window.location= 'http://localhost:3000/admin/empleados/nuevo';
                           }
              return (
                <span>
                  <a onClick={handleAction}> Editar </a> | <a onClick={()=>borrar_usuario(rowData._id)} > Eliminar </a>
                </span>
              );
            }}
            </Cell>
          </Column>
        </Table>
        
      </>
    );
}

export default List;