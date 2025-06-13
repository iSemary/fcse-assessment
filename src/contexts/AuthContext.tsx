'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { apolloClient } from '../lib/apollo-client';
import { LOGIN_MUTATION } from '../lib/graphql';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string; human_error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, errors } = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          input: {
            identifier: email.trim(),
            password: password.trim(),
          },
        },
        errorPolicy: 'all',
      });

      // Check for the readable errors from the GraphQL response
      if (errors && errors.length > 0) {
        const firstError = errors[0];
        let human_error: string | undefined = undefined;

        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const exception = firstError?.extensions?.exception as any;
          const messagesArray =
            exception?.data?.[0]?.messages ??
            exception?.data?.message?.[0]?.messages;

          if (Array.isArray(messagesArray)) {
            human_error = messagesArray?.[0]?.message;
          }
        } catch {}

        return {
          success: false,
          human_error,
          error: firstError.message || 'Login failed',
        };
      }

      if (data?.login?.jwt && data?.login?.user) {
        const { jwt, user: userData } = data.login;

        setToken(jwt);
        setUser(userData);

        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', jwt);
          localStorage.setItem('authUser', JSON.stringify(userData));
        }

        return {
          success: true,
        };
      }

      return {
        success: false,
        error: 'Login failed',
      };
    } catch (error: unknown) {
      console.error('Login error:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'An error occurred during login',
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    }

    apolloClient.resetStore().catch((error) => {
      console.error('Error resetting Apollo store:', error);
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
