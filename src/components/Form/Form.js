import React, { Fragment, useState } from 'react';
import { CustomDialog } from 'react-st-modal';

import css from './form.module.css';
import Table from '../Table/Table';
import Step from '../Step/Step';
import CustomDialogContent from '../Modal/CustomDialogContent';

const PI = 'Π';
const STR_PADRAO = PI + '(p, au) = (q, av, m)';
const STR_INITIAL_STATE_DEFAULT = 'Estado inicial: ';
const STR_FINAL_STATES_DEFAULT = 'Estados de aceitação: {';
const STR_PHRASE_FINAL_STATES = 'Digite os estados de aceitação: {';
const STR_KEY_FINAL_STATES = '}';
const editSimbol = '✎';

export default function Form() {
  //constante que armazena as funcoes de transicao incluidas pelo usuario
  const [currentFunctions, setCurrentFunctions] = useState([
    { id: 1, str: STR_PADRAO },
  ]);
  //constante que armazena os estados inicial e finais incluidos pelo usuario
  const [currentStates, setCurrentStates] = useState([
    { id: 1, str: STR_INITIAL_STATE_DEFAULT },
    { id: 2, str: STR_FINAL_STATES_DEFAULT + '}' },
    {
      id: 3,
      str:
        '▷ : símbolo marcador de início da fita. Copie e cole para incluir a configuração da função de transição que inicia o processamento.',
    },
    {
      id: 4,
      str: '_ : símbolo que representa o branco (β).',
    },
    {
      id: 5,
      str:
        '< ou >: símbolos que representam o movimento para a esquerda ou para a direita, respectivamente.',
    },
  ]);
  //constante que armazena primeira parte da funcao de transicao incluida pelo usuario
  const [funcOne, setFuncOne] = useState();
  //constante que armazena segunda parte da funcao de transicao incluida pelo usuario
  const [funcTwo, setFuncTwo] = useState();
  //constante que armazena primeira parte da funcao de transicao incluida pelo usuario para edicao/exclusao
  const [editFuncOne, setEditFuncOne] = useState();
  //constante que armazena segunda parte da funcao de transicao incluida pelo usuario para edicao/exclusao
  const [editFuncTwo, setEditFuncTwo] = useState();
  //constante que armazena entrada a ser processada
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
  //constante que armazena entrada digitada pelo usuario
  const [lookInput, setLookInput] = useState();
  //constante que armazena estado inicial definido pelo usuario
  const [initialState, setInitialState] = useState();
  //constante que armazena estado inicial digitado pelo usuario
  const [lookInitialState, setLookInitialState] = useState();
  //constante que armazena estados finais definidos pelo usuario
  const [finalStates, setFinalStates] = useState([]);
  //constante que armazena estados finais digitados pelo usuario
  const [lookFinalStates, setLookFinalStates] = useState();
  //constante que controla exibicao dos passos
  const [toOmit, setToOmit] = useState(false);
  //constante que controla exibicao do box de edicao das funcoes de transicao
  const [toOmitEditFunctions, setToOmitEditFunctions] = useState(false);
  //constante que controla parcialmente o inicio do processamento
  const [allowedStart, setAllowedStart] = useState(true);

  //Metodo que atualiza o estado inicial
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
      arrayStates.push(currentStates[2]);
      arrayStates.push(currentStates[3]);
      arrayStates.push(currentStates[4]);

      arrayStates[0].str = strFormat;
      setCurrentStates(arrayStates);
    }
  };

  //Metodo que atualiza os estados finais
  const handleFinalStatesButtonClick = () => {
    if (lookFinalStates) {
      let strFormat = `${STR_FINAL_STATES_DEFAULT}${lookFinalStates.replace(
        /( )+/g,
        ''
      )}}`;
      let strFormatStates = `${lookFinalStates.replace(/( )+/g, '')}`;
      const arrayFinalStates = [];
      let strBreak = '';
      for (let index = 0; index < strFormatStates.length; index++) {
        if (strFormatStates[index] === ',') {
          arrayFinalStates.push(strBreak);
          strBreak = '';
        } else if (index === strFormatStates.length - 1) {
          strBreak += strFormatStates[index];
          arrayFinalStates.push(strBreak);
          strBreak = '';
        } else {
          strBreak += strFormatStates[index];
        }
      }
      setFinalStates(arrayFinalStates);

      currentStates.find((state) => {
        return state.id === 2;
      }).str = strFormat;

      const arrayStates = [];
      arrayStates.push(currentStates[0]);
      arrayStates.push(currentStates[1]);
      arrayStates.push(currentStates[2]);
      arrayStates.push(currentStates[3]);
      arrayStates.push(currentStates[4]);

      arrayStates[1].str = strFormat;
      setCurrentStates(arrayStates);
    }
  };

  //Metodo que atualiza as funcoes de transicao como uma string
  const handleButtonClick = () => {
    if (funcOne && funcTwo) {
      let strFormat = PI + '(';
      let existFunc = false;
      if (
        funcOne.indexOf(',') !== -1 &&
        funcTwo.indexOf(',') !== -1 &&
        funcOne.match(/,/g).length === 1 &&
        funcTwo.match(/,/g).length === 2
      ) {
        //nao permite duplicidade
        currentFunctions.map((func) => {
          if (func.str.includes(funcOne.replace(/( )+/g, '') + ')')) {
            existFunc = true;
          }
          return func;
        });
        if (!existFunc) {
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
          setFuncOne('');
          setFuncTwo('');
        }
      }
    }
  };

  //Metodo que processa qualquer valor digitado no campo 'estado inicial'
  const handleInitialStateInputChange = (event) => {
    const { value } = event.target;
    setLookInitialState(value);
  };

  //Metodo que processa qualquer valor digitado no campo 'estados finais'
  const handleFinalStatesInputChange = (event) => {
    const { value } = event.target;
    setLookFinalStates(value);
  };

  //Metodo que processa qualquer valor digitado no primeiro campo de funcoes de transicao
  const handleFirstInputChange = (event) => {
    const { value } = event.target;
    setFuncOne(value);
  };

  //Metodo que processa qualquer valor digitado no segundo campo de funcoes de transicao
  const handleSecondInputChange = (event) => {
    const { value } = event.target;
    setFuncTwo(value);
  };

  //Metodo que processa qualquer valor digitado no campo 'entrada'
  const handleThirdInputChange = (event) => {
    const { value } = event.target;
    if (value.replace(/( )+/g, '') && value.replace(/( )+/g, '').length < 8) {
      let size = value.replace(/( )+/g, '').length;
      let white = value.replace(/( )+/g, '');
      for (let index = size - 1; index < 8; index++) {
        white += '-';
      }
      setLookInput(white);
    } else {
      setLookInput(value.replace(/( )+/g, ''));
    }

    if (
      initialState.length > 0 &&
      finalStates.length > 0 &&
      currentFunctions.length > 1
    ) {
      setAllowedStart(false);
    } else {
      setAllowedStart(true);
    }
  };

  /*Metodo que define a entrada a ser processada e exibida
   * a partir do valor informado pelo usuario
   */
  const handleInputButtonClick = () => {
    if (lookInput) {
      setInput(lookInput);
      setToOmit(true);
      setAllowedStart(true);
    }
  };

  //Metodo que omite a opcao de editar/alterar apos o clique do botao
  const handleEditButtonClick = () => {
    setToOmit(false);
  };

  //Metodo que exibe o box de edicao das funcoes de transicao apos o clique do botao
  const handleEditFunctionsButtonClick = () => {
    setToOmitEditFunctions(!toOmitEditFunctions);
  };

  //Metodo que inibe o box de edicao das funcoes de transicao apos o clique do botao fechar
  const handleCloseEditFunctionsButtonClick = () => {
    setToOmitEditFunctions(false);
  };

  //Metodo que atualiza as funcoes de transicao como uma string a partir do clique do botao de edicao
  const handleEditFunctionButtonClick = () => {
    if (editFuncOne && editFuncTwo) {
      let strFormat = PI + '(';
      if (editFuncOne.indexOf(',') !== -1 && editFuncTwo.indexOf(',') !== -1) {
        // eslint-disable-next-line
        let funcEdit = currentFunctions.find((func) => {
          if (func.str.includes(editFuncOne.replace(/( )+/g, '') + ')')) {
            return func;
          }
        });

        if (funcEdit) {
          strFormat += `${editFuncOne.replace(
            /( )+/g,
            ''
          )}) = (${editFuncTwo.replace(/( )+/g, '')})`;
          const arrayFunctions = [];
          for (let index = 0; index < currentFunctions.length; index++) {
            if (funcEdit.id === currentFunctions[index].id) {
              arrayFunctions.push({
                id: currentFunctions[index].id,
                str: strFormat,
              });
            } else {
              arrayFunctions.push(currentFunctions[index]);
            }
          }
          if (arrayFunctions.length === currentFunctions.length) {
            setCurrentFunctions(arrayFunctions);
          }
          setEditFuncOne('');
          setEditFuncTwo('');
        }
      }
    }
  };

  //Metodo excluir e atualiza as funcoes de transicao como uma string a partir do clique do botao de exclusao
  const handleDeleteFunctionButtonClick = () => {
    if (editFuncOne && editFuncTwo) {
      if (editFuncOne.indexOf(',') !== -1 && editFuncTwo.indexOf(',') !== -1) {
        // eslint-disable-next-line
        let funcDelete = currentFunctions.find((func) => {
          if (
            func.str.includes(editFuncOne.replace(/( )+/g, '') + ')') &&
            func.str.includes(editFuncTwo.replace(/( )+/g, '') + ')')
          ) {
            return func;
          }
        });
        if (funcDelete) {
          const arrayFunctions = [];
          let indexDelete = 0;
          for (let index = 0; index < currentFunctions.length; index++) {
            if (funcDelete.id === currentFunctions[index].id) {
              indexDelete = index;
            } else {
              if (indexDelete < index && indexDelete !== 0) {
                arrayFunctions.push({
                  id: currentFunctions[index].id - 1,
                  str: currentFunctions[index].str,
                });
              } else {
                arrayFunctions.push(currentFunctions[index]);
              }
            }
          }
          if (arrayFunctions.length < currentFunctions.length) {
            setCurrentFunctions(arrayFunctions);
          }
          setEditFuncOne('');
          setEditFuncTwo('');
        }
      }
    }
  };

  //Metodo que processa qualquer valor digitado no primeiro campo de funcoes de transicao para edicao/exclusao
  const handleFirstInputEditFunctionChange = (event) => {
    const { value } = event.target;
    setEditFuncOne(value);
  };

  //Metodo que processa qualquer valor digitado no segundo campo de funcoes de transicao para edicao/exclusao
  const handleSecondInputEditFunctionChange = (event) => {
    const { value } = event.target;
    setEditFuncTwo(value);
  };

  //Metodo que reseta toda a maquina criada apos o clique do botao resetar maquina
  const handleAllResetButtonClick = () => {
    setCurrentFunctions([{ id: 1, str: STR_PADRAO }]);
    setCurrentStates([
      { id: 1, str: STR_INITIAL_STATE_DEFAULT },
      { id: 2, str: STR_FINAL_STATES_DEFAULT + '}' },
      {
        id: 3,
        str:
          '▷ : símbolo marcador de início da fita. Copie e cole para incluir a configuração da função de transição que inicia o processamento.',
      },
      {
        id: 4,
        str: '_ : símbolo que representa o branco (β).',
      },
      {
        id: 5,
        str:
          '< ou >: símbolos que representam o movimento para a esquerda ou para a direita, respectivamente.',
      },
    ]);
    setFuncOne();
    setFuncTwo();
    setEditFuncOne();
    setEditFuncTwo();
    setInput(['-', '-', '-', '-', '-', '-', '-', '-', '-']);
    setLookInput();
    setInitialState();
    setLookInitialState();
    setFinalStates([]);
    setLookFinalStates();
    setToOmit(false);
    setToOmitEditFunctions(false);
    setAllowedStart(true);
  };

  //Metodo que atualiza input a partir da escrita na fita
  const updateInput = (str, indexNew) => {
    if (indexNew !== -1) {
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
    } else {
      setInput(str);
    }
  };

  //Metodo que, atraves do reset do processamento da fita, libera a troca de entrada
  const freeInit = () => {
    if (!toOmit) {
      setAllowedStart(false);
    }
  };

  return (
    <Fragment>
      <div className={css.flexRowElements}>
        <div className={css.borderAll}>
          {!toOmit && (
            <div>
              <div className={css.flexRow}>
                <h2
                  title="Defina o estado inicial (q0) e clique no botão 'OK'. Clique aqui para saber mais!"
                  onClick={async () => {
                    await CustomDialog(
                      <CustomDialogContent typeInformation="1" />,
                      {
                        title: 'Informações - Estado Inicial',
                        showCloseIcon: true,
                      }
                    );
                  }}
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
                  OK
                </a>
              </div>
              <div className={css.flexRow}>
                <h2
                  title="Defina o conjunto de estados de aceitação e clique no botão 'OK'. Clique aqui para saber mais!"
                  onClick={async () => {
                    await CustomDialog(
                      <CustomDialogContent typeInformation="2" />,
                      {
                        title: 'Informações - Estados Finais',
                        showCloseIcon: true,
                      }
                    );
                  }}
                >
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
                  OK
                </a>
              </div>
              <div className={css.flexRow}>
                <h2
                  title="Adicione configurações da função de transição ao clicar no botão '+'. Clique aqui para saber mais!"
                  onClick={async () => {
                    await CustomDialog(
                      <CustomDialogContent typeInformation="3" />,
                      {
                        title: 'Informações - Função de Transição/Programa',
                        showCloseIcon: true,
                      }
                    );
                  }}
                >
                  3
                </h2>
                <span
                  style={styles.firstInputDisabled}
                  alt="função de transição"
                >{`${PI}(`}</span>
                <input
                  style={styles.firstInput}
                  title="função de transição"
                  placeholder="p, au"
                  onChange={handleFirstInputChange}
                />
                <span
                  style={styles.secondInputDisabled}
                  title="função de transição"
                >
                  ) = (
                </span>
                <input
                  style={styles.secondInput}
                  title="função de transição"
                  placeholder="q, av, m"
                  onChange={handleSecondInputChange}
                />
                <span style={styles.thirdInputDisabled}>)</span>
                <a
                  className="btn-floating btn-small waves-effect waves-light"
                  href="#!"
                  style={styles.buttonFunctionStep}
                  onClick={handleButtonClick}
                >
                  <i className="material-icons">add</i>
                </a>
                <a
                  className="btn-floating btn-small waves-effect waves-light"
                  href="#!"
                  style={styles.buttonFunctionStep}
                  title="Clique aqui para acessar as opções de edição de configurações da função de transição ou reset de máquina."
                  onClick={handleEditFunctionsButtonClick}
                >
                  {editSimbol}
                </a>
              </div>
              {toOmitEditFunctions && (
                <div style={styles.divEditFunctions}>
                  <div
                    style={styles.btnCloseEditFunctions}
                    onClick={handleCloseEditFunctionsButtonClick}
                  >
                    <span>X</span>
                  </div>
                  <span style={{ marginBottom: '0.5rem' }}>
                    Editar ou excluir configuração da função de transição:
                  </span>
                  <div style={{ padding: '1rem' }}>
                    <span style={{ marginRight: '0.3rem' }}>{`${PI}(`}</span>
                    <input
                      style={styles.firstInputEditFunctions}
                      title="função de transição"
                      placeholder="p, au"
                      onChange={handleFirstInputEditFunctionChange}
                    />
                    <span
                      style={{ marginRight: '0.3rem', marginLeft: '0.3rem' }}
                    >
                      ) = (
                    </span>
                    <input
                      style={styles.secondInputEditFunctions}
                      title="função de transição"
                      placeholder="q, av, m"
                      onChange={handleSecondInputEditFunctionChange}
                    />
                    <span style={{ marginLeft: '1%', marginRight: '0.5rem' }}>
                      )
                    </span>
                    <a
                      className="btn-floating btn-small waves-effect waves-light"
                      href="#!"
                      style={styles.buttonFunctionStep}
                      onClick={handleEditFunctionButtonClick}
                      title="Clique aqui para confirmar a edição da configuração informada"
                    >
                      ok
                    </a>
                    <a
                      className="btn-floating btn-small waves-effect waves-light"
                      href="#!"
                      style={styles.buttonFunctionStep}
                      onClick={handleDeleteFunctionButtonClick}
                      title="Clique aqui para confirmar a exclusão da configuração informada"
                    >
                      x
                    </a>
                  </div>
                  <div style={{ paddingBottom: '1rem' }}>
                    <span style={{ fontSize: '12px' }}>
                      *Caso a configuração da função não seja modificada ou
                      excluída, tente editar os dois inputs novamente e
                      confirmar a operação.
                    </span>
                  </div>
                  <div>
                    <span>Resetar a máquina:</span>
                    <div style={{ padding: '1rem' }}>
                      <a
                        className="waves-effect waves-light btn-small"
                        href="#!"
                        onClick={handleAllResetButtonClick}
                        title="Ao clicar no botão, todas as informações da máquina serão perdidas."
                      >
                        RESETAR MÁQUINA
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className={css.flexRow}>
            <h2
              title="Defina uma entrada e inicie o processamento na máquina criada ao clicar no botão 'INICIAR'. Clique aqui para saber mais!"
              onClick={async () => {
                await CustomDialog(
                  <CustomDialogContent typeInformation="4" />,
                  {
                    title: 'Informações - Entrada',
                    showCloseIcon: true,
                  }
                );
              }}
            >
              4
            </h2>
            <input
              placeholder="Entrada"
              type="text"
              style={styles.thirdInput}
              onChange={handleThirdInputChange}
              disabled={toOmit}
            />
            <a
              className="waves-effect waves-light btn-small"
              href="#!"
              style={styles.buttonStartStep}
              id="buttonTwo"
              onClick={handleInputButtonClick}
              title="Lembre-se de acrescentar as informações dos passos 1, 2 e 3 antes de iniciar o processamento. Caso deseje trocar a entrada sem mudar a máquina, reset o processamento nos botões abaixo da fita."
              disabled={allowedStart}
            >
              iniciar
            </a>
          </div>
          {toOmit && (
            <div style={styles.divEditAll}>
              <a
                className="waves-effect waves-light btn-small"
                href="#!"
                style={styles.buttonEdit}
                onClick={handleEditButtonClick}
              >
                {editSimbol} alterar
              </a>
            </div>
          )}
        </div>
      </div>
      <div className={css.flexRowElements}>
        <Table func={currentFunctions} title="Função de Transição" />
        <Table func={currentStates} title="Informações de Processamento" />
      </div>
      {input[0] !== '-' && toOmit && (
        <Step
          func={currentFunctions}
          input={input}
          initial={initialState}
          final={finalStates}
          updateInput={updateInput}
          freeInit={freeInit}
        />
      )}
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
  buttonEdit: {
    backgroundColor: '#26a69a',
    minWidth: '74px',
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  divEditAll: {
    textAlign: 'center',
    backgroundColor: '#D7DED7',
    borderRadius: '5px',
  },
  divEditFunctions: {
    backgroundColor: '#D7DED7',
    borderRadius: '5px',
    padding: '1rem',
  },
  btnCloseEditFunctions: {
    marginBottom: '0.5rem',
    float: 'right',
    border: '1px solid rgb(158, 158, 158)',
    borderRadius: '2px',
    paddingLeft: '4px',
    paddingRight: '4px',
    cursor: 'pointer',
  },
  firstInputEditFunctions: {
    border: '1px solid rgb(158, 158, 158)',
    padding: '1%',
    width: '40px',
    height: '30%',
    textAlign: 'center',
  },
  secondInputEditFunctions: {
    border: '1px solid rgb(158, 158, 158)',
    padding: '1%',
    width: '70px',
    height: '30%',
    textAlign: 'center',
  },
};
