import React, { useState, useEffect } from 'react';

// The element to be shown in the modal window
export default function CustomDialogContent(typeInformation) {
  // use this hook to control the dialog
  //const dialog = useDialog();

  //const [value, setValue] = useState();

  const [text, setText] = useState('');

  const findTextAndTitle = () => {
    switch (parseInt(typeInformation.typeInformation)) {
      case 1:
        setText('Informações sobre Estado Inicial.');
        break;
      case 2:
        setText('Informações sobre Estados Finais.');
        break;
      case 3:
        setText('Informações sobre Funções de Transição ou Funções Programa.');
        break;
      case 4:
        setText('Informações sobre a entrada a ser processada.');
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
  },
};
