import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from '../../../app/[locale]/profile/page';
import { useAuth } from '../../../contexts/AuthContext';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key) => {
    const translations = {
      'title': 'Profile',
      'firstNameLabel': 'First Name',
      'lastNameLabel': 'Last Name',
      'errorLoadingUserData': 'Error loading user data',
      'tryAgain': 'Try Again',
      'loading': 'Loading',
      'notAvailable': 'Not available',
      'logoutButton': 'Logout',
    };
    return translations[key] || key;
  },
}));

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn().mockImplementation((template) => template),
}));

// Mock the graphql file
jest.mock('../../../lib/graphql', () => ({
  USER_QUERY: 'mocked-user-query',
  LOGIN_MUTATION: 'mocked-login-mutation',
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('ProfilePage', () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push });
  });

  it('redirects unauthenticated user', async () => {
    mockUseAuth.mockReturnValue({ 
      user: null, 
      isLoading: false,
      token: null,
      login: jest.fn(),
      logout: jest.fn(),
    });

    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: undefined,
      refetch: jest.fn(),
    });

    render(<ProfilePage params={Promise.resolve({ locale: 'en' })} />);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/en/login');
    });
  });

  it('shows loading state when auth is loading', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: true,
      token: null,
      login: jest.fn(),
      logout: jest.fn(),
    });

    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: undefined,
      refetch: jest.fn(),
    });

    render(<ProfilePage params={Promise.resolve({ locale: 'en' })} />);

    // Check for the loading spinner by its CSS class
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    // Or check for the container with the loading layout
    expect(screen.getByText((content, element) => {
      return element?.className?.includes('min-h-screen') && 
             element?.className?.includes('bg-gray-50');
    })).toBeInTheDocument();
  });

  it('shows user data when authenticated', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1'},
      isLoading: false,
      token: 'token123',
      login: jest.fn(),
      logout: jest.fn(),
    });

    mockUseQuery.mockReturnValue({
      data: { 
        user: { 
          id: '1', 
          firstName: 'John', 
          lastName: 'Doe', 
        } 
      },
      loading: false,
      error: undefined,
      refetch: jest.fn(),
    });

    render(<ProfilePage params={Promise.resolve({ locale: 'en' })} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    });
    
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
  });

  it('shows error state when query fails', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'user@example.com' },
      isLoading: false,
      token: 'token123',
      login: jest.fn(),
      logout: jest.fn(),
    });

    const mockError = new Error('Failed to fetch user data');
    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: mockError,
      refetch: jest.fn(),
    });

    render(<ProfilePage params={Promise.resolve({ locale: 'en' })} />);

    await waitFor(() => {
      expect(screen.getByText('Error loading user data')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Failed to fetch user data')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('shows loading state for user data', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: '1', email: 'user@example.com' },
      isLoading: false,
      token: 'token123',
      login: jest.fn(),
      logout: jest.fn(),
    });

    mockUseQuery.mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
      refetch: jest.fn(),
    });

    render(<ProfilePage params={Promise.resolve({ locale: 'en' })} />);

    await waitFor(() => {
      expect(screen.getAllByDisplayValue('Loading...').length).toBeGreaterThan(0);
    });
  });
});