import React, { Fragment } from 'react';

export default function About() {
  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper" style={{ backgroundColor: '#2F4F4F' }}>
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
          <ul
            className="side-nav"
            id="menu-mobile"
            style={{ backgroundColor: '#2F4F4F' }}
          >
            <li>
              <a href="/" style={{ color: 'white' }}>
                Simulador
              </a>
            </li>
            <li>
              <a href="/instructions" style={{ color: 'white' }}>
                Como usar?
              </a>
            </li>
            <li>
              <a href="/about" style={{ color: 'white' }}>
                Sobre
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">
        <h1 style={styles.centeredTitle}>Turing Machine Simulator</h1>
        <h2>Hello, About!</h2>
      </div>
    </Fragment>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
    color: '#708090',
  },
};
