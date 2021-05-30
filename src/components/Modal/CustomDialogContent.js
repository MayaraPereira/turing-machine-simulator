import React, { useState, useEffect } from 'react';

const INFO_INTIALSTATE =
  'É indicado iniciar a construção da MT por este elemento, pois é a partir dele que o processo é iniciado. Ao clicar no botão ‘OK’ o estado inicial é definido, podendo ser conferido na segunda linha da tabela Informações de Processamento.';

const INFO_FINALSTATES =
  'Os estados finais devem ser definidos separados por vírgula. Ao clicar no botão ‘OK’ o conjunto é definido, podendo ser conferido na terceira linha da tabela Informações de Processamento.';

const INFO_TRANSFUNCTION =
  'A função de transição (ou programa) define movimentos, estados e símbolos a serem lidos e gravados pela unidade de controle. Ao clicar no botão ‘OK’ uma nova configuração é definida, podendo ser conferida na tabela Função de Transição. Considere ‘p’ sendo o estado origem, ‘au’ o símbolo lido, ‘q’ o estado destino, ‘av’ o símbolo gravado e ‘m’ o movimento a ser realizado. Todos os elementos devem ser separados por vírgula.';

const INFO_INPUT =
  'Após a definição do estado inicial (1), conjunto de estados finais (2) e das configurações da função de transição (3), a entrada deve ser definida para ser processada pela máquina criada. Ao clicar em ‘INICIAR’ a fita é exibida e processamento começa.';

// Este elemento exibe o modal
export default function CustomDialogContent(typeInformation) {
  const [text, setText] = useState('');

  const findTextAndTitle = () => {
    switch (parseInt(typeInformation.typeInformation)) {
      case 1:
        setText(INFO_INTIALSTATE);
        break;
      case 2:
        setText(INFO_FINALSTATES);
        break;
      case 3:
        setText(INFO_TRANSFUNCTION);
        break;
      case 4:
        setText(INFO_INPUT);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    findTextAndTitle();
    // eslint-disable-next-line
  }, [typeInformation]);

  return (
    <div style={styles.divSpan}>
      <span>{text}</span>
    </div>
  );
}

const styles = {
  divSpan: {
    margin: '1rem',
    fontSize: '16px',
    textAlign: 'justify',
  },
};
