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
    <div className={css.flexRowElements}>
      <div className={css.borderAll}>
        <div
          className={css.flexRow}
          style={{ margin: '.5rem 0.8rem 0 0.5rem' }}
        >
          <input
            style={{
              float: 'left',
              border: '0px',
              width: '5%',
              textAlign: 'center',
            }}
            placeholder={`${pi}(`}
            alt="função de transição"
            disabled
          />
          <input
            style={{
              float: 'left',
              border: '1px solid #9e9e9e',
              padding: '1%',
              width: '10%',
              height: '30%',
              textAlign: 'center',
            }}
            alt="função de transição"
            placeholder="p, au"
          />
          <input
            style={{ border: '0px', width: '9%', textAlign: 'center' }}
            placeholder=") = ("
            alt="função de transição"
            disabled
          />
          <input
            style={{
              float: 'left',
              border: '1px solid #9e9e9e',
              padding: '1%',
              width: '15%',
              height: '30%',
              textAlign: 'center',
            }}
            alt="função de transição"
            placeholder="q, av, m"
          />
          <input
            style={{
              float: 'left',
              border: '0px',
              width: '2%',
              textAlign: 'center',
              marginLeft: '1%',
              marginRight: '5%',
            }}
            placeholder=")"
            disabled
          />
          <a
            className="btn-floating btn-small waves-effect waves-light"
            href="#!"
            style={{
              backgroundColor: '#26a69a',
            }}
          >
            <i className="material-icons">add</i>
          </a>
          <a
            className="waves-effect waves-light btn-small"
            href="#!"
            style={{ width: '40%', marginLeft: '5%' }}
            id="buttonOne"
          >
            Next
          </a>
        </div>
        <div className={css.flexRow}>
          <input
            placeholder="Entrada"
            type="text"
            style={{ width: '60%', margin: '0 .8rem 0 .5rem' }}
            id="inputTwo"
            //value={filter}
            //onChange={handleInputChange}
          />
          <a
            className="waves-effect waves-light btn-small"
            href="#!"
            style={{ width: '40%', marginRight: '.8rem' }}
            id="buttonTwo"
          >
            Next
          </a>
        </div>
      </div>
      <table style={{ width: '30%' }}>
        <thead>
          <tr>
            <td style={{ textAlign: 'center', padding: '3%' }}>
              Funções de Transição
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: 'center', padding: '1%' }}>
              {pi}(p, au) = (q, av, m){' '}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
