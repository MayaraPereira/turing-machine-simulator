import React, { Fragment, useState } from 'react';
/*import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';*/

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
  const [input, setInput] = useState([
    '-',
    '-',
    '-',
    '-',
    '-',
    '-',
    '-',
    '-',
    '-',
  ]);
  const [lookInput, setLookInput] = useState();
  const [initialState, setInitialState] = useState();
  const [lookInitialState, setLookInitialState] = useState();
  const [finalStates, setFinalStates] = useState();
  const [lookFinalStates, setLookFinalStates] = useState();

  /*Modal
  //Controla abertura e fechamento do modal
  const [open, setOpen] = useState(false);
  //Define o titulo do modal
  const [modalTitle, setModalTitle] = useState('');
  //Define descricao do modal
  const [modalDescription, setModalDescription] = useState('');
  //Define estilo do modal
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();*/

  //Metodo que armazena o estado inicial
  const handleInitialStateButtonClick = () => {
    setInitialState(lookInitialState);
    if (lookInitialState) {
      let strFormat = `${STR_INITIAL_STATE_DEFAULT} ${lookInitialState.replace(
        /( )+/g,
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

  //Metodo que armazena os estados finais
  const handleFinalStatesButtonClick = () => {
    setFinalStates(lookFinalStates);
    if (lookFinalStates) {
      let strFormat = `${STR_FINAL_STATES_DEFAULT}${lookFinalStates.replace(
        /( )+/g,
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

  //Metodo que armazena as funcoes de transicao como uma string
  const handleButtonClick = () => {
    if (funcOne && funcTwo) {
      let strFormat = PI + '(';
      if (funcOne.indexOf(',') !== -1 && funcTwo.indexOf(',') !== -1) {
        strFormat += `${funcOne.replace(/( )+/g, '')}) = (${funcTwo.replace(
          /( )+/g,
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

  //Metodo que guarda qualquer valor digitado no campo 'estado inicial'
  const handleInitialStateInputChange = (event) => {
    const { value } = event.target;
    setLookInitialState(value);
  };

  //Metodo que guarda qualquer valor digitado no campo 'estados finais'
  const handleFinalStatesInputChange = (event) => {
    const { value } = event.target;
    setLookFinalStates(value);
  };

  //Metodo que guarda qualquer valor digitado no primeiro campo de funcoes de transicao
  const handleFirstInputChange = (event) => {
    const { value } = event.target;
    setFuncOne(value);
  };

  //Metodo que guarda qualquer valor digitado no segundo campo de funcoes de transicao
  const handleSecondInputChange = (event) => {
    const { value } = event.target;
    setFuncTwo(value);
  };

  //Metodo que guarda qualquer valor digitado no campo 'entrada'
  const handleThirdInputChange = (event) => {
    const { value } = event.target;
    if (value.replace(/( )+/g, '') && value.replace(/( )+/g, '').length < 9) {
      let size = value.replace(/( )+/g, '').length;
      let white = value.replace(/( )+/g, '');
      for (let index = size - 1; index < 10; index++) {
        white += '-';
      }
      setLookInput(white);
    } else {
      setLookInput(value.replace(/( )+/g, ''));
    }
  };

  /*Metodo que define a entrada a ser processada e exibida
   * a partir do valor informado pelo usuario
   */
  const handleInputButtonClick = () => {
    if (lookInput) {
      setInput(lookInput);
    }
  };

  /*Método para abrir modal de informacoes
  const handleOpen = () => {
    setOpen(true);
    setModalTitle('Passo 1 - Estado inicial');
    setModalDescription('Estado inicial.');
  };

  //Método para fechar modal de informacoes
  const handleClose = () => {
    setOpen(false);
    setModalTitle('');
    setModalDescription('');
  };

  //Calcula posicionamento do modal
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  //Define style do modal
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  //Define style
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  //define body do modal de informações
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{modalTitle}</h2>
      <p id="simple-modal-description">{modalDescription}</p>
    </div>
  );
  
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
  */

  //Metodo que atualiza input a partir da escrita na pilha
  const updateInput = (str, indexNew) => {
    let strAux = '';
    for (let index = 0; index < input.length; index++) {
      if (indexNew === index) {
        strAux += str;
      } else {
        strAux += input[index];
      }
    }
    if (strAux !== '') {
      setInput(strAux);
    }
  };

  return (
    <Fragment>
      <div className={css.flexRowElements}>
        <div className={css.borderAll}>
          <div className={css.flexRow}>
            <h2
              title="Defina o estado inicial (q0) e clique no botão 'OK'"
              //onClick={handleOpen}
            >
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
        updateInput={updateInput}
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
