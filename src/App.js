import React from 'react';
import Form from './components/Form/Form';
import Step from './components/Steps/Step';

export default function App() {
  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>Turing Machine</h1>

      <Form
      /*filter={filter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}*/
      />
      <Step />
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
