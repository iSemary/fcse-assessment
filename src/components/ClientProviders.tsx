'use client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apollo-client';
import { AuthProvider } from '../contexts/AuthContext';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
}
