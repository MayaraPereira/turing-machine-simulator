import React, { Fragment } from 'react';
import Form from './components/Form/Form';

export default function App() {
  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper" style={styles.nav}>
          <a href="#!" data-activates="menu-mobile" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="/">Simulador</a>
            </li>
            <li>
              <a href="/instructions">Instruções</a>
            </li>
            <li>
              <a href="/about">Sobre</a>
            </li>
          </ul>
          <ul className="side-nav" id="menu-mobile" style={styles.nav}>
            <li>
              <a href="/" style={styles.optionsMenu}>
                Simulador
              </a>
            </li>
            <li>
              <a href="/instructions" style={styles.optionsMenu}>
                Instruções
              </a>
            </li>
            <li>
              <a href="/about" style={styles.optionsMenu}>
                Sobre
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <h1 style={styles.centeredTitle}>TuringMS</h1>

        <div style={{ justifyContent: 'center' }}>
          <Form />
        </div>
      </div>
    </Fragment>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
    color: '#708090',
  },
  nav: {
    backgroundColor: '#2F4F4F',
  },
  optionsMenu: {
    color: 'white',
  },
};
