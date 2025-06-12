import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import LoginPage from '@/app/[locale]/login/page';

describe('Login Page', () => {
  const setup = () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
  };

  it('renders email and password inputs', () => {
    setup();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders login button', () => {
    setup();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error if fields are empty on submit', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findAllByText(/required/i)).not.toHaveLength(0);
  });
});
