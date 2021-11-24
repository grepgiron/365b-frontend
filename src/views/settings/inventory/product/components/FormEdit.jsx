import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputPicker } from 'rsuite';
import ReactDOM from 'react-dom';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router"
import qs from 'qs';
import {
  Table,
  Pagination,
  IconButton,
  ButtonToolbar,
  Divider,
  Row,
  Col
} from 'rsuite';




const Editar = () => {

  let { id } = useParams();

  const [itemsP, setItemsP] = useState([]);
  const [itemsC, setItemsC] = useState([]);
  const [itemsU, setItemsU] = useState([]);

  const [nuevo, setNuevo] = useState({

    _id: id,
    code: '',
    nombre: '',
    descripcion: '',
    unidad: '',
    costo: '',
    precio: '',
    categoria: ''

  })


  useEffect(() => {

    axios.get("https://beauty365api.herokuapp.com/api/v1/productos/" + id).then((res) => {

      setItemsP(res.data);



    });

    axios.get("https://beauty365api.herokuapp.com/api/v1/categorias").then(res => {

      setItemsC(res.data);


    });

    axios.get("https://beauty365api.herokuapp.com/api/v1/unidades").then(res => {

      setItemsU(res.data);

    });

  }, [])

  const onSubmit = (evento) => {
    evento.preventDefault();

    if (nuevo.code == "") {
      nuevo.code = itemsP.code;
    }
    if (nuevo.nombre == "") {
      nuevo.nombre = itemsP.nombre;
    }
    if (nuevo.descripcion == "") {
      nuevo.descripcion = itemsP.descripcion;
    }
    if (nuevo.costo == "") {
      nuevo.costo = itemsP.costo;
    }
    if (nuevo.precio == "") {
      nuevo.precio = itemsP.precio;
    }
    if (nuevo.unidad == "") {
      nuevo.unidad = itemsP.unidad;
    }
    if (nuevo.categoria == "") {
      nuevo.categoria = itemsP.categoria;
    }

    axios.put("https://beauty365api.herokuapp.com/api/v1/productos/" + id, nuevo).then((res) => {

      window.location.href = "http://localhost:3000/admin/inventario/productos/";

    });



  }

  const onChang = (e) => {

    setNuevo({
      ...nuevo,
      [e.target.name]: e.target.value
    })


  }



  return (

    <form onSubmit={onSubmit}>

      <h5>Codigo</h5>
      <br />
      <input type="number" className="rs-input" name="code" defaultValue={itemsP.code} onChange={onChang} />
      <hr />
      <h5>Nombre</h5>
      <br />
      <input type="text" name="nombre" className="rs-input" defaultValue={itemsP.nombre} onChange={onChang} />
      <hr />
      <h5>Descripcion</h5>
      <br />
      <input type="text" name="descripcion" className="rs-input" defaultValue={itemsP.descripcion} onChange={onChang} />
      <hr />
      <h5>Costo</h5>
      <br />
      <input type="tel" name="costo" className="rs-input" defaultValue={itemsP.costo} onChange={onChang} />
      <hr />
      <h5>Precio</h5>
      <br />
      <input type="number" name="precio" className="rs-input" defaultValue={itemsP.precio} onChange={onChang} />
      <br />
      <hr />
      <select className="rs-input" name="categoria" onChange={onChang}>
            {itemsC.map((option) => (
              <option  value={option._id} >{option.nombre}</option>
              
            ))
            }

      </select>
      <br />
      <hr />
      <select className="rs-input" name="unidad" onChange={onChang}>
            {itemsU.map((option) => (
              <option value={option._id}>{option.nombre}</option>
            ))}
      </select>
      <br />
      <hr />
      
      <button className="rs-btn rs-btn-primary" type="submit">Guardar</button>
    </form>


  );


}
export default Editar;