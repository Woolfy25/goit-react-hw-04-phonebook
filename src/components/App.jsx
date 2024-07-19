import React from 'react';
import Title from './Title';
// import Input from './Input';
import Form from './Form';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
      }}
    >
      <Title title={'Phonebook'} />
      <Form test="testing"></Form>
    </div>
  );
};
