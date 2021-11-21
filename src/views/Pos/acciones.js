import React from 'react';

function services () {
  fetch("https://beauty365api.herokuapp.com/api/v1/servicios")
  .then(res => res.json())
  .then(data => {
    return data;
  })
};
export default services;