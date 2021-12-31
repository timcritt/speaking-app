import { render, screen } from '@testing-library/react';
import App from './App';

console.log(App);
test('test name', () => {
  render(App);
  expect(true);
});
