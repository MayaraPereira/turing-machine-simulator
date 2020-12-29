import React, { useState, useEffect } from 'react';
import css from './step.module.css';

const INITIAL_SIMBOL = '▷';
const POINTER_SIMBOL = '⇧';

export default function Step({ func, input, initial, final, updateInput }) {
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
  //constante que armazena as funcoes de transicao como objetos
  const [funcObject, setFuncObject] = useState([]);
  //constante que armazena o estado atual de processamento
  const [currentState, setCurrentState] = useState();
  //constante que armazena a parte do input que esta sendo lida
  const [currentInput, setCurrentInput] = useState();
  //constante que armazena a funcao de transicao a ser exibida
  const [currentFunc, setCurrentFunc] = useState('');
  //constante que armazena a funcao de transicao a ser processada
  const [currentFuncProcessing, setCurrentFuncProcessing] = useState();

  /*A partir da atualização da currentFuncProcessing (funcao atual a ser processada)
   * o fluxo de processamento ocorre
   */
  useEffect(() => {
    if (currentFuncProcessing) {
      let auxArray = pointerControll;
      const indexTrue = pointerControll.indexOf(true);
      updateInput(currentFuncProcessing.destination.writer, indexTrue - 1);
      switch (currentFuncProcessing.destination.moviment) {
        case '>':
          auxArray[indexTrue] = false;
          auxArray[indexTrue + 1] = true;
          setPointerControll(auxArray);
          setCurrentState(currentFuncProcessing.destination.state);
          setCurrentInput({ index: indexTrue + 1, str: input[indexTrue + 1] });
          break;
        case '<':
          if (indexTrue > 1) {
            auxArray[indexTrue] = false;
            auxArray[indexTrue - 1] = true;
            setPointerControll(auxArray);
            setCurrentState(currentFuncProcessing.destination.state);
            setCurrentInput({
              index: indexTrue - 1,
              str: input[indexTrue - 1],
            });
          } else {
            setCurrentFunc('Palavra Rejeitada!');
          }
          break;
        default:
          setCurrentFunc('Movimento Inválido!');
          break;
      }
    }
  }, [currentFuncProcessing, pointerControll]);

  /*Método disparado ao clicar no botão de próximo passo
   * Se for o primeiro passo, ele transforma todas as funcoes de transicao em objetos
   * Senao, atualiza dados de processamento
   */
  const handleNextStepButtonClick = () => {
    //Primeiro if transforma todas as funcoes de transicao em objetos
    let arrayObject;
    if (pointerControll.indexOf(true) === 0) {
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
      setPointerControll([
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ]);
      setCurrentState(initial);
      setCurrentInput({ index: 0, str: input[0] });
    } else {
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
        } else if (final.includes(currentState)) {
          setCurrentFunc('Palavra Aceita!');
        } else {
          setCurrentFunc('Palavra rejeitada!');
        }
      }
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
                if (pointer && pointer === pointerControll[0]) {
                  return (
                    <td style={styles.tdPointerIcon}>
                      <span style={styles.iconPointer}>{POINTER_SIMBOL}</span>
                    </td>
                  );
                } else if (pointer && pointer !== pointerControll[0]) {
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
      <div style={styles.footer}>
        <div style={styles.btnFooter}>
          <a
            className="waves-effect waves-light btn"
            href="#swipe-2"
            style={{ marginRight: '2%' }}
          >
            ◂◂
          </a>
          <a
            className="waves-effect waves-light btn"
            href="#!"
            onClick={handleNextStepButtonClick}
          >
            ▸▸
          </a>
        </div>
        <div style={styles.legendFooter}>
          <span style={styles.legendFeedback}>
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
