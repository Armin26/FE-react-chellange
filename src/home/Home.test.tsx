import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../endpoint/Home';

test('renders title', () => {
  render(<Home />);
  const linkElement = screen.get('Recipes');
  expect(linkElement).toBeInTheDocument();
});
