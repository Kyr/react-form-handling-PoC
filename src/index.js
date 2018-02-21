import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import Form from './form/Container';

const stars = '\u2728';
const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <Form values={{phone: '123-45-67'}} onSubmit={() => console.log('root action')}/>
  </div>
);

render(<App />, document.getElementById('root'));
