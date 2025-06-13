import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import React from 'react';
import '@testing-library/jest-dom';
import { apolloClient } from '../../lib/apollo-client';

jest.mock('../../lib/apollo-client', () => ({
  apolloClient: {
    mutate: jest.fn(),
    resetStore: jest.fn().mockResolvedValue(undefined),
  },
}));

const mockApolloClient = apolloClient as jest.Mocked<typeof apolloClient>;

const TestComponent = () => {
  const { user, token, login, logout, isLoading } = useAuth();

  return (
    <div>
      <div>user: {user?.email || 'none'}</div>
      <div>token: {token || 'none'}</div>
      <div>loading: {isLoading ? 'yes' : 'no'}</div>
      <button onClick={() => login('test@freshcells.de', 'KTKwXm2grV4wHzW')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  it('logs in user and stores token', async () => {
    const mockLogin = {
      data: {
        login: {
          jwt: 'fake-jwt',
          user: {
            id: '1',
            email: 'test@freshcells.de',
            username: 'tester',
          },
        },
      },
    };

    mockApolloClient.mutate.mockResolvedValue(mockLogin);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login').click();
    });

    expect(await screen.findByText(/user: test@freshcells.de/)).toBeInTheDocument();
    expect(screen.getByText(/token: fake-jwt/)).toBeInTheDocument();
  });

  it('logs out user and clears storage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Logout').click();
    });

    expect(await screen.findByText(/user: none/)).toBeInTheDocument();
    expect(screen.getByText(/token: none/)).toBeInTheDocument();
  });
});