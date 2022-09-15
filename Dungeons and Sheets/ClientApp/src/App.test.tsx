import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './pages/LoginPage/Login';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
  const linkElement = screen.getByText(/We'll never share your email with anyone else./i);
  expect(linkElement).toBeInTheDocument();
});