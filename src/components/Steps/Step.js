import React, { useState, useEffect } from 'react';
import css from './step.module.css';

const INITIAL_SIMBOL = '▷';
const POINTER_SIMBOL = '⇧';

export default function Step({
  func,
  input,
  initial,
  final,
  updateInput,
  freeInit,
}) {
  console.log('input' + input);
  //constante que define localizacao do apontador
  const [pointerControll, setPointerControll] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  //variavel que armazena um contador auxiliar para renderizacao das células da fita
  let counterPointer = 0;
  //contador que controla quantidade de vezes de execucao automatica para evitar loop infinito
  const [auxCounter, setAuxCounter] = useState(0);
  //constante que armazena as funcoes de transicao como objetos
  const [funcObject, setFuncObject] = useState([]);
  //constante que armazena o estado atual de processamento
  const [currentState, setCurrentState] = useState(initial);
  //constante que armazena a parte do input que esta sendo lida
  const [currentInput, setCurrentInput] = useState({
    index: -1,
    str: INITIAL_SIMBOL,
  });
  //constante que armazena a funcao de transicao a ser exibida
  const [currentFunc, setCurrentFunc] = useState('');
  //constante que armazena a funcao de transicao a ser processada
  const [currentFuncProcessing, setCurrentFuncProcessing] = useState();
  //constante que armazena o valor inicial da entrada processada
  const [copyInput, setCopyInput] = useState();
  //constante que controla o sentido do processamento
  const [direction, setDirection] = useState();
  //constante que controla o inicio do processamento
  const [firstStep, setFirstStep] = useState(true);
  //constante que armazena o historico de funcoes processadas
  const [historicFuncProcessing, setHistoricFuncProcessing] = useState([]);
  //constante que controla o processamento automatico
  const [allSteps, setAllSteps] = useState(false);

  /*A partir da atualização da currentFuncProcessing (funcao atual a ser processada)
   * o fluxo de processamento ocorre
   */
  useEffect(() => {
    if (currentFuncProcessing && direction === 'right') {
      let auxArray = pointerControll;
      const indexTrue = pointerControll.indexOf(true);
      if (indexTrue !== 0) {
        updateInput(currentFuncProcessing.destination.writer, indexTrue - 1);
      }
      switch (currentFuncProcessing.destination.moviment) {
        case '>':
          auxArray[indexTrue] = false;
          auxArray[indexTrue + 1] = true;
          setPointerControll(auxArray);
          setCurrentState(currentFuncProcessing.destination.state);
          setCurrentInput({ index: indexTrue, str: input[indexTrue] });
          break;
        case '<':
          if (indexTrue > 0) {
            auxArray[indexTrue] = false;
            auxArray[indexTrue - 1] = true;
            setPointerControll(auxArray);
            setCurrentState(currentFuncProcessing.destination.state);
            if (indexTrue === 1) {
              setCurrentInput({
                index: -1,
                str: INITIAL_SIMBOL,
              });
            } else {
              setCurrentInput({
                index: indexTrue - 2,
                str: input[indexTrue - 2],
              });
            }
          } else {
            setCurrentInput({
              index: -1,
              str: INITIAL_SIMBOL,
            });
            setCurrentFunc('Movimento inválido. Palavra Rejeitada!');
          }
          break;
        default:
          setCurrentInput({
            index: -1,
            str: INITIAL_SIMBOL,
          });
          setCurrentFunc('Movimento Inválido!');
          break;
      }
    }
    // eslint-disable-next-line
  }, [currentFuncProcessing, pointerControll]);

  useEffect(() => {
    if (allSteps) {
      handleAllNextStepButtonClick();
    }
    // eslint-disable-next-line
  }, [currentInput]);

  /*Método disparado ao clicar no botão de próximo passo
   * Se for o primeiro passo, ele transforma todas as funcoes de transicao em objetos
   * Senao, atualiza dados de processamento
   */
  const handleNextStepButtonClick = () => {
    setDirection('right');
    //Primeiro if transforma todas as funcoes de transicao em objetos
    let arrayObject;
    if (pointerControll.indexOf(true) === 0 && firstStep) {
      setFirstStep(false);
      setCopyInput(input);
      arrayObject = func.map((funcaoComplete) => {
        let funcao = funcaoComplete.str;
        let counter = 2;
        let stateOrigin = '';
        let inputRead = '';
        let stateWhither = '';
        let inputWrite = '';
        let movement = '';
        if (func.indexOf(funcaoComplete) !== 0) {
          let counterIn = 0;
          let flag = true;
          while (flag) {
            if (funcao[counter] !== ',') {
              stateOrigin += funcao[counter];
              counter++;
            } else {
              counter++;
              while (flag) {
                if (funcao[counter] !== ')') {
                  inputRead += funcao[counter];
                  counter++;
                  counterIn = counter;
                } else {
                  counter = counterIn + 5;
                  while (flag) {
                    if (funcao[counter] !== ',') {
                      stateWhither += funcao[counter];
                      counter++;
                    } else {
                      counter++;
                      while (flag) {
                        if (funcao[counter] !== ',') {
                          inputWrite += funcao[counter];
                          counter++;
                        } else {
                          counter++;
                          while (flag) {
                            if (funcao[counter] !== ')') {
                              movement += funcao[counter];
                              counter++;
                            } else {
                              flag = false;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return {
          id: funcaoComplete.id,
          origin: { state: stateOrigin, input: inputRead },
          destination: {
            state: stateWhither,
            writer: inputWrite,
            moviment: movement,
          },
        };
      });
      let auxArray = funcObject;
      for (let index = 1; index < arrayObject.length; index++) {
        auxArray.push(arrayObject[index]);
      }
      setFuncObject(auxArray);
      findTransitionFunction();
    } else {
      findTransitionFunction();
    }
  };

  /*Método que seta a função a ser processada e a exibição de feedback
   */
  const findTransitionFunction = () => {
    if (currentFunc !== 'Palavra rejeitada!') {
      let functionSelected = funcObject.filter((funcao) => {
        return (
          currentState === funcao.origin.state &&
          currentInput.str === funcao.origin.input
        );
      });
      if (functionSelected.length > 0 && !final.includes(currentState)) {
        let objCurrentFunc = func[functionSelected[0].id - 1];
        setCurrentFunc(objCurrentFunc.str);

        let objCurrentFuncProcessing = funcObject[functionSelected[0].id - 2];
        setCurrentFuncProcessing({
          destination: {
            moviment: objCurrentFuncProcessing.destination.moviment,
            state: objCurrentFuncProcessing.destination.state,
            writer: objCurrentFuncProcessing.destination.writer,
          },
          id: objCurrentFuncProcessing.id,
          origin: {
            input: objCurrentFuncProcessing.origin.input,
            state: objCurrentFuncProcessing.origin.state,
          },
        });
        let arrayTemp = historicFuncProcessing;
        arrayTemp.push(objCurrentFuncProcessing);
        setHistoricFuncProcessing(arrayTemp);
      } else if (final.includes(currentState)) {
        setCurrentFunc('Palavra Aceita!');
      } else {
        setCurrentFunc('Palavra rejeitada!');
      }
    }
  };

  /** Método disparado ao clicar no botão de avançar para o fim do processamento
   * Exibe feedback final ou aviso de loop
   */
  const handleAllNextStepButtonClick = () => {
    setAllSteps(true);
    if (
      currentFunc !== 'Palavra Aceita!' &&
      currentFunc !== 'Palavra rejeitada!' &&
      currentFunc !== 'Movimento inválido. Palavra Rejeitada!' &&
      currentFunc !== 'Movimento Inválido!' &&
      auxCounter < 100
    ) {
      setAuxCounter(auxCounter + 1);
      handleNextStepButtonClick();
    } else if (auxCounter >= 100) {
      setAllSteps(false);
      setCurrentFunc('Processamento interrompido devido a loop.');
    } else {
      setAllSteps(false);
    }
  };

  /*Método disparado ao clicar no botão de passo anterior
   * Se o apontador estiver no símbolo inicial da fita, não ocorre nenhuma ação
   * Senao, atualiza dados de processamento de acordo com as funções já processadas
   */
  const handlePreviousStepButtonClick = () => {
    setDirection('left');
    setAllSteps(false);
    if (
      currentFunc !== '' &&
      currentFunc !== 'Nenhum passo anterior para retroceder.'
    ) {
      let auxCounter = -1;
      let indexFunc = -1;
      // eslint-disable-next-line
      let functionSelected = historicFuncProcessing.filter((funcao) => {
        auxCounter++;
        if (
          currentFuncProcessing.origin.state === funcao.origin.state &&
          currentFuncProcessing.origin.input === funcao.origin.input
        ) {
          indexFunc = auxCounter;
          return funcao;
        }
      });

      let auxArray = pointerControll;
      const indexTrue = pointerControll.indexOf(true);
      switch (currentFuncProcessing.destination.moviment) {
        case '>':
          if (indexTrue > 1) {
            updateInput(currentFuncProcessing.origin.input, indexTrue - 2);
          }
          if (indexTrue > 0) {
            auxArray[indexTrue] = false;
            auxArray[indexTrue - 1] = true;
            setPointerControll(auxArray);
            if (indexTrue === 1) {
              setCurrentInput({
                index: -1,
                str: INITIAL_SIMBOL,
              });
            } else {
              setCurrentInput({
                index: indexTrue - 2,
                str: input[indexTrue - 2],
              });
            }
          } else {
            setCurrentFunc('Movimento inválido. Palavra Rejeitada!');
          }
          break;
        case '<':
          if (indexTrue < input.length) {
            updateInput(currentFuncProcessing.origin.input, indexTrue);
          }
          auxArray[indexTrue] = false;
          auxArray[indexTrue + 1] = true;
          setPointerControll(auxArray);
          setCurrentInput({ index: indexTrue, str: input[indexTrue] });
          break;
        default:
          setCurrentFunc('Movimento Inválido!');
          break;
      }

      if (functionSelected.length > 0 && indexFunc !== -1) {
        setCurrentState(currentFuncProcessing.origin.state);
        if (
          currentFuncProcessing.origin.input === INITIAL_SIMBOL &&
          indexFunc === 0
        ) {
          setCurrentFunc('');
          setCurrentFuncProcessing();
          setHistoricFuncProcessing([]);
        } else {
          let objCurrentFunc =
            func[functionSelected[functionSelected.length - 1].id - 1];
          setCurrentFunc(objCurrentFunc.str);
          setCurrentFuncProcessing(historicFuncProcessing[indexFunc - 1]);
        }
      }
    } else {
      setCurrentFunc('Nenhum passo anterior para retroceder.');
    }
  };

  /*Método disparado ao clicar no botão de resetar processamento
   * Se o apontador estiver no símbolo inicial da fita, não ocorre nenhuma ação
   * Senao, reseta os dados de processamento
   */
  const handleAllPreviousStepButtonClick = () => {
    setAllSteps(false);
    setAuxCounter(0);
    if (!firstStep) {
      updateInput(copyInput, -1);
      setCurrentState(initial);
      setCurrentInput({
        index: -1,
        str: INITIAL_SIMBOL,
      });
      setFuncObject([]);
      setCurrentFunc('');
      setCurrentFuncProcessing();
      setPointerControll([
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
      freeInit();
      setFirstStep(true);
      setHistoricFuncProcessing([]);
      counterPointer = 0;
    }
  };

  return (
    <div>
      <div className={css.maqTuring}>
        <table style={styles.table}>
          <tbody style={styles.tbody}>
            <tr>
              {pointerControll.map((pointer) => {
                let index = counterPointer;
                counterPointer++;
                if (index === 0 && pointer === true) {
                  return <td style={styles.tdSelected}>{INITIAL_SIMBOL}</td>;
                } else if (index === 0 && pointer !== true) {
                  return <td style={styles.td}>{INITIAL_SIMBOL}</td>;
                } else if (
                  index !== 0 &&
                  pointer === true &&
                  index < pointerControll.length - 1
                ) {
                  return <td style={styles.tdSelected}>{input[index - 1]}</td>;
                } else if (
                  index !== 0 &&
                  pointer === false &&
                  index < pointerControll.length - 1
                ) {
                  return <td style={styles.td}>{input[index - 1]}</td>;
                } else {
                  return <td style={styles.td}>...</td>;
                }
              })}
            </tr>
          </tbody>
        </table>
        <table style={styles.tablePointer}>
          <tbody>
            <tr style={styles.trPointer}>
              {pointerControll.map((pointer) => {
                if (pointer) {
                  return (
                    <td style={styles.tdPointerIcon}>
                      <span style={styles.iconPointer}>{POINTER_SIMBOL}</span>
                      <span style={styles.spanPointer}>{currentState}</span>
                    </td>
                  );
                } else {
                  return <td style={styles.tdPointer}></td>;
                }
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: '1%' }}>
        <a
          className="waves-effect waves-light btn"
          href="#!"
          onClick={handleAllPreviousStepButtonClick}
          style={{ marginRight: '0.5rem', fontSize: 'x-large' }}
          title="Reseta todo o processamento, liberando a troca de entrada, caso desejado"
        >
          ⭰
        </a>
        <a
          className="waves-effect waves-light btn"
          href="#!"
          onClick={handleAllNextStepButtonClick}
          style={{ fontSize: 'x-large' }}
          title="Avança até o último passo do processamento da entrada, exibindo o feedback final"
        >
          ⭲
        </a>
      </div>
      <div style={styles.footer}>
        <div style={styles.btnFooter}>
          <a
            className="waves-effect waves-light btn"
            href="#!"
            style={{ marginRight: '2%' }}
            onClick={handlePreviousStepButtonClick}
            title="Retrocede um passo no processamento da entrada"
          >
            ◂◂
          </a>
          <a
            className="waves-effect waves-light btn"
            href="#!"
            onClick={handleNextStepButtonClick}
            title="Avança um passo no processamento da entrada"
          >
            ▸▸
          </a>
        </div>
        <div style={styles.legendFooter}>
          <span
            style={styles.legendFeedback}
            title="Exibe feedback final ou função de transição que foi utilizada para o processamento da entrada"
          >
            Função processada: {currentFunc}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  table: {
    border: '1px solid #000',
    borderCollapse: 'collapse',
    padding: '8px 12px',
  },
  tbody: {
    backgroundColor: '#26a690',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  td: {
    border: '1px solid rgb(0, 0, 0)',
    borderCollapse: 'collapse',
    padding: '8px 12px',
    textAlign: 'center',
  },
  tdSelected: {
    backgroundColor: '#CD5C5C',
    border: '1px solid rgb(0, 0, 0)',
    borderCollapse: 'collapse',
    padding: '8px 12px',
    textAlign: 'center',
  },
  tablePointer: {
    border: '1px solid white',
    borderCollapse: 'collapse',
    padding: '0px',
  },
  trPointer: {
    border: '1px solid white',
    padding: '0px',
  },
  tdPointer: {
    padding: '8px 12px',
    textAlign: '-webkit-center',
    border: '1px solid white',
    borderCollapse: 'collapse',
    minWidth: '2rem',
    maxWidth: '2rem',
  },
  tdPointerIcon: {
    padding: '0px',
    textAlign: '-webkit-center',
    display: 'grid',
    border: '1px solid white',
    borderCollapse: 'collapse',
    minWidth: '2rem',
    maxWidth: '2rem',
  },
  iconPointer: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
  },
  spanPointer: {
    border: '1px solid',
    paddingTop: '9px',
    paddingBottom: '9px',
    minWidth: '3rem',
  },
  footer: {
    display: 'flex',
    marginBottom: '2rem',
  },
  btnFooter: {
    minWidth: '8.5rem',
  },
  legendFooter: {
    paddingLeft: '1.5rem',
  },
  legendFeedback: {
    fontWeight: 'bold',
    color: 'gray',
  },
};
