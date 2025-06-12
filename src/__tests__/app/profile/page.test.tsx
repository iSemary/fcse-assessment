import ProfilePage from '../../app/[locale]/profile/page';
import { render, screen } from '@testing-library/react';
import { useAuth } from '../../../contexts/AuthContext';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ProfilePage', () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push });
  });

  it('redirects unauthenticated user', async () => {
    useAuth.mockReturnValue({ user: null, isLoading: false });

    render(<ProfilePage params={Promise.resolve({ locale: 'en' })} />);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(push).toHaveBeenCalledWith('/en/login');
  });

  it('shows user data when authenticated', async () => {
    useAuth.mockReturnValue({
      user: { id: '1', email: 'user@example.com' },
      isLoading: false,
      token: 'token123',
    });
    useQuery.mockReturnValue({
      data: { user: { id: '1', firstName: 'John', lastName: 'Doe', email: 'user@example.com' } },
      loading: false,
      error: undefined,
      refetch: jest.fn(),
    });

    render(<ProfilePage params={Promise.resolve({ locale: 'en' })} />);

    expect(await screen.findByDisplayValue('John')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('Doe')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('user@example.com')).toBeInTheDocument();
  });
});
