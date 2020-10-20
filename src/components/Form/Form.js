import React, { Fragment, useState } from 'react';

import css from './form.module.css';
import Table from '../Table/Table';

const PI = 'Π';
const STR_PADRAO = PI + '(p, au) = (q, av, m)';

export default function Form(props) {
  const [currentFunctions, setCurrentFunctions] = useState([
    { id: 1, str: STR_PADRAO },
    { id: 2, str: STR_PADRAO },
  ]);

  const handleButtonClick = () => {
    //TODO RECUPERAR ENTRADA
    const arrayTest = [];
    for (let index = 0; index <= currentFunctions.length; index++) {
      if (index === currentFunctions.length) {
        arrayTest.push({ id: currentFunctions.length + 1, str: STR_PADRAO });
      } else {
        arrayTest.push(currentFunctions[index]);
      }
    }
    if (arrayTest.length > currentFunctions.length) {
      setCurrentFunctions(arrayTest);
    }
  };

  // const functions = [{ id: 1, str: STR_PADRAO }];
  /*const handleInputChange = (event) => {
    const newText = event.target.value;

    props.onChangeFilter(newText);
  };

  const { filter, countryCount, totalPopulation } = props;*/
  //const beta = 'β';

  return (
    <Fragment>
      <div className={css.flexRowElements}>
        <div className={css.borderAll}>
          <div className={css.flexRow}>
            <h2 title="Inclusão das funções de transição">1</h2>
            <input
              style={styles.firstInputDisabled}
              placeholder={`${PI}(`}
              alt="função de transição"
              disabled
            />
            <input
              style={styles.firstInput}
              title="função de transição"
              placeholder="p, au"
            />
            <input
              style={styles.secondInputDisabled}
              placeholder=") = ("
              title="função de transição"
              disabled
            />
            <input
              style={styles.secondInput}
              title="função de transição"
              placeholder="q, av, m"
            />
            <input style={styles.thirdInputDisabled} placeholder=")" disabled />
            <a
              className="btn-floating btn-small waves-effect waves-light"
              href="#!"
              style={{
                backgroundColor: '#26a69a',
              }}
              onClick={handleButtonClick}
            >
              <i className="material-icons">add</i>
            </a>
          </div>
          <div className={css.flexRow}>
            <h2 title="Entrada para processamento na máquina criada">2</h2>
            <input
              placeholder="Entrada"
              type="text"
              style={styles.thirdInput}
              //value={filter}
              //onChange={handleInputChange}
            />
            <a
              className="waves-effect waves-light btn-small"
              href="#!"
              style={{ width: '23%' }}
              id="buttonTwo"
            >
              iniciar
            </a>
          </div>
        </div>
      </div>
      <Table func={currentFunctions} />
    </Fragment>
  );
}

const styles = {
  firstInputDisabled: {
    float: 'left',
    border: '0px',
    width: '25px',
    textAlign: 'center',
  },
  firstInput: {
    float: 'left',
    border: '1px solid #9e9e9e',
    padding: '1%',
    width: '40px',
    height: '30%',
    textAlign: 'center',
  },
  secondInputDisabled: {
    border: '0px',
    width: '50px',
    textAlign: 'center',
  },
  secondInput: {
    float: 'left',
    border: '1px solid #9e9e9e',
    padding: '1%',
    width: '70px',
    height: '30%',
    textAlign: 'center',
  },
  thirdInputDisabled: {
    float: 'left',
    border: '0px',
    width: '5px',
    textAlign: 'center',
    marginLeft: '1%',
    marginRight: '5%',
  },
  thirdInput: {
    width: '40%',
    margin: '0 .8rem 0 .5rem',
  },
};
