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
        <div>
          <h2>Idealização do TuringMS</h2>
          <div style={styles.text}>
            <span>
              Analisando o cotidiano da ministração de aulas de Linguagens
              Formais e Teoria da Computação, a evidente dificuldade em produzir
              demonstrações visuais satisfatórias (muitas vezes através de
              desenhos manuais na lousa) para o ensino de conteúdos relacionados
              à Máquina de Turing e as limitações de acesso às ferramentas
              gráficas já conhecidas, demonstraram a necessidade de construir um
              simulador capaz de possibilitar acesso facilitado a partir de
              diversos dispositivos e, principalmente, produzir uma simulação
              gráfica fácil e de qualidade respeitando todos os formalismos
              associados aos conceitos.
            </span>
          </div>
        </div>
        <div>
          <h2>Sobre o simulador TuringMS</h2>
          <div style={styles.text}>
            <span>
              Foi desenvolvido levando em consideração os princípios teóricos da
              Máquina de Turing (MT) expostos pelos autores Tiarajú Asmuz
              Diverio e Paulo Blauth Menezes (1999 e 2011), e os principais
              propósitos da inclusão de simuladores no ensino de Linguagens
              Formais e Teoria da Computação, proporcionando aos alunos e
              professores uma ferramenta para construir uma experiência
              empolgante na relação ensino-aprendizagem. Através desse simulador
              gráfico, o aluno pode se envolver com o conteúdo por meio da
              visualização e interação, manipulando de forma simplificada o
              processamento de palavras em uma MT. Para isso, basta que o aluno
              acesse o TuringMS por meio de um navegador e siga passo a passo as
              orientações de definição da máquina para iniciar as simulações de
              processamento da entrada.
            </span>
          </div>
        </div>
        <div>
          <h2>Desenvolvimento do TuringMS</h2>
          <div style={styles.text}>
            <span>
              Foi desenvolvido utilizando majoritariamente ReactJs. Para a
              configuração geral do projeto foi utilizado o Node.js (versão
              14.12.0), já que o React utiliza diversos pacotes e configurações
              para a aplicação. Como gerenciador de pacotes, o Yarn (versão
              1.22.5) é utilizado por padrão pelo o React. Muitos dos materiais
              de recursos visuais como botões, menus, modais, foram utilizados
              do framework Materialize, o qual é extremamente popular no
              desenvolvimento front-end. A IDE (Integrated Development
              Environment / Ambiente de Desenvolvimento Integrado) utilizada
              durante todo o desenvolvimento foi Visual Studio Code (versão
              1.47.0), bem como suas integrações com o Github. Todo o projeto
              está versionado no{' '}
              <a href="https://github.com/MayaraPereira/turing-machine-simulator">
                repositório
              </a>{' '}
              com o acesso totalmente livre e hospedado no Heroku para acesso
              livre às funcionalidades do simulador pela rede.
            </span>
          </div>
        </div>
        <div>
          <h2>TuringMS</h2>
          <div style={styles.text}>
            <span>
              O simulador TuringMS foi criado pela aluna Mayara Pereira do curso
              Ciência da Computação da Universidade Estadual da Paraíba sob
              orientação do Prof. Me. Edson Holanda Cavalcante Júnior.
            </span>
          </div>
        </div>
        <div style={styles.textFooter}>Campina Grande - 2021</div>
      </div>
    </Fragment>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
    color: '#708090',
  },
  text: {
    textAlign: 'justify',
    fontSize: '16px',
    paddingBottom: '10px',
  },
  textFooter: {
    textAlign: 'center',
    fontSize: '16px',
    paddingTop: '50px',
    paddingBottom: '20px',
  },
};
