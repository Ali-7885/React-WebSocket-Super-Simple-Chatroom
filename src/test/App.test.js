import React from 'react';
import ReactDOM from 'react-dom';
import App from './../App';
import User from './../User';
import Message from './../Message';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<User />, div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Message />, div);
});
