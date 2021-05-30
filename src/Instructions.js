import React, { Fragment } from 'react';

export default function Instructions() {
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
                Instruções
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
        <h1 style={styles.centeredTitle}>TuringMS</h1>
        <h2 style={{ fontSize: '40px' }}>Como usar?</h2>
        <div style={styles.divStep}>
          <dl>
            <dt style={styles.textStep}>Passo 1</dt>
            <dd style={styles.text}>
              É onde recomenda-se iniciar a definição da Máquina de Turing (MT).
              Neste passo o usuário define o estado inicial da máquina. Ao
              clicar no número 1, um modal com informações sobre o campo é
              exibido. Ao clicar no botão ‘OK’, o estado inicial é definido.
              Exemplo: q0.
            </dd>
          </dl>
        </div>
        <div style={styles.divStep}>
          <dl>
            <dt style={styles.textStep}>Passo 2</dt>
            <dd style={styles.text}>
              Neste passo o usuário deve definir qual(is) o(s) estado(s) de
              aceitação da máquina. Ao clicar no número 2, um modal com
              informações sobre o campo em questão é exibido. Ao clicar no botão
              ‘OK’, o(s) estado(s) final(is) da MT do usuário é/são definido(s).
              Exemplo: q3,q4.
            </dd>
          </dl>
        </div>
        <div style={styles.divStep}>
          <dl>
            <dt style={styles.textStep}>Passo 3</dt>
            <dd style={styles.text}>
              É o momento de definir os símbolos a serem lidos, gravados e
              movimentação através das configurações da função de transição. A
              título de processamento, os movimentos para direita são
              representados por `{'>'}`, para a esquerda por `{'<'}`, o símbolo
              marcador de início de fita como ‘▷’ e o branco como ‘_’. Ao clicar
              no número 3, um modal com informações sobre a função a ser
              definida é exibido. Ao clicar no botão ‘OK’, a função de transição
              é armazenada. Já ao clicar no botão de edição (ícone de lápis), a
              página é estendida com opções de exclusão e edição de
              configurações e reset geral da máquina. Exemplo: Π(q0, ▷) = (q0,
              ▷, `{'>'}`).
              <i>
                <br /> Caso deseje alterar uma função, basta incluir a função
                alterada nos campos correspondentes no card de alteração e
                clicar no botão ‘OK’. Caso deseje excluir, basta incluir a
                função a ser deletada nos campos correspondentes no card de
                alteração e clicar no botão ‘X’. Essas mudanças são
                automaticamente refletidas na tabela de função de transição. Por
                fim, se necessitar resetar totalmente a máquina, basta clicar no
                botão ‘RESETAR MÁQUINA’ que todas as configurações definidas
                serão excluídas.
              </i>
            </dd>
          </dl>
        </div>
        <div style={styles.divStep}>
          <dl>
            <dt style={styles.textStep}>Passo 4</dt>
            <dd style={styles.text}>
              Após a definição das estruturas 1, 2 e 3, antes do processamento,
              uma entrada deve ser definida para ser processada pela máquina
              criada. Ao clicar no número 4, um modal com informações sobre o
              campo de entrada é exibido. Exemplo: abc.
            </dd>
          </dl>
        </div>
        <div style={styles.divStep}>
          <dl>
            <dd style={styles.text}>
              Uma representação gráfica da fita da MT criada é exibida. Quando
              uma das células está marcada em vermelho, significa que o
              apontador está naquela posição. São exibidos os botões para
              liberar a edição dos dados fornecidos na etapa anterior (ALTERAR),
              para retroceder todo o processamento de uma única vez (⭰), para
              retroceder apenas um passo do processamento por clique (◄), para
              avançar todo o processamento de uma única vez (⭲), para avançar
              apenas um passo do processamento por clique (►) e uma label
              utilizada para dar feedback sobre qual função de transição.
            </dd>
          </dl>
        </div>
      </div>
      <div style={styles.textFooter}>Campina Grande - 2021</div>
      <link
        type="text/css"
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css"
      />
    </Fragment>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
    color: '#708090',
  },
  divStep: {
    border: '1px solid',
    borderColor: 'darkgreen',
  },
  textStep: {
    fontSize: 'xx-large',
    paddingLeft: '5px',
  },
  text: {
    textAlign: 'justify',
    fontSize: '16px',
    paddingBottom: '10px',
    paddingRight: '10px',
  },
  textFooter: {
    textAlign: 'center',
    fontSize: '16px',
    paddingTop: '50px',
    paddingBottom: '20px',
  },
};
