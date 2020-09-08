import React from 'react';

import css from './form.module.css';

export default function Form(props) {
  /*const handleInputChange = (event) => {
    const newText = event.target.value;

    props.onChangeFilter(newText);
  };

  const { filter, countryCount, totalPopulation } = props;*/
  const pi = 'Π';
  //const beta = 'β';

  return (
    <div className={css.flexRow}>
      <input
        placeholder="Entrada"
        type="text"
        style={{ width: '50%', margin: '0 .8rem 0 .5rem' }}
        //value={filter}
        //onChange={handleInputChange}
      />
      <a
        className="waves-effect waves-light btn-small"
        href="#!"
        style={{ width: '10%', marginRight: '.8rem' }}
      >
        Next
      </a>
      <table>
        <tr>
          <td style={{ width: '20%' }}>{pi}(x, y) = </td>
          <td style={{ width: '20%' }}>(x1, x2)</td>
        </tr>
        <tr>
          <td style={{ width: '20%' }}>{pi}(x, y) = </td>
          <td style={{ width: '20%' }}>(x1, x2)</td>
        </tr>
      </table>
    </div>
  );
}
