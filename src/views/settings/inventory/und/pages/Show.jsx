import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import Profile from '../components/Profile'

const Show = (props) => {
  let { id } = useParams();
  const [ establecimiento, setEstablecimiento] = React.useState(null);

  console.log(id)

  useEffect(() => {
    fetch("https://beauty365api.herokuapp.com/api/v1/establecimientos")
      .then(res => res.json())
      .then(
        (result) => {
          //setIsLoaded(true);
          setEstablecimiento(result);
          console.log(result);
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          //setIsLoaded(true);
          //setError(error);
          console.log(error);
        }
      )
  })

  return (
    <>
    <div>
        <h5>Mostrar Unidades</h5>
        <h5>View: inventario/unidades/components/Profile</h5>
        <Divider />
    </div>
    <Profile/>
    </>
  );
};

export default Show;