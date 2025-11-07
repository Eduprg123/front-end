import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Spring Boot Connection Demo', () => {
  render(<App />);
  const headingElement = screen.getByText(/Spring Boot Connection Demo/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders Backend Connection Status section', () => {
  render(<App />);
  const statusElement = screen.getByText(/Backend Connection Status/i);
  expect(statusElement).toBeInTheDocument();
});

test('renders API Configuration section', () => {
  render(<App />);
  const configElement = screen.getByText(/API Configuration/i);
  expect(configElement).toBeInTheDocument();
});

