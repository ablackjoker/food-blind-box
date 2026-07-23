import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the blind box app', () => {
  render(<App />);
  expect(screen.getByText(/今晚吃什么盲盒/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /开盲盒/i })).toBeInTheDocument();
});
