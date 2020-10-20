import React from 'react';
import css from './step.module.css';

//import picture from '../../img/hqdefault.jpg';
//        <img src={picture}></img>

export default function Step() {
  //const simbol = '▷';
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
    </div>
  );
}
