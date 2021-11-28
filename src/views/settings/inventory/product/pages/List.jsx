import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Pagination,
  IconButton,
  ButtonToolbar,
  Divider,
  Row,
  Col
} from 'rsuite';

import Edit2 from '@rsuite/icons/legacy/Edit2';

import PlusIcon from '@rsuite/icons/Plus';



const { HeaderCell, Cell, Column, ColumnGroup } = Table;

const ActionCell = ({ rowData, dataKey, ...props }) => {
  function handleAction() {
    alert(`id:${rowData[dataKey]}`);
  }
};

function List() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemsP, setItemsP] = useState([]);
  const [itemsC, setItemsC] = useState([]);
  const [itemsU, setItemsU] = useState([]);
  const [allDate, setAllDate] = useState([]);

  const allData = () => {
    let url1 = "https://beauty365api.herokuapp.com/api/v1/productos";
    let url2 = "https://beauty365api.herokuapp.com/api/v1/categorias";
    let url3 = "https://beauty365api.herokuapp.com/api/v1/unidades";

    const urlP = axios.get(url1);
    const urlC = axios.get(url2);
    const urlU = axios.get(url3);


    axios.all([urlP, urlC, urlU]).then(axios.spread((...allDate) => {
      const allDateUrlP = allDate[0].data;
      const allDateUrlC = allDate[1].data;
      const allDateUrlU = allDate[2].data;

      setItemsP(allDateUrlP);
      setItemsC(allDateUrlC);
      setItemsU(allDateUrlU);
      setAllDate(allDate);   
       
    }));

  }

  useEffect(() => {

    allData();

  }, [])

  return (
    <>
      <Table
        height={300}
        data={itemsP}
      >

        <Column flexGrow={1}>
          <HeaderCell>Codigo</HeaderCell>
          <Cell dataKey="code" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Nombre</HeaderCell>
          <Cell dataKey="nombre" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Descripcion</HeaderCell>
          <Cell dataKey="descripcion" />
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
                  <Link to={"/admin/inventario/productos/editar/" + rowData._id}>
                    {console.log(rowData._id)}
                    Editar
                  </Link>
                  <br/>
                  <Link to={"/admin/inventario/productos/show/" + rowData._id}>
                    {console.log(rowData._id)}
                    Ver
                  </Link>
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