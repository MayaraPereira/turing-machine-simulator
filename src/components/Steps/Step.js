import React from 'react';
import css from './step.module.css';

//import picture from '../../img/hqdefault.jpg';
//        <img src={picture}></img>

export default function Step({ func, input, initial, final }) {
  console.log('Funcoes ' + JSON.stringify(func));
  console.log('input ' + JSON.stringify(input));
  console.log('initial ' + JSON.stringify(initial));
  console.log('final ' + JSON.stringify(final));
  //const simbol = '▷';
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

  return (
    <div>
      <div className={css.maqTuring}>
        <table
          style={{
            border: '1px solid #000',
            borderCollapse: 'collapse',
            padding: '8px 12px',
          }}
        >
          <tbody>
            <tr
              style={{
                border: '1px solid #000',
                borderCollapse: 'collapse',
                padding: '8px 12px',
              }}
            >
              <td
                style={{
                  border: '1px solid #000',
                  borderCollapse: 'collapse',
                  padding: '8px 12px',
                }}
              >
                1
              </td>
              <td>0</td>
              <td>0</td>
              <td>1</td>
              <td>1</td>
              <td>0</td>
              <td>1</td>
              <td>0</td>
              <td>1</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
        <div className={css.label}>q_1</div>
      </div>
      <a
        className="waves-effect waves-light btn"
        href="#swipe-2"
        style={{ marginRight: '2%' }}
      >
        ►
      </a>
      <a className="waves-effect waves-light btn" href="#swipe-3">
        ▸▸
      </a>
      <a href="!#" style={{ paddingLeft: '1.5rem' }}>
        Próxima função a ser processada:
      </a>
    </div>
  );
}
