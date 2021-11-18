import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import {
  FlexboxGrid,
  Divider
} from 'rsuite';

import Profile from '../components/Profile'

const Show = () => {

  let { id } = useParams();
  console.log("MOSTRAR CLIENTE: ", id);
 
  return (
    <>
    <div>
        <h5>Mostrar Perfil</h5>
        <h5>View: clients/components/Profile</h5>
        <Divider />
    </div>
    <Profile/>
    </>
  );
};

export default Show;