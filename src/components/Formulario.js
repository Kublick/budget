import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortid from 'shortid';

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {
  const [nombre, guardarNombre] = useState('');
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  //  Cuando el usuario agrega un gasto
  const agregarGasto = (e) => {
    e.preventDefault();

    // validator
    if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
      guardarError(true);
    }
    // construir el gastos
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate(),
    };

    console.log(gasto);
    // pasar al componente principal
    guardarGasto(gasto);
    guardarCrearGasto(true);

    // resetear el form
    guardarNombre('');
    guardarCantidad(0);
  };

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos aquí</h2>
      {error ? (
        <Error mensaje='Ambos campos son obligatorios o Presupuesto es Incorrecto' />
      ) : null}
      <div className='campo'>
        <label>Nombre del Gasto</label>
        <input
          type='text'
          className='u-full-width'
          placeholder='ej. transporte'
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)}
        />
        <label>Cantidad del Gasto</label>
        <input
          type='number'
          className='u-full-width'
          placeholder='ej. 300'
          value={cantidad}
          onChange={(e) => guardarCantidad(parseInt(e.target.value, 10))}
        />
      </div>
      <input
        type='submit'
        className='button-primary u-full-width'
        value='Agregar Gasto'
      />
    </form>
  );
};

Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
};

export default Formulario;
