import React, { useState } from 'react';
import css from './step.module.css';

//import picture from '../../img/hqdefault.jpg';
//        <img src={picture}></img>
const INITIAL_SIMBOL = '▷';
const POINTER_SIMBOL = '⇧';

export default function Step({ func, input, initial, final }) {
  console.log('Funcoes ' + JSON.stringify(func));
  console.log('input ' + JSON.stringify(input));
  console.log('initial ' + JSON.stringify(initial));
  console.log('final ' + JSON.stringify(final));

  //constante que define localizacao do apontador
  const [pointerControll] = useState([
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
  //constante que armazena as funcoes de transicao como objetos
  const [funcObject, setFuncObject] = useState([]);

  /*const [indexCurrentFunc, setIndexCurrentFunc] = useState();
  const [currentFunc, setCurrentFunc] = useState();
  const [currentState, setCurrentState] = useState();
  const [indexCurrentInput, setIndexCurrentInput] = useState();
  const [currentInput, setCurrentInput] = useState();

  const handleButtonClick = () => {
    if (!currentFunc) {
      setCurrentInput(input[0]);
      setIndexCurrentInput(0);

      const firstFunction = func.find((f) => {
        return f.src.includes('(q0,' + currentInput + ')');
      });

      if (firstFunction) {
        setCurrentFunc(firstFunction);
        setIndexCurrentFunc(func.indexOf(firstFunction));
        setCurrentState('q0');

        //firstFunction.indexOf('=') +
      } else {
        console.err('Entrada rejeitada');
      }
    } else {
      setCurrentInput(input[indexCurrentInput + 1]);
      setIndexCurrentInput(indexCurrentInput + 1);

      const findFunction = func.find((f) => {
        return f.src.includes('(q0,' + currentInput + ')');
      });
    }
  };*/

  /* Metodo que recupera parte do input a ser exibida na fita */
  /*const retrieveInput = () => {
    let value = null;
    if (input[counterRetrieve]) {
      value = input[counterRetrieve];
    } else {
      value = '';
    }

    counterRetrieve++;
    return value;
  };*/

  /*Método disparado ao clicar no botão de próximo passo
   * Se for o primeiro passo, ele transforma todas as funcoes de transicao em objetos
   * Senao, atualiza dados de processamento
   */
  const handleNextStepButtonClick = () => {
    //Primeiro if transforma todas as funcoes de transicao em objetos
    if (pointerControll.indexOf(true) === 0) {
      let arrayObject = func.map((funcaoComplete) => {
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
          origin: { state: stateOrigin, input: inputRead },
          destination: {
            state: stateWhither,
            writer: inputWrite,
            moviment: movement,
          },
        };
      });
      setFuncObject(arrayObject);
      console.log('objetos ' + JSON.stringify(funcObject));
    }
    /*setInitialState(lookInitialState);
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
    }*/
  };

  return (
    <div>
      <div className={css.maqTuring}>
        <table style={styles.table}>
          <tbody style={styles.tbody}>
            <tr>
              <td style={styles.td}>{INITIAL_SIMBOL}</td>
              <td style={styles.td}>{input[0]}</td>
              <td style={styles.td}>{input[1]}</td>
              <td style={styles.td}>{input[2]}</td>
              <td style={styles.td}>{input[3]}</td>
              <td style={styles.td}>{input[4]}</td>
              <td style={styles.td}>{input[5]}</td>
              <td style={styles.td}>{input[6]}</td>
              <td style={styles.td}>{input[7]}</td>
              <td style={styles.td}>{input[8]}</td>
              <td style={styles.td}>...</td>
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
                      <icon style={styles.iconPointer}>{POINTER_SIMBOL}</icon>
                    </td>
                  );
                } else if (pointer && pointer !== pointerControll[0]) {
                  return (
                    <td style={styles.tdPointerIcon}>
                      <icon style={styles.iconPointer}>{POINTER_SIMBOL}</icon>
                      <span style={styles.spanPointer}>q0</span>
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
      <a href="!#" style={{ paddingLeft: '1.5rem' }}>
        Próxima função a ser processada:
      </a>
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
};
