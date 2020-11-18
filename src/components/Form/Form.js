import React, { Fragment, useState } from 'react';

import css from './form.module.css';
import Table from '../Table/Table';
import Step from '../Steps/Step';

const PI = 'Π';
const STR_PADRAO = PI + '(p, au) = (q, av, m)';
const STR_INITIAL_STATE_DEFAULT = 'Estado inicial: ';
const STR_FINAL_STATES_DEFAULT = 'Estados de aceitação: {';
const STR_PHRASE_FINAL_STATES = 'Digite os estados de aceitação: {';
const STR_KEY_FINAL_STATES = '}';

export default function Form(props) {
  const [currentFunctions, setCurrentFunctions] = useState([
    { id: 1, str: STR_PADRAO },
  ]);
  const [currentStates, setCurrentStates] = useState([
    { id: 1, str: STR_INITIAL_STATE_DEFAULT },
    { id: 2, str: STR_FINAL_STATES_DEFAULT + '}' },
  ]);
  const [funcOne, setFuncOne] = useState();
  const [funcTwo, setFuncTwo] = useState();
  const [input, setInput] = useState();
  const [lookInput, setLookInput] = useState();
  const [initialState, setInitialState] = useState();
  const [lookInitialState, setLookInitialState] = useState();
  const [finalStates, setFinalStates] = useState();
  const [lookFinalStates, setLookFinalStates] = useState();

  const handleInitialStateButtonClick = () => {
    setInitialState(lookInitialState);
    if (lookInitialState) {
      let strFormat = `${STR_INITIAL_STATE_DEFAULT} ${lookInitialState.replace(
        ' ',
        ''
      )}`;
      currentStates.find((state) => {
        return state.id === 1;
      }).str = strFormat;

      const arrayStates = [];
      arrayStates.push(currentStates[0]);
      arrayStates.push(currentStates[1]);

      arrayStates[0].str = strFormat;
      setCurrentStates(arrayStates);
    }
  };

  const handleFinalStatesButtonClick = () => {
    setFinalStates(lookFinalStates);
    if (lookFinalStates) {
      let strFormat = `${STR_FINAL_STATES_DEFAULT}${lookFinalStates.replace(
        ' ',
        ''
      )}}`;
      currentStates.find((state) => {
        return state.id === 2;
      }).str = strFormat;

      const arrayStates = [];
      arrayStates.push(currentStates[0]);
      arrayStates.push(currentStates[1]);

      arrayStates[1].str = strFormat;
      setCurrentStates(arrayStates);
    }
  };

  const handleButtonClick = () => {
    if (funcOne && funcTwo) {
      let strFormat = PI + '(';
      if (funcOne.indexOf(',') !== -1 && funcTwo.indexOf(',') !== -1) {
        strFormat += `${funcOne.replace(' ', '')}) = (${funcTwo.replace(
          ' ',
          ''
        )})`;
        const arrayFunctions = [];
        for (let index = 0; index <= currentFunctions.length; index++) {
          if (index === currentFunctions.length) {
            arrayFunctions.push({
              id: currentFunctions.length + 1,
              str: strFormat,
            });
          } else {
            arrayFunctions.push(currentFunctions[index]);
          }
        }
        if (arrayFunctions.length > currentFunctions.length) {
          setCurrentFunctions(arrayFunctions);
        }
      }
    }
    setFuncOne('');
    setFuncTwo('');
  };

  const handleInitialStateInputChange = (event) => {
    const { value } = event.target;
    setLookInitialState(value);
  };

  const handleFinalStatesInputChange = (event) => {
    const { value } = event.target;
    setLookFinalStates(value);
  };

  const handleFirstInputChange = (event) => {
    const { value } = event.target;
    setFuncOne(value);
  };

  const handleSecondInputChange = (event) => {
    const { value } = event.target;
    setFuncTwo(value);
  };

  const handleThirdInputChange = (event) => {
    const { value } = event.target;
    setLookInput(value);
  };

  const handleInputButtonClick = () => {
    setInput(lookInput);
  };

  return (
    <Fragment>
      <div className={css.flexRowElements}>
        <div className={css.borderAll}>
          <div className={css.flexRow}>
            <h2 title="Defina o estado inicial (q0) e clique no botão 'OK'">
              1
            </h2>
            <span style={styles.initialStateSpan}>
              Digite qual o estado inicial:{' '}
            </span>
            <input
              style={styles.initialStateInput}
              title="estado inicial"
              placeholder="q0"
              onChange={handleInitialStateInputChange}
            />
            <a
              className="btn-floating btn-small waves-effect waves-light"
              href="#!"
              style={styles.buttonsStatesSteps}
              onClick={handleInitialStateButtonClick}
            >
              <i className="material-icons">OK</i>
            </a>
          </div>
          <div className={css.flexRow}>
            <h2 title="Defina o conjunto de estados de aceitação e clique no botão 'OK'">
              2
            </h2>
            <span style={styles.finalStatesSpan}>
              {STR_PHRASE_FINAL_STATES}
            </span>
            <input
              style={styles.finalStatesInput}
              title="estados finais"
              placeholder="q5,q6"
              onChange={handleFinalStatesInputChange}
            />
            <span style={styles.finalStatesSecondSpan}>
              {STR_KEY_FINAL_STATES}
            </span>
            <a
              className="btn-floating btn-small waves-effect waves-light"
              href="#!"
              style={styles.buttonsStatesSteps}
              onClick={handleFinalStatesButtonClick}
            >
              <i className="material-icons">OK</i>
            </a>
          </div>
          <div className={css.flexRow}>
            <h2 title="Adicione funções de transição ao clicar no botão '+'">
              3
            </h2>
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
              onChange={handleFirstInputChange}
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
              onChange={handleSecondInputChange}
            />
            <input style={styles.thirdInputDisabled} placeholder=")" disabled />
            <a
              className="btn-floating btn-small waves-effect waves-light"
              href="#!"
              style={styles.buttonFunctionStep}
              onClick={handleButtonClick}
            >
              <i className="material-icons">add</i>
            </a>
          </div>
          <div className={css.flexRow}>
            <h2 title="Defina uma entrada e inicie o processamento na máquina criada ao clicar no botão 'INICIAR'">
              4
            </h2>
            <input
              placeholder="Entrada"
              type="text"
              style={styles.thirdInput}
              //value={filter}
              onChange={handleThirdInputChange}
            />
            <a
              className="waves-effect waves-light btn-small"
              href="#!"
              style={styles.buttonStartStep}
              id="buttonTwo"
              onClick={handleInputButtonClick}
            >
              iniciar
            </a>
          </div>
        </div>
      </div>
      <div className={css.flexRowElements}>
        <Table func={currentFunctions} title="Funções de Transição" />
        <Table func={currentStates} title="Estados Inicial e de Aceitação" />
      </div>
      <Step
        func={currentFunctions}
        input={input}
        initial={initialState}
        final={finalStates}
      />
    </Fragment>
  );
}

const styles = {
  initialStateSpan: {
    paddingRight: '0.5rem',
  },
  initialStateInput: {
    float: 'left',
    border: '1px solid #9e9e9e',
    padding: '1%',
    width: '40px',
    height: '30%',
    textAlign: 'center',
    marginRight: '1.2rem',
  },
  finalStatesSpan: {
    paddingRight: '0.5rem',
  },
  finalStatesSecondSpan: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  finalStatesInput: {
    float: 'left',
    border: '1px solid #9e9e9e',
    padding: '1%',
    width: '40px',
    height: '30%',
    textAlign: 'center',
  },
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
    width: '40px',
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
    marginRight: '0.5rem',
  },
  thirdInput: {
    width: '40%',
    margin: '0 .8rem 0 .5rem',
  },
  buttonsStatesSteps: {
    backgroundColor: '#26a69a',
    minWidth: '34px',
  },
  buttonFunctionStep: {
    backgroundColor: '#26a69a',
    minWidth: '29px',
  },
  buttonStartStep: {
    backgroundColor: '#26a69a',
    minWidth: '74px',
    width: '23%',
  },
};
