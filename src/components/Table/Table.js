import React from 'react';

export default function Table({ func }) {
  /*const handleInputChange = (event) => {
    const newText = event.target.value;

    props.onChangeFilter(newText);
  };

  const { filter, countryCount, totalPopulation } = props;*/
  // const pi = 'Π';
  //const beta = 'β';

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <td style={styles.rowTitle}>Funções de Transição</td>
        </tr>
      </thead>
      <tbody>
        {func.map((f) => {
          return (
            <tr key={f.id}>
              <td style={styles.rows}>{f.str}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: '50%',
    margin: '0.9rem 1rem 3px 25%',
  },
  rowTitle: {
    textAlign: 'center',
    padding: '3%',
  },
  rows: {
    textAlign: 'center',
    padding: '1%',
  },
};
