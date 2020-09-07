import React from 'react';

import css from './form.module.css';

export default function Form(props) {
  /*const handleInputChange = (event) => {
    const newText = event.target.value;

    props.onChangeFilter(newText);
  };

  const { filter, countryCount, totalPopulation } = props;*/

  return (
    <div className={css.flexRow}>
      <input
        placeholder="Entrada"
        type="text"
        //value={filter}
        //onChange={handleInputChange}
      />{' '}
      <a className="waves-effect waves-light btn" href="http://google.com">
        Next
      </a>
    </div>
  );
}
